import React from 'react';
import Scrollbars from 'components/Scrollbars';
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
} from '@material-ui/core';
import { MLabel } from '../../../../@material-extend';
// ----------------------------------------------------------------------

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const BASIC_TABLE = [
  createData('Frozen yoghurt', 159, 6.0, 24, "CFO"),
  createData('Ice cream sandwich', 237, 9.0, 37, "CFO"),
  createData('Eclair', 262, 16.0, 24, "CFO"),
  createData('Cupcake', 305, 3.7, 67, "CFO"),
  createData('Gingerbread', 356, 16.0, 49, "CFO")
];

const useStyles = makeStyles({
  root: {}
});

// ----------------------------------------------------------------------

export default function BasicTable() {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="10 Most Recent Processes" />
      <Scrollbars>
        <TableContainer
          component={Box}
          sx={{ minWidth: 800, mt: 3 }}
          className={classes.root}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Process Name</TableCell>
                <TableCell align="right">Objective Alignment</TableCell>
                <TableCell align="right">Automation Potential</TableCell>
                <TableCell align="right">Saving</TableCell>
                <TableCell align="right">Owner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BASIC_TABLE.map(row => (
                <TableRow key={row.name} className={classes.hideLastBorder}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.calories}%
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color="info">
                          {row.fat}
                    </MLabel>
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color={row.carbs > 0 ? "primary" : "error"}>
                          {row.carbs}
                    </MLabel>
                  </TableCell>
                  <TableCell align="right">
                    {row.protein}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>
    </Card>
  );
}
