import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'components/Page';
import React, { useState } from 'react';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import NewProcessFormDetails from './NewProcessFormDetails';
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
  Button
} from '@material-ui/core';
import NewProcessFormOwnership from './NewProcessFormOwnership';
import NewProcessFormCharacteristics from './NewProcessFormCharacteristics';
import NewProcessFormRequirements from './NewProcessFormRequirements';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';

// ----------------------------------------------------------------------

// const FILE_SIZE = 3145728; // bytes
// const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const useStyles = makeStyles(theme => ({
  root: {},
  button: { marginRight: theme.spacing(1) },
  instructions: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }
}));

// ----------------------------------------------------------------------

function getSteps() {
  return ['Process Details', 'Process Characteristics', 'Process Ownership', 'Automation Requirements'];
}



const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  active: {
    '& $line': {
      borderColor: '#00AB55' // same as theme.palette.primary.main
    }
  },
  completed: {
    '& $line': {
      borderColor: '#00AB55'
    }
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

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


function NewPostView() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();



  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const NewProcessSchema = Yup.object().shape({
    // min and max lengths? no reason for minimum, they can always edit it
    name: Yup.string().required('Name is required'),
    name2: Yup.string().required('Level 2 Name is required'),
    pipelineSelect: Yup.string().required('Pipeline is required'),
    overview: Yup.string().required('Overview is required'),
    description: Yup.string().required('Description is required'),
    processCritical: Yup.string().required('Process critical is required'),
    businessProcess: Yup.string().required('Business process is required'),
    businessUnit: Yup.string().required('Business unit is required'),
    businessFunction: Yup.string().required('Business function is required'),
    documentationAvailable: Yup.string().required('Documentation available is required'),
    natureOfProcess: Yup.string().required('Nature of process is required'),
    testEnvironmentAvailable: Yup.string().required('Test environment is required'),
    sponsor: Yup.string().required('Sponsor is required'),
    sme: Yup.string().required('SME is required'),
    smeEmail: Yup.string().email().required('SME Email is required'),
    ownerName: Yup.string().required('Owner name is required'),
    ownerEmail: Yup.string().required('Owner email is required'),
    savingsGoal: Yup.number().positive().required('Savings goal is required'),
    savingsGoalJustification: Yup.string().required('Savings goal justification is required'),
    manualSteps: Yup.string().required('Number of manual steps is required'),
    painPoints: Yup.string().required('Pain points are required'),

    // content: Yup.string()
    //   .min(1000)
    //   .required('Content is required'),

  });

  const formik = useFormik({
    initialValues: {
      name: '',
      name2: '',
      overview: '',
      description: '',
      pipelineSelect: '',
      processCritical: '',
      businessProcess: '',
      businessUnit: '',
      businessFunction: '',
      documentationAvailable: '',
      natureOfProcess: '',
      testEnvironmentAvailable: '',
      sponsor: '',
      sme: '',
      smeEmail: '',
      ownerName: '',
      ownerEmail: '',
      savingsGoal: '',
      savingsGoalJustification: '',
      manualSteps: '',
      painPoints: '',
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


  const handleNext = () => {
    if (activeStep === 0) {

      if (!formik.errors.name
        && !formik.errors.name2
        && !formik.errors.pipelineSelect
        && !formik.errors.overview
        && !formik.errors.description) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }

    } else if (activeStep === 1) {

      if (!formik.errors.processCritical
        && !formik.errors.businessProcess
        && !formik.errors.businessFunction
        && !formik.errors.documentationAvailable
        && !formik.errors.natureOfProcess
        && !formik.errors.testEnvironmentAvailable) {

        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }

    } else if (activeStep === 2) {

      if (!formik.errors.sponsor
        && !formik.errors.sme
        && !formik.errors.smeEmail
        && !formik.errors.ownerName
        && !formik.errors.ownerEmail) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }

    } else if (formik.isValid) {

      setActiveStep(prevActiveStep => prevActiveStep + 1);

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
        return <NewProcessFormRequirements formik={formik} />;
    }
  }
  return (
    <Page title="New Process" className={classes.root}>
      <Container>
        <Typography variant='h4' gutterBottom>Create a new process</Typography>
        <div className={classes.root}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
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
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </div>
              )}
          </div>
        </div>
      </Container>
    </Page>
  );
}

export default NewPostView;
