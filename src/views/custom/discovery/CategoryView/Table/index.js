import 'firebase/auth';
import firebase from 'firebase/app';
import { filter } from 'lodash';
import HeadTable from './HeadTable';
import { ButtonAnimate } from 'components/Animate';
import ToolbarTable from './ToolbarTable';
import { PATH_APP } from 'routes/paths';
import React, { useState, useContext } from 'react';
import SearchNotFound from 'components/SearchNotFound';
import { useHistory } from 'react-router-dom';
import Scrollbars from 'components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
} from '@material-ui/core';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { MIconButton } from '@material-extend';
import { useSnackbar } from 'notistack';
import Row from './Row';
// ----------------------------------------------------------------------



const TABLE_HEAD = [
  {
    id: 'click',
  },
  {
    id: 'hierarchy_id',
    numeric: false,
    disablePadding: true,
    label: 'Hierarchy ID'
  },
  {
    id: 'process_element',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'definition',
    numeric: false,
    disablePadding: true,
    label: 'Definition'
  },
  {
    id: 'metric',
    numeric: false,
    disablePadding: true,
    label: 'Metric Available'
  },
  {
    id: 'recommendedforautomation change this ',
    numeric: false,
    disablePadding: true,
    label: 'Likes'
  },
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
      return _product.process_element.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    return array;
  }
  return stabilizedThis.map(el => el[0]);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  clickableCell: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  likeCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  likeButtons: {
    display: 'flex',
  }
}));

// ----------------------------------------------------------------------

export default function GlossaryTable({ glossary }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [orderBy, setOrderBy] = useState('hierarchy_id');
  const [isOpen, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { setTaxonomyGroupId, userId } = useContext(Context)

  const history = useHistory()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = event => {
  //   if (event.target.checked) {
  //     const newSelecteds = glossary.map(n => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

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

  // const handleOpen = (event, id) => {
  //   setOpen(event.currentTarget);

  //   // Context to get the process details if the user clicks to view the process details
  //   setCurrentProcessId(id)

  //   // So the currentProcessId can persist in case the user reloads while viewing a page that needs a currentProcessId
  //   localStorage.setItem('currentProcessId', id)

  // };
  const handleClose = (option) => {
    setOpen(null);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - glossary.length) : 0;



  const filteredGlossary = applySortFilter(
    glossary,
    getComparator(order, orderBy),
    filterName
  );


  const handleCloseDelete = () => {
    setOpen(null)
    setOpenDialog(true)
  }


  const isProductNotFound = filteredGlossary.length === 0;



  const handleClick = (process_element_id) => {
    setTaxonomyGroupId(process_element_id)
    localStorage.setItem('taxonomyGroupId', process_element_id)
    history.push(PATH_APP.discovery.group)
  }

  const { enqueueSnackbar } = useSnackbar();

  const handleLikeClick = async (process_element_id, like) => {
    if (like) {
      enqueueSnackbar('Added to Liked Processes', { variant: 'success' })
    } else {
      enqueueSnackbar('Removed from Liked Processes', { variant: 'error' })
    }

    const token = await firebase.auth().currentUser.getIdToken(true);

    await fetch(`${apiBaseUrl}/like-this-process/${userId}/${process_element_id}`, {
      method: 'POST',
      // body: JSON.stringify({}),
      headers: {
        // "Content-Type": 'application/json',
        "Authorization": token
      }
    })




  }



  return (
    <Card className={classes.root}>
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
              rowCount={glossary.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredGlossary
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({
                  id,
                  hierarchy_id,
                  process_element,
                  definition,
                  metric,
                  process_element_id,
                  liked,
                  user_liked
                }, index) => {

                  // const isItemSelected = selected.indexOf(process_element) !== -1;
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Row
                      id={id}
                      hierarchy_id={hierarchy_id}
                      process_element={process_element}
                      definition={definition}
                      metric={metric}
                      process_element_id={process_element_id}
                      liked={liked}
                      user_liked={user_liked}
                      labelId={labelId}
                    />
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
        count={glossary.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />




    </Card >
  );
}