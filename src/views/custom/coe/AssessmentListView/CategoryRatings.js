import clsx from 'clsx';
import React from 'react';
import { fPercent, fCurrency } from 'utils/formatNumber';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
import { MLinearProgress } from '@material-extend';

// ----------------------------------------------------------------------

const SALES = [
  {
    label: 'Total Profit',
    amount: 432,
    value: 54
  },
  {
    label: 'Total Income',
    amount: 432,
    value: 54
  },
  {
    label: 'Total Expenses',
    amount: 432,
    value: 54
  },
  {
    label: 'Total Profit',
    amount: 432,
    value: 54
  },
  {
    label: 'Total Income',
    amount: 432,
    value: 54
  },
  {
    label: 'Total Expenses',
    amount: 432,
    value: 54
  },
  {
    label: 'Total Expenses',
    amount: 432,
    value: 54
  },
];

const COLORS = ['primary', 'info', 'warning'];

const useStyles = makeStyles(theme => ({
  root: {},
  progressItem: {
    marginTop: theme.spacing(4),
    '&:first-child': { marginTop: theme.spacing(1) }
  }
}));

// ----------------------------------------------------------------------

function Progress({ progress, index }) {
  const classes = useStyles();

  return (
    <div className={classes.progressItem}>
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box component="h6" sx={{ typography: 'subtitle2', flexGrow: 1 }}>
          {progress.label}
        </Box>

        <Typography variant="body2">{fCurrency(progress.amount)}</Typography>
        <Typography variant="body2" color="textSecondary">
          &nbsp;({fPercent(progress.value)})
        </Typography>
      </Box>
      <MLinearProgress
        variant="determinate"
        value={progress.value}
        color={COLORS[index]}
      />
    </div>
  );
}

export default function CategoryRatings({ className, ...other }) {
  const classes = useStyles();

  return (
    <>
      {SALES.map((progress, index) => {
        return (
          <Progress key={progress.label} progress={progress} index={index} />
        );
      })}
    </>
  );
}
