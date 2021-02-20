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

// ----------------------------------------------------------------------


const useStyles = makeStyles({
  root: {}
});

// ----------------------------------------------------------------------

export default function SuggestedTasks({ tasks }) {
  const classes = useStyles();


  return (
    <Card>
      <CardHeader title="Suggested Tasks" />

      <TableContainer
        component={Box}
        sx={{ minWidth: 800, mt: 3 }}
        className={classes.root}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="right">Start</TableCell>
              <TableCell align="right">Due</TableCell>
              <TableCell align="right">Days Remaining</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(({
              task_name,
              start_date,
              date_due,
              days_remaining_for_task,
              status
            }) => (
              <TableRow key={task_name} className={classes.hideLastBorder}>
                <TableCell component="th" scope="row">
                  {task_name}
                </TableCell>
                <TableCell align="right">{start_date}</TableCell>
                <TableCell align="right">{date_due}</TableCell>
                <TableCell align="right">{days_remaining_for_task}</TableCell>
                <TableCell align="right">{status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>

  );
}
