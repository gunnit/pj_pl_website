import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Card, CardContent, ButtonGroup } from '@material-ui/core';
import { PATH_APP } from 'routes/paths'

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    // [theme.breakpoints.up('xl')]: {
    //   height: 320
    // }
  },
  content: {
    [theme.breakpoints.up('md')]: {
      padding: 0,
      paddingLeft: theme.spacing(5)
    },
  }
}));

// ----------------------------------------------------------------------

Welcome.propTypes = {
  displayName: PropTypes.string,
  className: PropTypes.string
};

function Welcome({ displayName, className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardContent className={classes.content}>
        <Box
          component="img"
          alt="welcome"
          src="/static/images/illustrations/illustration_seo.svg"
          sx={{
            p: 2,
            height: 280,
            margin: { xs: 'auto', md: 'inherit' }
          }}
        />
        <Box component="h4" sx={{ pb: 1, typography: 'h4', color: 'grey.800' }}>
          Welcome back, {!displayName ? '...' : displayName}!
        </Box>

        <Box
          component="p"
          sx={{ typography: 'body2', color: 'grey.800', pb: { xs: 3, xl: 5 } }}
        >
          {
            "It's time to get started! Insert a new opportunity now, or continue on your previous work."
          }
        </Box>

        <ButtonGroup variant='contained'>
          <Button variant="contained" to={PATH_APP.processes.new} component={RouterLink}>
            New Process
        </Button>
          <Button color='inherit' variant="contained" to={PATH_APP.processes.list} component={RouterLink}>
            Process List
        </Button>
        </ButtonGroup>
      </CardContent>


    </Card>
  );
}

export default Welcome;
