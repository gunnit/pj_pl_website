import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, InlineIcon } from '@iconify/react';
import ideaIcon from '@iconify-icons/flat-color-icons/idea';
import { fShortenNumber } from 'utils/formatNumber';
import appleFilled from '@iconify-icons/ant-design/apple-filled';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.info.darker,
    backgroundColor: theme.palette.info.lighter
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

NewUsers.propTypes = {
  className: PropTypes.string
};

const TOTAL = 31;

function NewUsers({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <div className={classes.icon}>
        <Icon icon={ideaIcon} width={24} height={24} />
      </div>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Box sx={{ opacity: 0.72, typography: 'subtitle2' }}>Pipeline</Box>
    </Card>
  );
}

export default NewUsers;
