import React, { useState } from 'react';
import * as Yup from 'yup';
import Section from './Section';
import { useFormik } from 'formik';
import Page from 'components/Page';
import Logo from 'components/Logo';
import RegisterForm from './RegisterForm';
import closeFill from '@iconify-icons/eva/close-fill';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { PATH_PAGE } from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Hidden,
  Divider,
  Container,
  Typography
} from '@material-ui/core';
import { MIconButton } from '@material-extend';
import { emailUserId } from 'config';
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  header: {
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7)
    }
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  },
  divider: {
    margin: theme.spacing(3, 0)
  }
}));

// ----------------------------------------------------------------------

function RegisterView() {
  const classes = useStyles();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [registeredForBeta, setRegisteredForBeta] = useState(false)

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        // await firebase
        //   .auth()
        //   .createUserWithEmailAndPassword(values.email, values.password)
        //   .then(res => {
        //     firestore
        //       .collection('users')
        //       .doc(res.user.uid)
        //       .set({
        //         uid: res.user.uid,
        //         email: values.email,
        //         displayName: values.firstName + ' ' + values.lastName,
        //       });
        //   });
        // enqueueSnackbar('Login successful', {
        //   variant: 'success',
        //   action: key => (
        //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //       <Icon icon={closeFill} />
        //     </MIconButton>
        //   )
        // });

        setRegisteredForBeta(true)



        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: err.code });
          setSubmitting(false);
        }
      }
    }
  });

  return (
    <Page title="ProcessLenz | Register" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden smDown>
          <Box sx={{ mt: { md: -2 }, typography: 'body2' }}>
            Already have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to={PATH_PAGE.auth.login}
            >
              Login
            </Link>
          </Box>
        </Hidden>
      </header>

      <Hidden mdDown>
        <Section />
      </Hidden>

      {!registeredForBeta && <Container>
        <div className={classes.content}>
          <Typography variant="h4" gutterBottom>
            Get started absolutely free.
          </Typography>
          {/* <Typography color="textSecondary">
            Free forever. No credit card needed.
          </Typography> */}
          <Box sx={{ mb: 5 }} />

          {/* <SocialRegister firebase={firebase} />

          <Divider className={classes.divider}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Divider> */}

          <RegisterForm formik={formik} />

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" align="center" color="textSecondary">
              By register, I agree to the ProcessLenz&nbsp;
              <Link color="textPrimary" underline="always" href='https://docs.google.com/document/d/1_WordQ7awchCl-4qtdo1de8nOQLxyAhHhKVxaYE20SQ/edit' target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link color="textPrimary" underline="always" href='https://docs.google.com/document/d/1vhfOc2xALlS_0lH-IZUIpQMxVS5DHgWb5AYEUWP1UrA/edit' target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>

          <Hidden smUp>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link
                variant="subtitle2"
                to={PATH_PAGE.auth.login}
                component={RouterLink}
              >
                Login
              </Link>
            </Box>
          </Hidden>
        </div>
      </Container>}


      {registeredForBeta && <Container>
        <div className={classes.content}>
          {/* <Box
            component="img"
            alt="welcome"
            src="/static/images/illustrations/illustration_seo.svg"
            sx={{
              p: 2,
              height: 280,
              margin: { xs: 'auto', md: 'inherit' }
            }}
          /> */}
          <Typography variant="h4" gutterBottom>
            You're all set!
          </Typography>
          <Typography color="textSecondary">
            A confirmation email has been sent. We will contact you soon.
          </Typography>

        </div>
      </Container>}
    </Page>
  );
}

export default RegisterView;
