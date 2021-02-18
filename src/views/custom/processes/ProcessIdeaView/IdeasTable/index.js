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
    id: 'moveToPipeline',
    numeric: false,
    disablePadding: true,
    label: 'Move to Pipeline',
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
    id: 'processCritical',
    numeric: true,
    disablePadding: false,
    label: 'Process Critical'
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
      return _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
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


function createData(id, moveToPipeline, process_name, alignment, process_critical, process_objective, num_of_manual_steps, nature_of_process, test_env_available, owner_name) {
  return { id, moveToPipeline, process_name, alignment, process_critical, process_objective, num_of_manual_steps, nature_of_process, test_env_available, owner_name };
}


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
  const [openDialogName, setOpenDialogName] = useState(null);

  const { currentProcessId, setCurrentProcessId, setProcessCounts } = useContext(Context)


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCloseDialog = value => {
    setOpenDialogName(null);
  };

  const handleOpen = (event, id) => {
    setOpen(event.currentTarget);

    // Context to get the process details if the user clicks to view the process details
    setCurrentProcessId(id)
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

  const filteredProcesses = applySortFilter(
    processes,
    getComparator(order, orderBy),
    filterName
  );

  const handleOpenDialogClick = (process_name, id) => {
    setOpenDialogName(process_name)
    setCurrentProcessId(id)
  }

  const moveToPipelineClick = async () => {
    try {

      // currentProcessId will be the ID of the process that was clicked on
      await fetch(`${apiBaseUrl}/change_status/${currentProcessId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          pipeline_status: 'Pipeline'
        }),
        headers: {
          "Content-Type": 'application/json',
        }
        // Authorization###
      })

      // Change navbar numbers
      setProcessCounts(previous => ({
        ...previous,
        idea: previous.idea - 1,
        pipeline: previous.pipeline + 1
      }))


      // Redirect to process detail page
      history.push(PATH_APP.processes.details)

    } catch (e) {
      console.error(e)
    }
  }

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
                  .map((row, index) => {
                    const {
                      id,
                      moveToPipeline,
                      process_name,
                      alignment,
                      process_critical,
                      process_objective,
                      num_of_manual_steps,
                      nature_of_process,
                      test_env_available,
                      owner_name,
                    } = row;

                    const isItemSelected = selected.indexOf(process_name) !== -1;
                    const labelId = `enhanced-table-checkbox-${index}`;

                    // && and || statements below are to say what to do when the data is null
                    return (
                      <TableRow
                        hover
                        key={id}
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
                          {moveToPipeline || ''}
                        </TableCell>

                        <TableCell align="right">{process_name || ''}</TableCell>
                        <TableCell align="right">
                          {alignment
                            && <MLabel variant="filled" color="info">
                              {alignment}
                            </MLabel>}
                        </TableCell>
                        <TableCell align="right">{process_critical || ''}</TableCell>
                        <TableCell align="right">
                          {process_objective && <MLabel variant="filled" color={process_objective > 0 ? "primary" : "error"}>
                            {process_objective}
                          </MLabel>}
                        </TableCell>
                        <TableCell align="right">{num_of_manual_steps || ''}</TableCell>
                        <TableCell align="right">{nature_of_process || ''}</TableCell>
                        <TableCell align="right">{test_env_available || ''}</TableCell>
                        <TableCell align="right">{owner_name || ''}</TableCell>
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
                          <IconButton className={classes.margin} onClick={() => handleOpenDialogClick(process_name, id)}>
                            <Icon
                              icon={ArrowForwardIcon}
                              width={20}
                              height={20}
                            />
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
      </Card>

      <Dialog open={!!openDialogName} onClose={() => handleCloseDialog()}>
        {openDialogName &&
          <>
            <DialogTitle id="simple-dialog-title">Move {openDialogName} into Pipeline phase?</DialogTitle>
            <Button onClick={moveToPipelineClick}>Yes</Button>
            <Button color='error'>Cancel</Button>
          </>}
      </Dialog>

    </Container>
  );
}