import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
} from '@material-ui/core';

// ----------------------------------------------------------------------

function createData(q11, q21, q31, q41, q12, q22, q32, q42) {
  return { q11, q21, q31, q41, q12, q22, q32, q42 };
}

const GROUPING_TABLE = [
  createData(10, 22, 22, 11, 11, 11, 11, 11),
  createData(10, 22, 22, 11, 11, 11, 11, 11),
];

const COLUMNS = [
  // { id: 'name', label: 'Name', minWidth: 170 },
  // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  // {
  //   id: 'population',
  //   label: 'Population',
  //   minWidth: 170,
  //   align: 'right',
  //   format: value => value.toLocaleString('en-US')
  // },
  // {
  //   id: 'size',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: value => value.toLocaleString('en-US')
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: value => value.toFixed(2)
  // }
  { id: 'q11', align: 'right', label: 'Q1', minWidth: 50 },
  { id: 'q21', align: 'right', label: 'Q2', minWidth: 50 },
  { id: 'q31', align: 'right', label: 'Q3', minWidth: 50 },
  { id: 'q41', align: 'right', label: 'Q4', minWidth: 50 },
  { id: 'q12', align: 'right', label: 'Q1', minWidth: 50 },
  { id: 'q22', align: 'right', label: 'Q2', minWidth: 50 },
  { id: 'q32', align: 'right', label: 'Q3', minWidth: 50 },
  { id: 'q42', align: 'right', label: 'Q4', minWidth: 50 },
];

const useStyles = makeStyles(theme => ({
  root: {},
  tableHead: {
    background: theme.palette.background.paper
  }
}));

// ----------------------------------------------------------------------

export default function GroupingFixedHeader() {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  return (
    <div className={classes.root}>
      <TableContainer component={Box} sx={{ minWidth: 800, maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={1}
                classes={{ head: classes.tableHead }}
              />
              <TableCell
                align="right"
                colSpan={1}
                classes={{ head: classes.tableHead }}
              >
                Year 1
                </TableCell>
              <TableCell
                align="left"
                colSpan={3}
                classes={{ head: classes.tableHead }}
              />
              <TableCell
                align="right"
                colSpan={1}
                classes={{ head: classes.tableHead }}
              >
                Year 2
                </TableCell>
              <TableCell
                align="right"
                colSpan={3}
                classes={{ head: classes.tableHead }}
              />
            </TableRow>
            <TableRow>
              <TableCell
                // align='right'
                style={{ top: 56, minWidth: 50 }}
              />
              {COLUMNS.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 56, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}

            </TableRow>
          </TableHead>

          <TableBody>
            {GROUPING_TABLE.map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {i === 0 && <TableCell align='left'>
                    Cost Without Automation
                  </TableCell>}
                  {i === 1 && <TableCell align='left'>
                    Cost With Automation
                  </TableCell>}
                  {COLUMNS.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}
