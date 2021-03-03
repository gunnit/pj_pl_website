import React from 'react';
import Page from 'components/Page';
import HugePackElements from './HugePackElements';
import { makeStyles } from '@material-ui/core/styles';
import BetaInfo from './BetaInfo';
import Footer from './Footer';

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

export default function AboutPageView() {
  const classes = useStyles();

  return (
    <Page title="ProcessLenz | Home" id="move_top" className={classes.root}>
      <div className={classes.content}>
        <HugePackElements />
        <BetaInfo />
        <Footer />
      </div>
    </Page>
  );
}
