import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import DarkMode from './DarkMode';
import Page from 'components/Page'
import ProcessLenz from './Minimal';
import Advertisement from './Advertisement';
// import CleanInterfaces from './CleanInterfaces';
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
      <Hero />
      <div className={classes.content}>
        <ProcessLenz />
        <HugePackElements />
        <DarkMode />


        {/* <CleanInterfaces /> */}
        <Advertisement />
        <Footer />
      </div>
    </Page>
  );
}

export default LandingPageView;
