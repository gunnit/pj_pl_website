import { fDate } from 'utils/formatTime';
import { filter } from 'lodash';
import HeadTable from './HeadTable';
import { Icon } from '@iconify/react';
import Page from 'components/Page';
import ToolbarTable from './ToolbarTable';
import { PATH_APP } from 'routes/paths';
import React, { useState, useContext } from 'react';
import { visuallyHidden } from '@material-ui/utils';
import SearchNotFound from 'components/SearchNotFound';
import { Link as RouterLink } from 'react-router-dom';
import Scrollbars from 'components/Scrollbars';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
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
  Typography,
  Button
} from '@material-ui/core';
import { MLabel } from '../../../../../@material-extend';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import { LegendToggleRounded } from '@material-ui/icons';
// ----------------------------------------------------------------------



const TABLE_HEAD = [
  {
    id: 'process_name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'total_net_benefit', // process_net_benefit?
    numeric: true,
    disablePadding: false,
    label: 'Priority'
  },
  {
    id: 'total_alignment_score_coverted',
    numeric: true,
    disablePadding: false,
    label: 'Alignment'
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
    id: 'one_year_savings',
    numeric: true,
    disablePadding: false,
    label: '1-year savings'
  },
  {
    id: '3-year savings', // ?
    numeric: true,
    disablePadding: false,
    label: '3-year savings'
  },
  {
    id: 'date_created',
    numeric: true,
    disablePadding: false,
    label: 'Date Created'
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

  // Search
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
  },
  centerText: {
    display: 'flex',
    justifyContent: 'center',
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function ProcessTable({ processes, handleDeleteProcess, pipelineFilter }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [isOpen, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { setCurrentProcessId } = useContext(Context)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = processes.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleOpen = (event, id) => {
    setOpen(event.currentTarget);

    // Context to get the process details if the user clicks to view the process details
    setCurrentProcessId(id)

    // So the currentProcessId can persist in case the user reloads while viewing a page that needs a currentProcessId
    localStorage.setItem('currentProcessId', id)

  };
  const handleClose = (option) => {
    setOpen(null);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - processes.length) : 0;

  let filteredProcesses = processes.filter((process, i) => {

    // Set keys on process object instead of in nested objects so the sort function can find them
    processes[i].process_net_benefit = process.processassumptions.process_net_benefit
    processes[i].total_alignment_score_coverted = process.processobjectives.total_alignment_score_coverted
    processes[i].current_process_cost_calc = process.processassumptions.current_process_cost_calc
    processes[i].tot_future_process_cost = process.processassumptions.tot_future_process_cost
    processes[i].total_net_benefit = process.processassumptions.total_net_benefit
    processes[i].one_year_savings = process.processassumptions.total_net_benefit

    if (pipelineFilter) {
      return process.pipline === pipelineFilter
    } else {
      // If pipelineFilter is falsy, don't filter, just return true for everything
      return true
    }
  });



  filteredProcesses = applySortFilter(
    filteredProcesses,
    getComparator(order, orderBy),
    filterName
  );


  const handleCloseDelete = () => {
    setOpen(null)
    setOpenDialog(true)
  }


  const isProductNotFound = filteredProcesses.length === 0;

  return (
    <Page title="All Processes" className={classes.root}>
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
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProcesses
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({
                      id,
                      process_name,
                      total_alignment_score_coverted,
                      process_score: automationScore,
                      current_process_cost_calc,
                      tot_future_process_cost,
                      total_net_benefit,
                      threeYearSavings, // need to change this
                      date_created
                    }, index) => {

                      const isItemSelected = selected.indexOf(process_name) !== -1;
                      const labelId = `enhanced-table-checkbox-${index}`;

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
                            {process_name}
                          </TableCell>
                          <TableCell align="right">{total_net_benefit || 'Not completed'}</TableCell>
                          <TableCell align="right">
                            <MLabel variant="filled" color="info">
                              {total_alignment_score_coverted || 'Not completed'}
                            </MLabel>
                          </TableCell>
                          <TableCell align="right">{automationScore || 'Not completed'}</TableCell>
                          <TableCell align="right">{current_process_cost_calc || 'Not completed'}</TableCell>
                          <TableCell align="right">{tot_future_process_cost || 'Not completed'}</TableCell>
                          <TableCell align="right">{total_net_benefit || 'Not completed'}</TableCell>
                          <TableCell align="right">
                            <MLabel variant="filled" color={threeYearSavings > 0 ? "primary" : "error"}>
                              {threeYearSavings || 'Not completed'}
                            </MLabel>
                          </TableCell>
                          <TableCell align="right">{fDate(date_created)}</TableCell>
                          <TableCell align="right">
                            <IconButton className={classes.margin} onClick={(event) => handleOpen(event, id)}>
                              <Icon
                                icon={moreVerticalFill}
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
            { text: 'Delete' }].map(option => (
              <RouterLink to={option.path && option.path} className={classes.routerLink}>
                <MenuItem key={option.text} onClick={option.text === 'Delete' ? handleCloseDelete : handleClose}>
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

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            {openDialog
              && <>
                <Card className={classes.dialog}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom className={classes.centerText}>
                      Are you sure you want to delete this process?
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" color='textSecondary' className={classes.centerText}>
                      Deleting this process will result in permanently removing all data associated with this process.
                    </Typography>
                  </Box>

                  <Button onClick={() => {
                    handleDeleteProcess()
                    setOpenDialog(false)
                  }} variant='contained'>Permanently Delete</Button>
                </Card>
              </>}
          </Dialog>


        </Card>
      </Container>
    </Page >
  );
}