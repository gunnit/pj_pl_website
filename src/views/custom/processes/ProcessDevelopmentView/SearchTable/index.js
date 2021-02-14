import { filter } from 'lodash';
import HeadTable from './HeadTable';
import Page from 'components/Page';
import ToolbarTable from './ToolbarTable';
import Scrollbars from 'components/Scrollbars'
import React, { useState } from 'react';
import { visuallyHidden } from '@material-ui/utils';
import SearchNotFound from 'components/SearchNotFound';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@material-ui/core';

// ----------------------------------------------------------------------

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
  sortSpan: visuallyHidden
}));

// Make sure this part is correct when adding the real data

function createData(id, overallRating, name, alignment, automationScore, costWithoutAutomation, costWithAutomation, savings, owner) {
  return { id, overallRating, name, alignment, automationScore, costWithoutAutomation, costWithAutomation, savings, owner };
}

const products = [
  createData('id', 'Yes', 'Process', '70%', 'Moderately', 10, 2000, 1000, 1000, 'CRO-Supply Chain'),
  createData('id2', 'Yes', 'Process2', '70%', 'Moderately', 10, 4000, 1000, 3000, 'CRO-Supply Chain'),
  createData('id3', 'Yes', 'Process3', '70%', 'Moderately', 10, 9000, 1000, 8000, 'CRO-Supply Chain'),
  createData('id4', 'Yes', 'Process4', '70%', 'Moderately', 10, 4000, 1000, 3000, 'CRO-Supply Chain'),
  createData('id5', 'Yes', 'Process5', '70%', 'Moderately', 10, 1020, 1000, 20, 'CRO-Supply Chain'),
  createData('id6', 'Yes', 'Process6', '70%', 'Moderately', 10, 4800, 1000, 3800, 'CRO-Supply Chain'),
  createData('id7', 'Yes', 'Process7', '70%', 'Moderately', 10, 4000, 1000, 3000, 'CRO-Supply Chain'),
];

// ----------------------------------------------------------------------

function ProductListView() {
  const classes = useStyles();
  // const { products } = useSelector(state => state.product);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(
    products,
    getComparator(order, orderBy),
    filterName
  );

  const isProductNotFound = filteredProducts.length === 0;

  return (
    <Page title="Process Ideas" className={classes.root}>
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
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {

                      const {
                        id,
                        overallRating,
                        name,
                        alignment,
                        automationScore,
                        costWithoutAutomation,
                        costWithAutomation,
                        savings,
                        owner,
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
                          onClick={event => handleClick(event, name)}
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
                          <TableCell align="right">{name}</TableCell>
                          <TableCell align="right">{alignment}</TableCell>
                          <TableCell align="right">{automationScore}</TableCell>
                          <TableCell align="right">{costWithoutAutomation}</TableCell>
                          <TableCell align="right">{costWithAutomation}</TableCell>
                          <TableCell align="right">{savings}</TableCell>
                          <TableCell align="right">{owner}</TableCell>
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
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

export default ProductListView;
