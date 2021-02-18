import { filter } from 'lodash';
import HeadTable from './HeadTable';
import ToolbarTable from './ToolbarTable';
import { Icon } from '@iconify/react';
import React, { useState, useContext } from 'react';
import { visuallyHidden } from '@material-ui/utils';
import { PATH_APP } from 'routes/paths';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import SearchNotFound from 'components/SearchNotFound';
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

const TABLE_HEAD = [
  {
    id: 'overallRating',
    numeric: false,
    disablePadding: true,
    label: 'Overall Rating'
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'alignment',
    numeric: true,
    disablePadding: false,
    label: 'Alignment'
  },
  {
    id: 'automationScore',
    numeric: true,
    disablePadding: false,
    label: 'Automation Score'
  },
  {
    id: 'savingsGoal',
    numeric: true,
    disablePadding: false,
    label: 'Savings Goal'
  },
  {
    id: 'numberOfSteps',
    numeric: true,
    disablePadding: false,
    label: 'Number of Steps'
  },
  {
    id: 'natureOfProcess',
    numeric: true,
    disablePadding: false,
    label: 'Nature of Process'
  },
  {
    id: 'testEnvironment',
    numeric: true,
    disablePadding: false,
    label: 'Test Environment'
  },
  {
    id: 'owner',
    numeric: true,
    disablePadding: false,
    label: 'Owner'
  },
  {
    id: ''
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
  root: {},
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

export default function ProductionTable({ processes }) {
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [isOpen, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const { currentProcessId, setCurrentProcessId, setProcessCounts } = useContext(Context)

  const handleCloseDialog = value => {
    setOpenDialog(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const moveStage = async (currentStage, futureStage) => {
    try {

      // currentProcessId will be the ID of the process that was clicked on
      await fetch(`${apiBaseUrl}/change_status/${currentProcessId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          pipeline_status: futureStage
        }),
        headers: {
          "Content-Type": 'application/json',
        }
        // Authorization###
      })

      // Change navbar numbers
      setProcessCounts(previous => ({
        ...previous,
        [currentStage.toLowerCase()]: previous[currentStage.toLowerCase()] - 1,
        [futureStage.toLowerCase()]: previous[futureStage.toLowerCase()] + 1
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
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - processes.length) : 0;

  const filteredProcesses = applySortFilter(
    processes,
    getComparator(order, orderBy),
    filterName
  );

  const isProductNotFound = filteredProcesses.length === 0;

  return (
    <Container>
      <Card className={classes.card}>
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
                    overallRating,
                    process_name,
                    alignment,
                    automationScore,
                    costWithoutAutomation,
                    costWithAutomation,
                    savings,
                    owner,
                  }, index) => {

                    // Overall Rating	Process Name	Objective Alignment	Automation Score	Cost Without Automation	Cost With Automation	Saving	Owner

                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        className={classes.row}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {overallRating}
                        </TableCell>
                        <TableCell align="right">{process_name}</TableCell>
                        <TableCell align="right">
                          <MLabel variant="filled" color="info">
                            {alignment}
                          </MLabel>
                        </TableCell>
                        <TableCell align="right">{automationScore}</TableCell>
                        <TableCell align="right">{costWithoutAutomation}</TableCell>
                        <TableCell align="right">{costWithAutomation}</TableCell>
                        <TableCell align="right">
                          <MLabel variant="filled" color={savings > 0 ? "primary" : "error"}>
                            {savings}
                          </MLabel>
                        </TableCell>
                        <TableCell align="right">{owner}</TableCell>
                        <TableCell align="right">
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
            <RouterLink to={option.path} className={classes.routerLink}>
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
              <Button color='error'>Cancel</Button>
            </>}
        </Dialog>
      </Card>
    </Container>
  );
}