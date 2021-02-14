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
} from '@material-ui/core';
import { MLabel } from '@material-extend';

// ----------------------------------------------------------------------

function createData(category, yearOne, yearTwo, yearThree) {
  return { category, yearOne, yearTwo, yearThree };
}

const BASIC_TABLE = [
  createData('Cost without automation', 159, 6.0, 24),
  createData('Cost with automation', 237, 9.0, 37),
  createData('Savings', -237, 9.0, 37),
];

const useStyles = makeStyles({
  root: {}
});

// ----------------------------------------------------------------------

function ThreeYearProjectionsTable() {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="3 Year Projections" />
      <TableContainer
        component={Box}
        sx={{ minWidth: 800, mt: 3 }}
        className={classes.root}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Year One</TableCell>
              <TableCell align="right">Year Two</TableCell>
              <TableCell align="right">Year Three</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {BASIC_TABLE.map(row => (
              <TableRow key={row.name} className={classes.hideLastBorder}>
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                {row.category === 'Savings'
                  ?
                  <>
                    <TableCell align="right">
                      <MLabel variant="filled" color={row.yearOne > 0 ? "primary" : "error"}>
                        {row.yearOne}
                      </MLabel>
                    </TableCell>
                    <TableCell align="right">
                      <MLabel variant="filled" color={row.yearTwo > 0 ? "primary" : "error"}>
                        {row.yearTwo}
                      </MLabel>
                    </TableCell>
                    <TableCell align="right">
                      <MLabel variant="filled" color={row.yearThree > 0 ? "primary" : "error"}>
                        {row.yearThree}
                      </MLabel>
                    </TableCell>
                  </>
                  :
                  <>
                    <TableCell align="right">{row.yearOne}</TableCell>
                    <TableCell align="right">{row.yearTwo}</TableCell>
                    <TableCell align="right">{row.yearThree}</TableCell>
                  </>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default ThreeYearProjectionsTable;