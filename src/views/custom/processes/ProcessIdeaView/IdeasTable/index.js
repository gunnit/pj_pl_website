import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { filter } from 'lodash';
import HeadTable from './HeadTable';
import ToolbarTable from './ToolbarTable';
import { Icon } from '@iconify/react';
import React, { useState, useContext } from 'react';
import { visuallyHidden } from '@material-ui/utils';
import { PATH_APP } from 'routes/paths';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import SearchNotFound from 'components/SearchNotFound';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'initial_process_score',
    numeric: false,
    disablePadding: true,
    label: 'Move to Pipeline',
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
    label: 'Alignment'
  },
  {
    id: 'process_critical',
    numeric: true,
    disablePadding: false,
    label: 'Process Critical'
  },
  {
    id: 'process_objective',
    numeric: true,
    disablePadding: false,
    label: 'Savings Goal'
  },
  {
    id: 'num_of_manual_steps',
    numeric: true,
    disablePadding: false,
    label: 'Number of Steps'
  },
  {
    id: 'nature_of_process',
    numeric: true,
    disablePadding: false,
    label: 'Nature of Process'
  },
  {
    id: 'test_env_available',
    numeric: true,
    disablePadding: false,
    label: 'Test Environment'
  },
  {
    id: 'business_unit',
    numeric: true,
    disablePadding: false,
    label: 'Owner'
  },
  {
    id: 'blank1'
  },
  {
    id: 'blank2'
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
  root: {
    width: '100%'
  },
  sortSpan: visuallyHidden,
  routerLink: {
    textDecoration: 'none'
  }
}));



export default function IdeasTable({ processes }) {
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [isOpen, setOpen] = useState(null);
  const [openDialogName, setOpenDialogName] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);


  const { currentProcessId, setCurrentProcessId, setProcessCounts } = useContext(Context)


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCloseDialog = value => {
    setOpenDialogName(false);
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


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = event => {
    setFilterName(event.target.value);
  };


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - processes.length) : 0;



  const handleOpenDialogClick = (process_name, id) => {
    setOpenDialogName(process_name)
    setCurrentProcessId(id)
    localStorage.setItem('currentProcessId', id)

  }

  const moveToPipelineClick = async () => {
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);

      // currentProcessId will be the ID of the process that was clicked on
      await fetch(`${apiBaseUrl}/change_status/${currentProcessId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          pipeline_status: 'Pipeline'
        }),
        headers: {
          "Content-Type": 'application/json',
          "Authorization": token
        }
      })

      // Change navbar numbers
      setProcessCounts(previous => ({
        ...previous,
        Idea: previous.Idea - 1,
        Pipeline: previous.Pipeline + 1
      }))


      // Redirect to process detail page
      history.push(PATH_APP.processes.details)

    } catch (e) {
      console.error(e)
    }
  }



  const processCopy = [...processes]
  processCopy.forEach((process, i) => {

    // Nested object keys need to be set on process so sort function can find them
    processCopy[i].total_alignment_score_coverted = process.processobjectives.total_alignment_score_coverted

  })


  const filteredProcesses = applySortFilter(
    processCopy,
    getComparator(order, orderBy),
    filterName
  );


  const isProductNotFound = filteredProcesses.length === 0;



  return (
    <>
      <Card className={classes.root}>
        <ToolbarTable
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbars className={classes.root}>
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
                  .map((row, index) => {
                    const {
                      id,
                      initial_process_score,
                      process_name,
                      processobjectives: {
                        total_alignment_score_coverted
                      },
                      process_critical,
                      process_objective,
                      num_of_manual_steps,
                      nature_of_process,
                      test_env_available,
                      business_unit,
                      function: processFunction,
                    } = row;

                    const isItemSelected = selected.indexOf(process_name) !== -1;
                    const labelId = `enhanced-table-checkbox-${index}`;

                    // && and || statements below are to say what to do when the data is null
                    return (
                      <TableRow
                        hover
                        key={`${id}${index}`}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        className={classes.row}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {initial_process_score >= 8 ? 'Suggested' : initial_process_score >= 5 ? 'Evaluate before moving' : 'Not suggested'}
                        </TableCell>

                        <TableCell align="right">{process_name || ''}</TableCell>
                        <TableCell align="right">
                          {total_alignment_score_coverted
                            ? <MLabel variant="filled" color="info">
                              {total_alignment_score_coverted}
                            </MLabel>
                            : 'Not completed'}
                        </TableCell>
                        <TableCell align="right">{process_critical || 'Not completed'}</TableCell>
                        <TableCell align="right">
                          {process_objective
                            ? <MLabel variant="filled" color={process_objective > 0 ? "primary" : "error"}>
                              {process_objective}
                            </MLabel>
                            : 'Not completed'}
                        </TableCell>
                        <TableCell align="right">{num_of_manual_steps || 'Not completed'}</TableCell>
                        <TableCell align="right">{nature_of_process || 'Not completed'}</TableCell>
                        <TableCell align="right">{test_env_available || 'Not completed'}</TableCell>
                        <TableCell align="right">{(business_unit && processFunction) ? `${business_unit} - ${processFunction}` : !!business_unit ? `${business_unit}` : !!processFunction ? processFunction : ''}</TableCell>                        <TableCell align="right">
                          <IconButton className={classes.margin} onClick={(event) => handleOpen(event, id)}>
                            <Icon
                              icon={moreVerticalFill}
                              width={20}
                              height={20}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton className={classes.margin} onClick={() => handleOpenDialogClick(process_name, id)}>
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
          { text: 'Delete', path: '' }].map(option => (
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
      </Card>

      <Dialog open={!!openDialogName} onClose={() => handleCloseDialog()}>
        {openDialogName &&
          <>
            <DialogTitle id="simple-dialog-title">Move {openDialogName} into Pipeline phase?</DialogTitle>
            <Button onClick={moveToPipelineClick}>Yes</Button>
            <Button color='error'>Cancel</Button>
          </>}
      </Dialog>

      {/* <Dialog open={!!confirmDelete} onClose={() => handleCloseDialog()}>
        {confirmDelete &&
          <>
            <DialogTitle id="simple-dialog-title">Are you sure you want to delete {confirmDelete.name} </DialogTitle>
            <Button onClick={confirmDeleteClick}>Yes</Button>
            <Button color='error'>Cancel</Button>
          </>}
      </Dialog> */}
    </>
  );
}