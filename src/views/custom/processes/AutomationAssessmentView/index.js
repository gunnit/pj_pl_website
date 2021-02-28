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
import { Link as RouterLink, useHistory } from 'react-router-dom';
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
    },
    stepLabel: {
        '&:hover': {
            cursor: 'pointer'
        }
    },

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
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();

    const [questions, setQuestions] = useState(null)
    const [formikInitialValues, setFormikInitialValues] = useState({})
    const [formikValues, setFormikValues] = useState({})
    const [weights, setWeights] = useState({})
    const [answerTexts, setAnswerTexts] = useState({})
    const [subgroups, setSubgroups] = useState(null)
    const [openDialog, setOpenDialog] = useState(false);
    const [scoreSubgroups, setScoreSubgroups] = useState({})

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

                const res = await fetch(`${apiBaseUrl}/automation_assessment/${userId}/${currentProcessId || storedProcessId}`, {
                    method: 'POST',
                    body: JSON.stringify({ ...formikValues, weights, answerTexts, scoreSubgroups }),
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': token
                    }
                })

                if (!res.ok) {
                    throw res
                }

                // setActiveStep(prevActiveStep => prevActiveStep + 1);
                history.push(PATH_APP.processes.details)

                enqueueSnackbar('Automation assessment updated', { variant: 'success' })


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

                const { questions } = await res.json()



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

                const initialValues = {}

                const weights = {}

                const answerTexts = {}

                const scoreSubgroups = {}

                questions.forEach(question => {

                    if (question.score) {
                        initialValues[question.id] = question.score.answer // this is a number as a string
                        answerTexts[question.id] = question.score.answer_text // display text of the answer. ex: "Yes", "No", "Often"
                    } else {
                        initialValues[question.id] = '0'
                        answerTexts[question.id] = 'Not Answered'
                        // store subgroup in a way that can be matched to score easily
                    }
                    scoreSubgroups[question.id] = question.subgroup // store subgroup in a way that can be matched to score easily
                    weights[question.id] = question.weight

                    if (questionsSortedBySubgroup[question.subgroup]) {
                        questionsSortedBySubgroup[question.subgroup].push(question)
                    } else {
                        questionsSortedBySubgroup[question.subgroup] = [question]
                    }

                })
                // console.log(initialValues)
                setFormikInitialValues(initialValues)
                setQuestions(questionsSortedBySubgroup)
                setWeights(weights)
                setAnswerTexts(answerTexts)
                setScoreSubgroups(scoreSubgroups)

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
                                    <div key={question.id.toString()}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            {question.question}
                                        </Typography >
                                        <TextField
                                            select
                                            fullWidth
                                            variant="outlined"
                                            label={question.title}
                                            onChange={(e) => {
                                                handleChange(e)

                                                // Why? I think it had to do with scope and not wanting to rearrange everything
                                                setFormikValues({ ...values, [question.id]: e.target.value })

                                                // Don't know how else to get the text of the answer aside from looking through the answers array and matching it to the value
                                                const answerText = question.answers.filter(answer => {
                                                    return answer.value.toString() === e.target.value
                                                })[0].text

                                                setAnswerTexts(previous => ({ ...previous, [question.id]: answerText }))
                                            }}
                                            // Formik uses the name as the key to keep track of the field in the values object like this: values[name]
                                            name={question.id}
                                            value={values[question.id]}
                                            className={classes.margin}
                                        >
                                            {question.answers.map((answer, i) => (
                                                <MenuItem key={`${answer.text}${i}`} value={answer.value.toString()}>
                                                    {answer.text}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
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
                        {subgroups.map((label, step) => (
                            <Step key={label}>
                                <StepLabel className={classes.stepLabel} onClick={() => setActiveStep(step)} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>                            </Step>
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
                                        {activeStep !== subgroups.length - 1
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
                                    src={'/static/images/process/undraw_Detailed_information_re_qmuc.svg'}
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