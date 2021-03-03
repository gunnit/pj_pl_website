import 'firebase/auth';
import firebase from 'firebase/app';
import { filter } from 'lodash';
import HeadTable from './HeadTable';
import { fNumber } from 'utils/formatNumber';
import ToolbarTable from './ToolbarTable';
import { Icon } from '@iconify/react';
import React, { useState, useContext } from 'react';
import { visuallyHidden } from '@material-ui/utils';
import { PATH_APP } from 'routes/paths';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import SearchNotFound from 'components/SearchNotFound';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Scrollbars from 'components/Scrollbars';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
} from '@material-ui/core';
import { MLabel } from '../../../../../@material-extend';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';


// pipline: pipeline,
//   final_process_score,
//   process_name,
//   processobjectives: {
//   total_alignment_score_coverted
// },
// process_score,
//   processassumptions: {
//   current_process_cost_calc, // cost without automation
//     tot_future_process_cost,
//     total_net_benefit, // cost with automation
//                     },
// business_unit,
//   function: processFunction, //

const TABLE_HEAD = [
  {
    id: 'overallRating',
    numeric: false,
    disablePadding: true,
    label: 'Overall Rating'
  },
  {
    id: 'process_name',
    numeric: true,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'total_alignment_score_coverted',
    numeric: true,
    disablePadding: false,
    label: 'Objective Alignment'
  },
  {
    id: 'process_score',
    numeric: true,
    disablePadding: false,
    label: 'Automation Score'
  },
  {
    id: 'current_process_cost_calc',
    numeric: true,
    disablePadding: false,
    label: 'Cost Without Automation'
  },
  {
    id: 'tot_future_process_cost',
    numeric: true,
    disablePadding: false,
    label: 'Cost With Automation'
  },
  {
    id: 'total_net_benefit',
    numeric: true,
    disablePadding: false,
    label: 'Savings'
  },
  {
    id: 'business_unit',
    numeric: true,
    disablePadding: false,
    label: 'Owner'
  },
  {
    id: 'options'
  },
  {
    id: 'back'
  },
  {
    id: 'forward'
  }
];


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  console.log(order, orderBy)
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });



  if (query) {
    array = filter(array, _product => {
      return _product.process_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    return array;
  }
  return stabilizedThis.map(el => el[0]);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  sortSpan: visuallyHidden,
  routerLink: {
    textDecoration: 'none'
  }
}));

function findNextStage(currentStage) {
  if (currentStage === 'Idea') {
    return 'Pipeline'
  } else if (currentStage === 'Pipeline') {
    return 'Development'
  } else if (currentStage === 'Development') {
    return 'Production'
  }
}

function findPreviousStage(currentStage) {
  if (currentStage === 'Pipeline') {
    return 'Idea'
  } else if (currentStage === 'Development') {
    return 'Pipeline'
  } else if (currentStage === 'Production') {
    return 'Development'
  }
}


// ----------------------------------------------------------------------

export default function DevelopmentTable({ processes }) {
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [isOpen, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { currentProcessId, setCurrentProcessId, setProcessCounts } = useContext(Context)

  const handleCloseDialog = value => {
    setOpenDialog(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const moveStage = async (currentStage, futureStage) => {
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);

      // currentProcessId will be the ID of the process that was clicked on
      await fetch(`${apiBaseUrl}/change_status/${currentProcessId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          pipeline_status: futureStage
        }),
        headers: {
          "Content-Type": 'application/json',
          "Authorization": token
        }
      })

      // Change navbar numbers
      setProcessCounts(previous => ({
        ...previous,
        [currentStage]: previous[currentStage] - 1,
        [futureStage]: previous[futureStage] + 1
      }))


      // Redirect to process detail page
      history.push(PATH_APP.processes.details)

    } catch (e) {
      console.error(e)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (event, id) => {
    setOpen(event.currentTarget);

    // Context to get the process details if the user clicks to view the process details
    setCurrentProcessId(id)
    localStorage.setItem('currentProcessId', id)

  };
  const handleClose = (option) => {
    setOpen(null);
  };

  const handleFilterByName = event => {
    setFilterName(event.target.value);
  };

  const handleOpenDialog = (name, currentStage, nextStage, forward, id) => {
    setOpenDialog({ name, currentStage, nextStage, forward })
    setCurrentProcessId(id)
    localStorage.setItem('currentProcessId', id)

  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - processes.length) : 0;


  const processCopy = [...processes]
  processCopy.forEach((process, i) => {

    // Nested object keys need to be set on process so sort function can find them
    processCopy[i].total_alignment_score_coverted = process.processobjectives.total_alignment_score_coverted
    processCopy[i].current_process_cost_calc = process.processassumptions.current_process_cost_calc
    processCopy[i].tot_future_process_cost = process.processassumptions.tot_future_process_cost
    processCopy[i].total_net_benefit = process.processassumptions.total_net_benefit

  })


  const filteredProcesses = applySortFilter(
    processCopy,
    getComparator(order, orderBy),
    filterName
  );



  const isProductNotFound = filteredProcesses.length === 0;

  return (
    <Card className={classes.card} className={classes.root}>
      <ToolbarTable
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbars>
        <TableContainer component={Box} sx={{ minWidth: 800 }}>
          <Table>
            <HeadTable
              order={order}
              classes={classes}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={processes.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredProcesses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({
                  id,
                  pipline: pipeline,
                  final_process_score,
                  process_name,
                  processobjectives: {
                    total_alignment_score_coverted
                  },
                  process_score,
                  processassumptions: {
                    current_process_cost_calc, // cost without automation
                    tot_future_process_cost,
                    total_net_benefit, // cost with automation
                  },
                  business_unit,
                  function: processFunction, // because function is a reserved word
                }, index) => {

                  // Overall Rating	Process Name	Objective Alignment	Automation Score	Cost Without Automation	Cost With Automation	Saving	Owner

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={`${id}${index}`}
                      tabIndex={-1}
                      className={classes.row}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {/* >= 20 means suggested to move to development, >= 10 means evaluate before moving to development, otherwise not suggested */}
                        {final_process_score >= 11 ? 'Move' : final_process_score >= 6 ? 'Evaluate' : 'Not suggested'}
                      </TableCell>
                      <TableCell align="left">{process_name}</TableCell>
                      <TableCell align="center">
                        <MLabel variant="filled" color="info">
                          {total_alignment_score_coverted}%
                        </MLabel>
                      </TableCell>
                      <TableCell align="left">{process_score === 0 ? 'Not completed' : process_score}</TableCell>
                      <TableCell align="left">
                        {current_process_cost_calc >= 0 ? `$${fNumber(current_process_cost_calc)}` : `-$${fNumber(-current_process_cost_calc)}`}
                      </TableCell>
                      <TableCell align="left">
                        {tot_future_process_cost >= 0 ? `$${fNumber(tot_future_process_cost)}` : `-$${fNumber(-tot_future_process_cost)}`}
                      </TableCell>
                      <TableCell align="center">
                        <MLabel variant="filled" color={total_net_benefit > 0 ? "primary" : "error"}>
                          {total_net_benefit >= 0 ? `$${fNumber(total_net_benefit)}` : `-$${fNumber(-total_net_benefit)}`}
                        </MLabel>
                      </TableCell>
                      {/* If both business unit and process function, hyphenate, otherwise display one or the other */}
                      <TableCell align="left">{(business_unit && processFunction) ? `${business_unit} - ${processFunction}` : !!business_unit ? `${business_unit}` : !!processFunction ? processFunction : 'Not completed'}</TableCell>
                      <TableCell align="left">
                        <IconButton className={classes.margin} onClick={(event) => handleOpen(event, id)}>
                          <Icon
                            icon={moreVerticalFill}
                            width={20}
                            height={20}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton className={classes.margin} onClick={() => handleOpenDialog(process_name, pipeline, findPreviousStage(pipeline), false, id)}>
                          <ArrowBackIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton className={classes.margin} onClick={() => handleOpenDialog(process_name, pipeline, findNextStage(pipeline), true, id)}>
                          <ArrowForwardIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isProductNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <Box sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbars>

      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={isOpen}
        onClose={handleClose}
        open={Boolean(isOpen)}
      >
        {[{ text: 'View details', path: PATH_APP.processes.details },
        { text: 'Update', path: PATH_APP.processes.update },
        { text: 'Delete', path: PATH_APP.processes.details }].map(option => (
          <RouterLink key={option.text} to={option.path} className={classes.routerLink}>
            <MenuItem key={option.text} onClick={handleClose}>
              {option.text}
            </MenuItem>
          </RouterLink>
        ))}
      </Menu>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={processes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={!!openDialog} onClose={() => handleCloseDialog()}>
        {openDialog &&
          <>
            <DialogTitle id="simple-dialog-title">Move {openDialog.name} {openDialog.forward ? 'into' : 'back to'} {openDialog.nextStage} phase?</DialogTitle>
            <Button onClick={() => moveStage(openDialog.currentStage, openDialog.nextStage)}>Yes</Button>
            <Button color='error' onClick={() => setOpenDialog(false)}>Cancel</Button>
          </>}
      </Dialog>
    </Card>
  );
}