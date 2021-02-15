import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';
import { fShortenNumber } from 'utils/formatNumber';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import { ButtonAnimate } from 'components/Animate';
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    // color: theme.palette.info.darker,
    // backgroundColor: theme.palette.info.lighter,
    minWidth: 200
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


export default function ProcessListBox({ number, label, icon, color, backgroundColor, iconColor, backgroundImageColor, className, ...other }) {
  const classes = useStyles();

  return (
    <ButtonAnimate>
      <Card className={clsx(classes.root, className)} style={{ color, backgroundColor }} {...other}>
        <div className={classes.icon}>
          <Icon icon={icon} width={24} height={24} />
        </div>
        <Typography variant="h3">{fShortenNumber(number)}</Typography>
        <Box sx={{ opacity: 0.72, typography: 'subtitle2' }}>{label}</Box>
      </Card >
    </ButtonAnimate>
  );
}
