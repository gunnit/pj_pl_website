import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import NewProcessFormDetails from './NewProcessFormDetails';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import { useSnackbar } from 'notistack';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Stepper,
  StepLabel,
  Box,
  StepConnector,
  Step,
  Button,
  Grid,
  Dialog,
  Card,
} from '@material-ui/core';
import NewProcessFormOwnership from './NewProcessFormOwnership';
import NewProcessFormCharacteristics from './NewProcessFormCharacteristics';
import NewProcessFormRequirements from './NewProcessFormRequirements';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import { LoadingButton } from '@material-ui/lab';
import AlarmIcon from '@material-ui/icons/Alarm';

// ----------------------------------------------------------------------

// const FILE_SIZE = 3145728; // bytes
// const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const useStyles = makeStyles(theme => ({
  root: {},
  button: { marginRight: theme.spacing(1) },
  instructions: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
  buttonContainer: {
    justifyContent: 'flex-end', spacing: 3
  },
  dialog: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
  }
}));

// ----------------------------------------------------------------------

function getSteps() {
  return ['Process Details', 'Process Characteristics', 'Process Ownership', 'Automation Requirements'];
}

const useQontoStepIconStyles = makeStyles({
  root: {
    height: 22,
    display: 'flex',
    color: '#eaeaf0',
    alignItems: 'center'
  },
  active: { color: '#00AB55' },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  completed: { color: '#00AB55', zIndex: 1, fontSize: 18 }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
          <div className={classes.circle} />
        )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};


const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)'
    }
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)'
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    width: 50,
    height: 50,
    color: '#fff',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    backgroundColor: '#ccc',
    justifyContent: 'center'
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)'
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <VideoLabelIcon />
  };
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

export default function NewProcessView() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [sliderValues, setSliderValues] = useState({
    cost_reduction: 7,
    reduce_process_duration: 7,
    improve_accuracy: 7,
    enable_audit_trail: 7,
    enable_scalability: 7,
    improve_security: 7,
    client_satisfaction: 7,
    improve_consistency: 7,
    improve_reliability: 7,
    increase_retention: 7
  })
  const [checkboxValues, setCheckboxValues] = useState(new Set())
  const [applications, setApplications] = useState([])
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = value => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // fetch applications from database
    (async function () {
      // map over applications in jsx
      const token = await firebase.auth().currentUser.getIdToken(true);

      const res = await fetch(`${apiBaseUrl}/applications/`, {
        headers: {
          'Authorization': token
        }
      })

      setApplications(await res.json())
    })()

  }, [])



  const { userId, currentProcessId, setCurrentProcessId, setProcessCounts } = useContext(Context)

  const [activeStep, setActiveStep] = useState(0);
  const [pending, setPending] = useState(false)
  const steps = getSteps();

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const NewProcessSchema = Yup.object().shape({
    // min and max lengths? no reason for minimum, they can always edit it
    process_name: Yup.string().required('Name is required'),
    // process_L2_process_name: Yup.string().required('Level 2 Name is required'),
    pipeline: Yup.string().required('Pipeline is required'),
    // overview: Yup.string().required('Overview is required'),
    // description: Yup.string().required('Description is required'),
    // processCritical: Yup.string().required('Process critical is required'),
    // businessProcess: Yup.string().required('Business process is required'),
    // businessUnit: Yup.string().required('Business unit is required'),
    // businessFunction: Yup.string().required('Business function is required'),
    // documentationAvailable: Yup.string().required('Documentation available is required'),
    // natureOfProcess: Yup.string().required('Nature of process is required'),
    // testEnvironmentAvailable: Yup.string().required('Test environment is required'),
    // sponsor: Yup.string().required('Sponsor is required'),
    // sme: Yup.string().required('SME is required'),
    // smeEmail: Yup.string().email().required('SME Email is required'),
    // ownerName: Yup.string().required('Owner name is required'),
    // ownerEmail: Yup.string().required('Owner email is required'),
    // savingsGoal: Yup.number().positive().required('Savings goal is required'),
    // savingsGoalJustification: Yup.string().required('Savings goal justification is required'),
    // manualSteps: Yup.string().required('Number of manual steps is required'),
    // painPoints: Yup.string().required('Pain points are required'),

    // content: Yup.string()
    //   .min(1000)
    //   .required('Content is required'),

  });

  const formik = useFormik({
    initialValues: {
      process_name: '',
      process_L2_process_name: '',
      overview: '',
      description: '',
      pipeline: '',
      process_critical: '',
      process_type: '',
      business_unit: '',
      function: '',
      process_documentation_available: '',
      nature_of_process: '',
      test_env_available: '',
      team: '',
      sponsor: '',
      process_SME: '',
      process_SME_email: '',
      process_SME_tel: '',
      owner_name: '',
      owner_email: '',
      process_objective: null,
      saving_target_explanation: '',
      num_of_manual_steps: '',
      note: '',
    },
    validationSchema: NewProcessSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        setErrors({ afterSubmit: error.code });
      }
    },
    validateOnMount: true
  });

  const handleNext = async () => {
    if (activeStep === 0) {

      if (!formik.errors.name
        && !formik.errors.pipeline) {

        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {

      setActiveStep(prevActiveStep => prevActiveStep + 1);

    } else if (activeStep === 2) {

      setActiveStep(prevActiveStep => prevActiveStep + 1);

    } else if (formik.isValid) {

      setPending(true)

      try {
        const token = await firebase.auth().currentUser.getIdToken(true);

        const res = await fetch(`${apiBaseUrl}/create_process/`, {
          method: 'POST',
          body: JSON.stringify({
            ...formik.values,
            ...sliderValues,
            applications: [...checkboxValues],
            customer_id: userId
          }),
          headers: {
            "Content-Type": 'application/json',
            "Authorization": token
          }
        })

        // processCounts in context needs to be updated for navbar numbers
        setProcessCounts(previous => ({ ...previous, [formik.values.pipeline]: previous[formik.values.pipeline] + 1 }))

        setActiveStep(prevActiveStep => prevActiveStep + 1);

        const { id } = await res.json()

        // Store ID of created process in context in case the user decides to view it
        setCurrentProcessId(id)
        localStorage.setItem('currentProcessId', id)

      } catch (e) {
        console.error(e)
      }

    }

  };



  // Shows part of the form for each step
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <NewProcessFormDetails formik={formik} />;
      case 1:
        return <NewProcessFormCharacteristics formik={formik} />;
      case 2:
        return <NewProcessFormOwnership formik={formik} />;
      default:
        return <NewProcessFormRequirements formik={formik} applications={applications} checkboxValues={checkboxValues} setCheckboxValues={setCheckboxValues} setSliderValues={setSliderValues} />;
    }
  }
  return (
    <Page title="New Process" className={classes.root}>
      <Container>
        <Grid container justifyContent='space-between'>
          <Grid item container className={classes.buttonContainer} spacing={3}>
            <Grid item>
              <Button variant='contained' onClick={() => setOpenDialog(true)}>Info</Button>
            </Grid>
            <Grid item>
              <Button variant='contained'>Share Form</Button>
            </Grid>
          </Grid>
          <Grid item marginBottom={3}>
            <Typography variant='h4' gutterBottom>Create a new process</Typography>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === steps.length ? (
              <>
                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    minHeight: 120,
                    bgcolor: 'background.neutral'
                  }}
                >
                  <Typography className={classes.instructions}>
                    {/* All steps completed - you&apos;re finished */}
                    New process submitted successfully!
                  </Typography>
                  <Button variant='contained' component={RouterLink} to={PATH_APP.processes.details}>
                    View Process Details
                  </Button>
                </Box>
              </>
            ) : (
                <div>
                  <Box
                    sx={{
                      p: 3,
                      mb: 3,
                      minHeight: 120,
                      bgcolor: 'background.neutral'
                    }}
                  >
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    {activeStep !== steps.length - 1
                      ? <Button
                        disabled={pending}
                        variant="contained"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                      : <LoadingButton
                        pending={pending}
                        variant="contained"
                        onClick={handleNext}
                        pendingPosition="center"
                      // startIcon={<AlarmIcon />}
                      >
                        Save
                      </LoadingButton>}
                  </Box>
                </div>
              )}
          </div>
        </div>


        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          {openDialog
            && <>
              <Card className={classes.dialog}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    A few simple reminders:
                </Typography>
                  <Typography variant="subtitle1" color='textSecondary'>
                    Below is the process form, your starting point for creating a new process. The process is connected to all of the criteria of the process that make it unique. A process can have many different parameters. For now, let's focus on setting up the basic information. None of the fields are mandatory - input what you know and feel, but the more information you can collect the better results you will get. Have fun!
                  </Typography>
                </Box>
                <Box
                  component="img"
                  alt="reminders-image"
                  src={''}
                  sx={{
                    p: 2,
                    height: 205,
                    margin: { xs: 'auto', md: 'inherit' }
                  }}
                />
              </Card>
            </>}
        </Dialog>
      </Container>
    </Page>
  );
}