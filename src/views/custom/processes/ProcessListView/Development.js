import clsx from 'clsx';
import React from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import gearsIcon from '@iconify-icons/whh/gears';
import { fShortenNumber } from 'utils/formatNumber';
import windowsFilled from '@iconify-icons/ant-design/windows-filled';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.warning.darker,
    backgroundColor: theme.palette.warning.lighter,
    width: '100%',
    '&:hover': {
      cursor: 'default'
    }
  },
  icon: {
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.warning.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.warning.dark,
      0
    )} 0%, ${alpha(theme.palette.warning.dark, 0.24)} 100%)`
  }
}));
// ----------------------------------------------------------------------


const TOTAL = 15;

export default function Development({ number, setPipelineFilter, className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other} onClick={() => setPipelineFilter('Development')}>
      <div className={classes.icon}>
        <Icon icon={gearsIcon} width={24} height={24} />
      </div>
      <Typography variant="h3">{fShortenNumber(number)}</Typography>
      <Box sx={{ opacity: 0.72, typography: 'subtitle2' }}>Development</Box>
    </Card>
  );
}