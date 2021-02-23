import 'firebase/auth';
import firebase from 'firebase/app';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik, Formik } from 'formik';
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
    TextField,
    MenuItem,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import { LoadingButton } from '@material-ui/lab';
import LoadingScreen from 'components/LoadingScreen';


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
    },
    margin: {
        marginBottom: theme.spacing(3)
    },
    helperText: {
        padding: theme.spacing(0, 2)
    }
}));

// ----------------------------------------------------------------------


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
    const [formikInitialValues, setFormikInitialValues] = useState({})
    const [formikValues, setFormikValues] = useState({})
    const [subgroups, setSubgroups] = useState(null)
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = value => {
        setOpenDialog(false);
    };


    const { userId, currentProcessId } = useContext(Context)

    const [activeStep, setActiveStep] = useState(0);
    const [pending, setPending] = useState(false)

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const AutomationAssessmentSchema = Yup.object().shape({
        // process_name: Yup.string().required('Name is required'),
        // pipeline: Yup.string().required('Pipeline is required'),
    });

    // const formik = useFormik({
    //     initialValues: {},
    //     enableReinitialize: true,
    //     validationSchema: AutomationAssessmentSchema,
    //     onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
    //         try {
    //             // await fakeRequest(500);
    //             resetForm();
    //             setSubmitting(false);
    //             enqueueSnackbar('Post success', { variant: 'success' });
    //         } catch (error) {
    //             console.log(error);
    //             setSubmitting(false);
    //             setErrors({ afterSubmit: error.code });
    //         }
    //     },
    //     validateOnMount: true
    // });



    const handleNext = async () => {
        if (activeStep < subgroups.length - 1) {

            setActiveStep(prevActiveStep => prevActiveStep + 1);

        } else {

            setPending(true)
            try {

                const token = await firebase.auth().currentUser.getIdToken(true);

                let storedProcessId;
                if (!currentProcessId) {
                    storedProcessId = localStorage.getItem('currentProcessId')
                }

                const res = await fetch(`${apiBaseUrl}/update_details/${currentProcessId || storedProcessId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formikValues),
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': token
                    }
                })

                setActiveStep(prevActiveStep => prevActiveStep + 1);


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
                const token = await firebase.auth().currentUser.getIdToken(true);


                let storedProcessId;
                if (!currentProcessId) {
                    storedProcessId = localStorage.getItem('currentProcessId')
                }

                const res = await fetch(`${apiBaseUrl}/automation_assessment/${userId}/${currentProcessId || storedProcessId}`, {
                    headers: {
                        'Authorization': token
                    }
                })

                const { questions, process_details } = await res.json()


                const initialValues = {
                    'Multiple Data Sources': process_details.multiple_data_sources,
                    'Demand Fluctuation': process_details.demand_fluctuation,
                    'Execution Frequency': process_details.frequency,
                    'Real Time': process_details.real_time,
                    'Supervisor Number': process_details.supervisor_number,
                    'Gathering Footprint': process_details.data_gathering_footprint,
                    'Time For Execution': process_details.time_for_execution,
                    'Staff Shuffling Present': process_details.shuffle_staffing,

                    'Historic Data': process_details.historical_data,
                    'Data Standardization': process_details.data_standardization,
                    'Incorrect Data': process_details.incorrect_data,
                    'Reconciliation': process_details.reconciliation,
                    'Data Rework': process_details.data_rework,
                    'Number of Applications': process_details.application,

                    'Hand Structured Input': process_details.hand_structured,
                    'Hand Unstructured Input:': process_details.hand_unstructured,
                    'Computer Structured Input': process_details.computer_structured,
                    'Computer Unstructured Input': process_details.computer_unstructured,
                    'Verbal Communication': process_details.verbal_app,
                    'Instant Communication': process_details.im_app,

                    'Technology Stability': process_details.tech_stability,
                    'Future Tech Changes': process_details.tech_changes,
                    'Security Restrictions': process_details.security_restrictions,
                    'Citrix App': process_details.citrix_app,
                    'Mainframe App': process_details.mainframe_app,
                    'Sap Screen': process_details.sap_screen,

                    // applications_tec , 

                    'Rule Based': process_details.rule_type,
                    'Transactional': process_details.transactional,
                    'Process Stability': process_details.process_stability,
                    'Swivel Activities': process_details.swivel,
                    'Clear Process Objectives': process_details.process_objectives,
                    'Stable Rules': process_details.stable_rules,
                    'Number Of Transactions': process_details.number_transactions,
                    'External Factors': process_details.external_factors,

                    'Number of Employees': process_details.employee_num,
                    'Number of FTE': process_details.fte_num,
                    'Employee Knowledge of Process': process_details.fte_expl,
                    'Employee Compensation': process_details.salary,
                    'Pain Point': process_details.pain_points,
                    'Rework Done': process_details.reworks_done,
                    'End to End execution': process_details.end_toend,
                    'Application Error': process_details.app_errors,
                    'Regulatory Requirements': process_details.reg_req,
                    'Process Standardization': process_details.process_standardization,
                    'Document Procedures': process_details.documented_procedures,
                    'Multiple Teams': process_details.multiple_teams,
                    'Process Owners': process_details.process_owners,
                }

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

                // questions need to be sorted by subgroup so the right questions will be displayed on each step

                const questionsSortedBySubgroup = {}

                // const initialValues = {}

                questions.forEach(question => {

                    // Future version:
                    // initialValues[question.id] = '' not sure about data type for future version

                    // initialValues[question.title] = '0'

                    if (questionsSortedBySubgroup[question.subgroup]) {
                        questionsSortedBySubgroup[question.subgroup].push(question)
                    } else {
                        questionsSortedBySubgroup[question.subgroup] = [question]

                    }
                })
                // console.log(initialValues)
                setFormikInitialValues(initialValues)
                setQuestions(questionsSortedBySubgroup)


            })()
        }

    }, [userId])




    // Shows part of the form for each step
    function getStepContent(step) {
        // step is a certain subgroup
        return (
            <Formik
                enableReinitialize
                initialValues={formikInitialValues}
            // validateOnMount
            >
                {({ handleChange, values }) => {
                    return (
                        <>
                            {questions[step].map(question => {
                                return (
                                    <>
                                        <Typography key={question.id.toString()} variant="subtitle1" gutterBottom>
                                            {question.question}
                                        </Typography >
                                        <TextField
                                            select
                                            fullWidth
                                            variant="outlined"
                                            label={question.title}
                                            onChange={(e) => {
                                                handleChange(e)
                                                setFormikValues(values)
                                            }}
                                            // Formik uses the name as the key to keep track of the field in the values object like this: values[name]
                                            // In the future, name and value will be question.id so it is unique but for right now the title is easier to work with
                                            name={question.title}
                                            value={values[question.title]}
                                            className={classes.margin}
                                        >
                                            {question.answers.map((answer, i) => (
                                                // database expects value as a string
                                                <MenuItem key={`${answer.text}${i}`} value={answer.value.toString()}>
                                                    {answer.text}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </>
                                )
                            })}
                        </>
                    )
                }}
            </Formik>
        )
    }

    if (!subgroups || !questions || !Object.keys(formikInitialValues).length) {
        return <LoadingScreen />
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
                        <Typography variant='h4' gutterBottom>Determine the automation potential</Typography>
                    </Grid>
                </Grid>
                <div className={classes.root}>
                    <Stepper
                        alternativeLabel
                        activeStep={activeStep}
                        connector={<ColorlibConnector />}
                    >
                        {subgroups.map(label => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <div>
                        {activeStep === subgroups.length ? (
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
                                        Assessment complete!
                                    </Typography>
                                    <Button variant='contained' component={RouterLink} to={PATH_APP.processes.details}>
                                        Back to Process Details
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
                                            {/* <FormikProvider value={formik}> */}

                                            {getStepContent(subgroups[activeStep])}

                                            {/* </FormikProvider> */}
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
                                            {activeStep === subgroups.length - 1 ? 'Submit' : 'Next'}
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