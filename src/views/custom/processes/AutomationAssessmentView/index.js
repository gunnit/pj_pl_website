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

export default function AutomationAssessmentView() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [questions, setQuestions] = useState(null)
    const [subgroups, setSubgroups] = useState(null)
    const [openDialog, setOpenDialog] = useState(null);

    const handleCloseDialog = value => {
        setOpenDialog(null);
    };


    const { userId, currentProcessId } = useContext(Context)

    const [activeStep, setActiveStep] = useState(null);
    const [pending, setPending] = useState(false)
    const steps = getSteps();

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const AutomationAssessmentSchema = Yup.object().shape({
        process_name: Yup.string().required('Name is required'),
        pipeline: Yup.string().required('Pipeline is required'),
    });

    const formik = useFormik({
        initialValues: {
            process_name: '',
        },
        validationSchema: AutomationAssessmentSchema,
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

            // if (!formik.errors.name
            //     && !formik.errors.pipeline) {

            setActiveStep(prevActiveStep => prevActiveStep + 1);
            // }
        } else if (activeStep === 1) {

            setActiveStep(prevActiveStep => prevActiveStep + 1);

        } else if (activeStep === 2) {

            setActiveStep(prevActiveStep => prevActiveStep + 1);

        } else if (formik.isValid) {

            setPending(true)

            try {
                // const res = await fetch(`${apiBaseUrl}/create_process/`, {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         ...formik.values,
                //         ...sliderValues,
                //         applications: [...checkboxValues],
                //         customer_id: userId
                //     }),
                //     headers: {
                //         "Content-Type": 'application/json',
                //     }
                //     // Authorization###
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


    useEffect(() => {

        if (userId) {
            (async function () {
                // get questions
                // In the future will have the user select the category and use that category

                const res = await fetch(`${apiBaseUrl}/automation_assessment/${userId}`)

                const { questions } = await res.json()

                setQuestions(questions)
                setActiveStep(questions[0].subgroup)

                // Store subgroups. This requires subgroups to be in the correct order from the database

                const foundSubgroups = new Set()

                const subgroupsInOrder = questions.reduce((accum, { subgroup }) => {
                    // If subgroup isn't already added, add it to the set and push it to the accumulator so the same subgroup won't get added twice
                    if (!foundSubgroups.has(subgroup)) {
                        foundSubgroups.add(subgroup)
                        return [...accum, subgroup]
                    } else {
                        return accum
                    }
                }, [])

                setSubgroups(subgroupsInOrder)

            })()
        }

    }, [userId])




    // Shows part of the form for each step
    function getStepContent(step) {
        switch (step) {
            case questions:
                // return <Bottlenecks formik={formik} />;
                return <div>case0</div>

        }
    }

    return (
        <Page title="Automation Potential Assessment" className={classes.root}>
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
                                        <Button
                                            disabled={pending}
                                            variant="contained"
                                            onClick={handleNext}
                                            className={classes.button}
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