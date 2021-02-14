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
  Typography
} from '@material-ui/core';

// ----------------------------------------------------------------------

function createData(title, info) {
  return { title, info };
}
const BASIC_TABLE = [
  createData('Project Sponsor', 'John Doe'),
  createData('Process Owner', 'Owner Name'),
  createData('Process Owner Email', 'owner@email.com'),
  createData('Process SME', 'Expert Name'),
  createData('Process SME Email', 'sme@email.com'),
  createData('Assigned Team', 'RPA Team 1')
];

const useStyles = makeStyles({
  root: {}
});

// ----------------------------------------------------------------------

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer
      component={Box}
      // sx={{ minWidth: 800, mt: 3 }}
      className={classes.root}
    >
      <Table>
        <TableBody>
          {BASIC_TABLE.map(row => (
            <TableRow key={row.title} className={classes.hideLastBorder}>
              <TableCell component="th" scope="row">
                <Typography variant='subtitle2' color='textSecondary'>
                  {row.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2'>
                  {row.info}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
