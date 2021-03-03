import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fNumber } from 'utils/formatNumber';
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


const useStyles = makeStyles({
  root: {}
});


export default function ThreeYearProjectionsTable({
  total_process_years_ideas_with_auto,
  total_process_years_ideas_with_no_auto_total,
  total_process_years_ideas_savings_total,
}) {
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
            {[{
              name: 'Cost With Automation',
              yearOne: total_process_years_ideas_with_no_auto_total[0],
              yearTwo: total_process_years_ideas_with_no_auto_total[1],
              yearThree: total_process_years_ideas_with_no_auto_total[2],
            },
            {
              name: 'Cost Without Automation',
              yearOne: total_process_years_ideas_with_auto[0],
              yearTwo: total_process_years_ideas_with_auto[1],
              yearThree: total_process_years_ideas_with_auto[2],
            },
            {
              name: 'Savings',
              yearOne: total_process_years_ideas_savings_total[0],
              yearTwo: total_process_years_ideas_savings_total[1],
              yearThree: total_process_years_ideas_savings_total[2],
            }
            ].map(row => (
              <TableRow key={row.name} className={classes.hideLastBorder}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {row.name === 'Savings'
                  ?
                  <>
                    <TableCell align="right">
                      <MLabel variant="filled" color={row.yearOne > 0 ? "primary" : "error"}>
                      {row.yearOne >= 0 ? `$${fNumber(row.yearOne)}` : `-$${fNumber(-row.yearOne)}`}
                      </MLabel>
                    </TableCell>
                    <TableCell align="right">
                      <MLabel variant="filled" color={row.yearTwo > 0 ? "primary" : "error"}>
                      {row.yearTwo >= 0 ? `$${fNumber(row.yearTwo)}` : `-$${fNumber(-row.yearTwo)}`}
                      </MLabel>
                    </TableCell>
                    <TableCell align="right">
                      <MLabel variant="filled" color={row.yearThree > 0 ? "primary" : "error"}>
                      {row.yearThree >= 0 ? `$${fNumber(row.yearThree)}` : `-$${fNumber(-row.yearThree)}`}
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
