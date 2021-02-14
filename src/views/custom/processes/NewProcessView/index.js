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
  Card,
  CardContent,
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

// ----------------------------------------------------------------------

const FILE_SIZE = 3145728; // bytes
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

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
      borderColor: '#784af4'
    }
  },
  completed: {
    '& $line': {
      borderColor: '#784af4'
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
  active: { color: '#784af4' },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  completed: { color: '#784af4', zIndex: 1, fontSize: 18 }
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
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    name2: Yup.string().required('Name is required'),
    overview: Yup.string().required('Overview is required'),
    description: Yup.string().required('Description is required'),
    // content: Yup.string()
    //   .min(1000)
    //   .required('Content is required'),
    // cover: Yup.mixed()
    //   .required('Cover is required')
    //   .test(
    //     'fileSize',
    //     `File is larger than ${fData(FILE_SIZE)}`,
    //     value => value && value.size <= FILE_SIZE
    //   )
    //   .test(
    //     'fileFormat',
    //     'File type must be *.jpeg, *.jpg, *.png, *.gif',
    //     value => value && FILE_FORMATS.includes(value.type)
    //   )
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      name2: '',
      overview: '',
      description: '',
      // content: '',
      // cover: null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        setErrors({ afterSubmit: error.code });
      }
    }
  });

  // Shows part of the form for each step
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <NewProcessFormDetails formik={formik} onOpenPreview={handleOpenPreview} />;
      case 1:
        return <NewProcessFormCharacteristics formik={formik} onOpenPreview={handleOpenPreview} />;
      case 2:
        return <NewProcessFormOwnership formik={formik} onOpenPreview={handleOpenPreview} />;
      default:
        return <NewProcessFormRequirements formik={formik} onOpenPreview={handleOpenPreview} />;
    }
  }
  return (
    <Page title="New Process" className={classes.root}>
      <Container>
        {/* Add margin to Typography */}
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
                  {/* Put a link here to the new process with 'Click here to view' */}
                </Box>

                <Button onClick={handleReset} className={classes.button}>
                  Reset
            </Button>
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