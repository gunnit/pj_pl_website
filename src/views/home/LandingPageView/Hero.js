import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { BASE_IMG } from 'utils/getImages';
import { PATH_APP, PATH_HOME } from 'routes/paths';
import flashFill from '@iconify-icons/eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
import {
  varFadeIn,
  varWrapEnter,
  varFadeInUp,
  varFadeInRight
} from 'components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Link, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    backgroundColor: '#F2F3F5',
    [theme.breakpoints.up('md')]: {
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      position: 'fixed',
      alignItems: 'center'
    }
  },
  content: {
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left'
    }
  },
  heroOverlay: {
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  },
  heroImg: {
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    width: '100%',
    margin: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      right: '8%',
      width: 'auto',
      height: '72vh'
    }
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    }
  }
}));

// ----------------------------------------------------------------------

const getImg = width =>
  `${BASE_IMG}w_${width}/v1611472901/upload_minimal/home/hero.png`;

Hero.propTypes = {
  className: PropTypes.string
};

function Hero({ className }) {
  const classes = useStyles();

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={varWrapEnter}
        className={clsx(classes.root, className)}
      >
        <motion.img
          alt="overlay"
          src="/static/images/overlay.svg"
          variants={varFadeIn}
          className={classes.heroOverlay}
        />

        <motion.img
          alt="product"
          data-sizes="auto"
          data-src={getImg(600)}
          data-srcset={`${getImg(1200)} 600w, ${getImg(1600)} 960w`}
          variants={varFadeInUp}
          className={clsx(classes.heroImg, 'lazyload')}
        />

        <Container maxWidth="lg">
          <div className={classes.content}>
            <motion.div variants={varFadeInRight}>
              <Box
                component="h1"
                sx={{ typography: 'h1', color: 'common.white' }}
              >
                SCALE PROCESS<br />
                AUTOMATION <br /> THE
                <Typography component="span" variant="h1" color="primary">
                  &nbsp;SMART WAY
                </Typography>
              </Box>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Box component="p" sx={{ color: 'common.white', py: 5 }}>
                ProcessLenz provides a centralized one-click view of your
                RPA life cycle and is the starting point for all your automation projects.
              </Box>
            </motion.div>

            <motion.div variants={varFadeInRight} className={classes.link}>
              <Box
                component="img"
                alt="sketch icon"
                src="static/images/icons/love-camera.svg"
                sx={{ mr: 1, width: 20, height: 20 }}
              />
              <Link
                color="inherit"
                underline="always"
                href={PATH_HOME.cloud}
                target="_blank"
              >
                Video Preview
              </Link>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_APP.main.dashboard}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                Join Private Beta
              </Button>
            </motion.div>

            <Box
              sx={{
                mt: 5,
                display: 'flex',
                justifyContent: { xs: 'center', md: 'left' },
                '& > *:not(:last-of-type)': { mr: 1.5 }
              }}
            >
              <motion.img
                variants={varFadeInRight}
                src="/static/images/icons/ic_m_sketch.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/images/icons/ic_m_sketch.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/images/icons/ic_m_sketch.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/images/icons/ic_m_sketch.svg"
              />
            </Box>
          </div>
        </Container>
      </motion.div>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

export default Hero;
