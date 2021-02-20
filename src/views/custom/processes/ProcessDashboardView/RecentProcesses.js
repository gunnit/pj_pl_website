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


const useStyles = makeStyles({
  root: {}
});

// ----------------------------------------------------------------------

export default function RecentProcesses({ processes }) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Recently Created Processes" />
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
                <TableCell align="right">Automation Score</TableCell>
                <TableCell align="right">Savings</TableCell>
                <TableCell align="right">Owner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processes.map(({
                name,
                objectiveAlignment,
                automationScore,
                savings,
                businessUnit,
                businessFunction,
              }, i) => (
                <TableRow key={`${name}${i}`} className={classes.hideLastBorder}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">
                    {objectiveAlignment}%
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color="info">
                      {automationScore}
                    </MLabel>
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color={savings > 0 ? "primary" : "error"}>
                      {savings}
                    </MLabel>
                  </TableCell>
                  <TableCell align="right">{(businessUnit && businessFunction) ? `${businessUnit} - ${businessFunction}` : !!businessUnit ? `${businessUnit}` : !!businessFunction ? businessFunction : ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>
    </Card>
  );
}
