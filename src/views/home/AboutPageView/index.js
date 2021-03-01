import React from 'react';
import Page from 'components/Page';
import ListElements from './ListFile';
import HugePackElements from './HugePackElements';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  }
}));

function LandingPageView() {
  const classes = useStyles();

  return (
    <Page title="ProcessLenz | Home" id="move_top" className={classes.root}>

      <div className={classes.content}>
        <HugePackElements />
      </div>
    </Page>
  );
}

export default LandingPageView;
