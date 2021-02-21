import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, InlineIcon } from '@iconify/react';
import rocket11 from '@iconify-icons/maki/rocket-11';
import { fShortenNumber } from 'utils/formatNumber';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.info.darker,
    backgroundColor: theme.palette.info.lighter,
    width: '100%'
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
    color: theme.palette.info.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.info.dark,
      0
    )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`
  }
}));

// ----------------------------------------------------------------------


const TOTAL = 31;

function NewUsers({ setPipelineFilter, className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other} onClick={() => setPipelineFilter('Pipeline')}>
      <div className={classes.icon}>
        <Icon icon={rocket11} width={24} height={24} />
      </div>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Box sx={{ opacity: 0.72, typography: 'subtitle2' }}>Pipeline</Box>
    </Card>
  );
}

export default NewUsers;
