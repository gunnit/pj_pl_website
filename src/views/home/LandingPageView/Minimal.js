import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoints from 'hooks/useBreakpoints';
import { varFadeInUp, varFadeInDown, MotionInView } from 'components/Animate';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/static/images/icons/ic_sketch.svg',
    title: 'Govern your RPA CoE',
    description:
      'Perform a detailed assessment on your CoE to understand what needs improvement and use our guidelines on what to improve'
  },
  {
    icon: '/static/images/icons/ic_dashboard.svg',
    title: 'Manage your pipeline',
    description:
      'Track your projects from idea to development with full transparency on the complexity for automation and ROI expectations'
  },
  {
    icon: '/static/images/icons/ic_design.svg',
    title: 'Find new processes',
    description:
      'Use our taxonomy of thousands of processes enhanced by NLP to help you find your next candidate for your automation journey'
  }
];

const useStyles = makeStyles(theme => {
  const isLight = theme.palette.mode === 'light';

  const shadowCard = opacity =>
    isLight
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  const shadowIcon = color => {
    return {
      filter: `drop-shadow(2px 2px 2px ${alpha(
        theme.palette[color].main,
        0.48
      )})`
    };
  };

  return {
    root: {
      paddingTop: theme.spacing(15),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(15)
      }
    },
    heading: {
      marginBottom: theme.spacing(10),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(25)
      }
    },
    card: {
      maxWidth: 380,
      minHeight: 440,
      margin: 'auto',
      textAlign: 'center',
      padding: theme.spacing(10, 5, 0),
      boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
      [theme.breakpoints.up('md')]: {
        boxShadow: 'none',
        backgroundColor: theme.palette.grey[isLight ? 200 : 800]
      }
    },
    cardLeft: {
      [theme.breakpoints.up('md')]: {
        marginTop: -40
      }
    },
    cardCenter: {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    },
    cardIcon: {
      width: 40,
      height: 40,
      margin: 'auto',
      marginBottom: theme.spacing(10)
    },
    cardIconLeft: shadowIcon('info'),
    cardIconCenter: shadowIcon('error'),
    cardIconRight: shadowIcon('primary')
  };
});

// ----------------------------------------------------------------------

MinimalHelps.propTypes = {
  className: PropTypes.string
};

function MinimalHelps({ className }) {
  const classes = useStyles();
  const isDesktop = useBreakpoints('up', 'lg');

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <div className={classes.heading}>
          <MotionInView variants={varFadeInUp}>
            <Typography
              align="center"
              display="block"
              variant="overline"
              color="textSecondary"
              gutterBottom
            >
              HOW IT WORKS
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" align="center">
              ProcessLenz is built to help you scale digital transformation faster
            </Typography>
          </MotionInView>
        </div>

        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <Card
                  className={clsx(classes.card, {
                    [classes.cardLeft]: index === 0,
                    [classes.cardCenter]: index === 1
                  })}
                >
                  <img
                    src={card.icon}
                    alt={card.title}
                    className={clsx(classes.cardIcon, {
                      [classes.cardIconLeft]: index === 0,
                      [classes.cardIconCenter]: index === 1,
                      [classes.cardIconRight]: index === 2
                    })}
                  />
                  <Typography variant="h5" paragraph>
                    {card.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {card.description}
                  </Typography>
                </Card>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default MinimalHelps;