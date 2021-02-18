import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import LoadingScreen from 'components/LoadingScreen';
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
  Grid
} from '@material-ui/core';
import UpdateProcessFormDetails from './UpdateProcessFormDetails';
import UpdateProcessFormOwnership from './UpdateProcessFormOwnership';
import UpdateProcessFormCharacteristics from './UpdateProcessFormCharacteristics';
import UpdateProcessFormRequirements from './UpdateProcessFormRequirements';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

// const FILE_SIZE = 3145728; // bytes
// const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const useStyles = makeStyles(theme => ({
  root: {},
  button: { marginRight: theme.spacing(1) },
  instructions: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
  buttonContainer: {
    justifyContent: 'flex-end', spacing: 3
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
  active: { color: '#1890FF' },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  completed: {
    color: '#1890FF', zIndex: 1, fontSize: 18
  }
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

export default function UpdateProcessView() {
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
    increase_retention: 7,
  })
  const [checkboxValues, setCheckboxValues] = useState(new Set())
  const [applications, setApplications] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch applications from database
    (async function () {
      const res = await fetch(`${apiBaseUrl}/applications/`)
      // map over applications in jsx

      setApplications(await res.json())
    })()

  }, [])



  const { userId, currentProcessId } = useContext(Context)

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

  useEffect(() => {

    (async function () {
      const res = await fetch(`${apiBaseUrl}/update_process/${currentProcessId}`)
      const {
        process_name,
        process_L2_process_name,
        overview,
        description,
        pipline: pipeline,
        process_critical,
        process_type,
        business_unit,
        function: functionKey,
        process_documentation_available,
        nature_of_process,
        test_env_available,
        team,
        sponsor,
        process_SME,
        process_SME_email,
        process_SME_tel,
        owner_name,
        owner_email,
        process_objective,
        saving_target_explanation,
        num_of_manual_steps,
        note,
        cost_reduction,
        reduce_process_duration,
        improve_accuracy,
        enable_audit_trail,
        enable_scalability,
        improve_security,
        client_satisfaction,
        improve_consistency,
        improve_reliability,
        increase_retention,
        applications_tec,
      } = await res.json()

      formik.setValues({
        process_name,
        process_L2_process_name,
        overview,
        description,
        pipeline,
        process_critical,
        process_type,
        business_unit,
        function: functionKey,
        process_documentation_available,
        nature_of_process,
        test_env_available,
        team,
        sponsor,
        process_SME,
        process_SME_email,
        process_SME_tel,
        owner_name,
        owner_email,
        process_objective,
        saving_target_explanation,
        num_of_manual_steps,
        note,
      })

      setSliderValues({
        cost_reduction,
        reduce_process_duration,
        improve_accuracy,
        enable_audit_trail,
        enable_scalability,
        improve_security,
        client_satisfaction,
        improve_consistency,
        improve_reliability,
        increase_retention,
      })

      console.log(new Set([...applications_tec]))
      setCheckboxValues(new Set([...applications_tec]))

      setLoading(false)


    })()

  }, [])


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
        // const res = await fetch(`${apiBaseUrl}/create_process/`, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     ...formik.values,
        //     ...sliderValues,
        //     applications: [...checkboxValues],
        //     customer_id: userId
        //   }),
        //   headers: {
        //     "Content-Type": 'application/json',
        //   }
        //   // Authorization###
        // })

        // // Pipeline value is lower case in the context
        // const lowerCasePipeline = formik.values.pipeline.toLowerCase()
        // // processCounts in context needs to be updated for navbar numbers
        // setProcessCounts(previous => ({ ...previous, [lowerCasePipeline]: previous[lowerCasePipeline] + 1 }))

        // setActiveStep(prevActiveStep => prevActiveStep + 1);

        // const { id } = await res.json()

        // // Store ID of created process in context in case the user decides to view it
        // setCurrentProcessId(id)

      } catch (e) {
        console.error(e)
      }

    }

  };


  // Shows part of the form for each step
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UpdateProcessFormDetails formik={formik} />;
      case 1:
        return <UpdateProcessFormCharacteristics formik={formik} />;
      case 2:
        return <UpdateProcessFormOwnership formik={formik} />;
      default:
        return (
          <UpdateProcessFormRequirements
            formik={formik}
            applications={applications}
            checkboxValues={checkboxValues}
            setCheckboxValues={setCheckboxValues}
            sliderValues={sliderValues}
            setSliderValues={setSliderValues}
          />
        );
    }
  }


  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Page title="New Process" className={classes.root}>
      <Container>
        <Grid container justifyContent='space-between'>
          <Grid item container className={classes.buttonContainer} spacing={3}>
            <Grid item>
              <Button variant='contained' color='info'>Info</Button>
            </Grid>
            <Grid item>
              <Button variant='contained' color='info'>Share Form</Button>
            </Grid>
          </Grid>
          <Grid item marginBottom={3}>
            <Typography variant='h4' gutterBottom>Update process</Typography>
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
                      color='info'
                    >
                      Back
                    </Button>
                    <Button
                      disabled={pending}
                      variant="contained"
                      onClick={handleNext}
                      className={classes.button}
                      color='info'
                    >
                      {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                    </Button>
                    {/* <LoadingButton
                      pending={pending}
                      variant="contained"
                      pendingPosition="start"
                      startIcon={<AlarmIcon />}
                    >
                      Save
          </LoadingButton> */}
                  </Box>
                </div>
              )}
          </div>
        </div>
      </Container>
    </Page>
  );
}