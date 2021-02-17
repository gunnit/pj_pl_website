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
} from '@material-ui/core';
import { MLabel } from '../../../../../@material-extend';
import Context from 'context/Context';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'priority',
    numeric: true,
    disablePadding: false,
    label: 'Priority'
  },
  {
    id: 'alignment',
    numeric: true,
    disablePadding: false,
    label: 'Alignment'
  },
  {
    id: 'automation score',
    numeric: true,
    disablePadding: false,
    label: 'Automation Score'
  },
  {
    id: 'cost without automation',
    numeric: true,
    disablePadding: false,
    label: 'Cost Without Automation'
  },
  {
    id: 'cost with automation',
    numeric: true,
    disablePadding: false,
    label: 'Cost With Automation'
  },
  {
    id: '1-year savings',
    numeric: true,
    disablePadding: false,
    label: '1-year savings'
  },
  {
    id: '3-year savings',
    numeric: true,
    disablePadding: false,
    label: '3-year savings'
  },
  {
    id: 'date created',
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



function createData(id, name, priority, alignment, automationScore, costWithoutAutomation, costWithAutomation, oneYearSavings, threeYearSavings, dateCreated) {
  return { id, name, priority, alignment, automationScore, costWithoutAutomation, costWithAutomation, oneYearSavings, threeYearSavings, dateCreated };
}

const products = [
  createData('id', 'New Account Entry', 'Low', '30%', 3, 23700, 54500, 5000, 15000, 'February 10, 2021'),
  createData('id1', 'Credit Checks', 'Medium', '60%', 4, 11620, 35300, 5000, 15000, 'February 10, 2021'),
  createData('id2', 'Ledger Entry', 'High', '80%', 9, 55000, 35400, 5000, 15000, 'February 7, 2021'),
  createData('id3', 'Loan Approval', 'High', '90%', 10, 10000, 5000, 5000, 15000, 'February 6, 2021'),
  createData('id4', 'P&L Reconciliation', 'Low', '10%', 1, 10000, 5000, 5000, 15000, 'January 27, 2021'),
  createData('id5', 'AML Authentication', 'High', '70%', 8, 10000, 5000, 5000, 15000, 'January 26, 2021'),
  createData('id6', 'Order Processing Part 1', 'Medium', '50%', 6, 10000, 5000, 5000, 15000, 'January 25, 2021'),
  createData('id7', 'CRM Updates', 'Low', '20%', 2, 10000, 5000, 5000, 15000, 'January 25, 2021'),
  createData('id8', 'Payroll Processing', 'Low', '20%', 2, 10000, 5000, 5000, 15000, 'January 22, 2021'),
];

// ----------------------------------------------------------------------

export default function ProcessTable({ processes }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [isOpen, setOpen] = useState(null);
  const { setCurrentProcessId } = useContext(Context)


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = products.map(n => n.name);
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
    setCurrentProcessId(id)
  };
  const handleClose = (option) => {
    setOpen(null);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - processes.length) : 0;

  const filteredProcesses = applySortFilter(
    processes,
    getComparator(order, orderBy),
    filterName
  );

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
                    .map((row, index) => {

                      const {
                        id,
                        name,
                        priority,
                        alignment,
                        automationScore,
                        costWithoutAutomation,
                        costWithAutomation,
                        oneYearSavings,
                        threeYearSavings,
                        dateCreated
                      } = row;

                      const isItemSelected = selected.indexOf(name) !== -1;
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
                            {name}
                          </TableCell>
                          <TableCell align="right">{priority}</TableCell>
                          <TableCell align="right">
                            <MLabel variant="filled" color="info">
                              {alignment}
                            </MLabel>
                          </TableCell>
                          <TableCell align="right">{automationScore}</TableCell>
                          <TableCell align="right">{costWithoutAutomation}</TableCell>
                          <TableCell align="right">{costWithAutomation}</TableCell>
                          <TableCell align="right">{oneYearSavings}</TableCell>
                          <TableCell align="right">
                            <MLabel variant="filled" color={threeYearSavings > 0 ? "primary" : "error"}>
                              {threeYearSavings}
                            </MLabel>
                          </TableCell>
                          <TableCell align="right">{dateCreated}</TableCell>
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
      </Container>
    </Page >
  );
}