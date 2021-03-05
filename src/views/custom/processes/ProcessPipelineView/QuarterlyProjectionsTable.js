import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const COLUMNS = [
  { id: 'q1', label: 'Q1', minWidth: 50 },
  { id: 'q2', label: 'Q2', minWidth: 50 },
  { id: 'q3', label: 'Q3', minWidth: 50 },
  { id: 'q4', label: 'Q4', minWidth: 50 },
  { id: 'q12', label: 'Q1', minWidth: 50 },
  { id: 'q22', label: 'Q2', minWidth: 50 },
  { id: 'q32', label: 'Q3', minWidth: 50 },
  { id: 'q42', label: 'Q4', minWidth: 50 },
];

const useStyles = makeStyles(theme => ({
  root: {},
  tableHead: {
    background: theme.palette.background.paper
  }
}));

// ----------------------------------------------------------------------

export default function QuarterlyCashFlow({ data: {
  total_process_quarter_ideas_with_automation,
  total_process_quarter_ideas_with_no_automation,
  total_process_quarter_ideas_saving,
} }) {
  const classes = useStyles();


  const rows = [
    { cells: total_process_quarter_ideas_with_automation, id: 'withAutomation' },
    { cells: total_process_quarter_ideas_with_no_automation, id: 'withoutAutomation' },
    { cells: total_process_quarter_ideas_saving, id: 'savings' },
  ]


  return (
    <Card>
      <CardHeader title="Quarterly Cash Flow" />
      <CardContent>
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
                {rows.map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {i === 0
                        && <TableCell align='left'>
                          Cost Without Automation
                                                </TableCell>}
                      {i === 1
                        && <TableCell align='left'>
                          Cost With Automation
                                                   </TableCell>}
                      {i === 2
                        && <TableCell align='left'>
                          Savings
                                                   </TableCell>}
                      {row.cells.map((cell, i) => {
                        return (
                          <TableCell key={`${cell}${i}`}
                          // align={column.align}
                          >
                            {cell}
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
      </CardContent>
    </Card>

  );
}
