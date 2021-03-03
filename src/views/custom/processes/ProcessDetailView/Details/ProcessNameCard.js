import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, Button } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    // backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    [theme.breakpoints.up('xl')]: {
      height: 320
    }
  },
  content: {
    [theme.breakpoints.up('md')]: {
      padding: 0,
      paddingLeft: theme.spacing(5)
    }
  }
}));
// ----------------------------------------------------------------------



export default function ProcessNameCard({ stage, process_name, process_L2_process_name, process_l3_process_name, className, ...other }) {
  const classes = useStyles();

  const theme = useTheme()

  let backgroundColor;
  if (stage === 'Idea') {
    backgroundColor = theme.palette.info.lighter
  }
  if (stage === 'Pipeline') {
    backgroundColor = theme.palette.error.lighter
  }

  if (stage === 'Development') {
    backgroundColor = theme.palette.warning.lighter

  }

  if (stage === 'Production') {
    backgroundColor = theme.palette.primary.lighter
  }

  let buttonColor;
  if (stage === 'Idea') {
    buttonColor = 'info'
  }
  if (stage === 'Pipeline') {
    buttonColor = 'error'
  }

  if (stage === 'Development') {
    buttonColor = 'warning'
  }

  if (stage === 'Production') {
    buttonColor = 'primary'
  }

  return (
    <Card className={clsx(classes.root, className)} {...other} style={{ backgroundColor }}>
      <CardContent className={classes.content}>
        <Box component="h4" sx={{ pb: 1, typography: 'h4', color: 'grey.800' }}>
          {process_name}
        </Box>

        <Box
          component="p"
          sx={{ typography: 'body2', color: 'grey.800', pb: { xs: 3, xl: 5 } }}
        >
          {process_L2_process_name}
          <br />
          {process_l3_process_name}
        </Box>
        <Button
          variant='contained'
          color={buttonColor}
        >View as PDF</Button>
      </CardContent>


      <Box
        component="img"
        alt="welcome"
        src="/static/images/process/undraw_new_ideas_jdea.svg"
        sx={{
          p: 2,
          height: 280,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </Card>
  );
}
