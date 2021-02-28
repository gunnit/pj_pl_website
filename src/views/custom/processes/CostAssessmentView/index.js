import 'firebase/auth';
import firebase from 'firebase/app';
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
    Box,
    StepConnector,
    Step,
    Button,
    Grid,
    Dialog,
    Card,
    StepButton,
    StepLabel,
} from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import { LoadingButton } from '@material-ui/lab';
import Page500View from 'views/errors/Page500View';
import CurrentProcess from './CurrentProcess';
import Development from './Development';
import Infrastructure from './Infrastructure';
import License from './License';
// ----------------------------------------------------------------------


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

export default function CostAssessmentView() {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [openDialog, setOpenDialog] = useState(false)



    const { userId, currentProcessId } = useContext(Context)

    const [activeStep, setActiveStep] = useState(0);
    const [pending, setPending] = useState(false)
    const steps = [
        {
            label:
                'Current Process',
            step: 0
        },
        {
            label:
                'Development',
            step: 1
        },
        {
            label:
                'License',
            step: 2
        },
        {
            label:
                'Infrastructure',
            step: 3
        },
    ];

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const NewProcessSchema = Yup.object().shape({

    });

    const formik = useFormik({
        initialValues: {
            completion_time: '',
            cases_worked: '',
            working_days: '',
            working_hours_per_day: '',
            infrastructure_costs: '',
            support_cost: '',
            other_cost: '',
            average_fte_cost: '',
            internal_developer_cost: '',
            internal_resources_CoE: '',
            average_developer_cost: '',
            consulting_resources_in_CoE: '',
            required_process_days: '',
            required_resources_fte: '',
            coaching_factor: '',
            estimated_maintenance_effort: '',
            robot_physical_virtual_machine_cost: '',
            production_server_cost: '',
            production_server_maintenance_cost: '',
            any_other_infrastructure_cost: '',
            robot_license_cost: '',
            robot_working_days_per_year: '',
            robot_working_hours_per_day: '',
            completion_time_robot: '',
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


        try {

            let storedProcessId;

            if (!currentProcessId) {
                storedProcessId = localStorage.getItem('currentProcessId')
                // If there is no currentProcessId in context or local storage, the page cannot load
                if (!storedProcessId) {
                    setError(true)
                }
            }

            (async function () {
                const token = await firebase.auth().currentUser.getIdToken(true);

                const res = await fetch(`${apiBaseUrl}/update_assumptions/${currentProcessId || storedProcessId}`, {
                    headers: {
                        'Authorization': token
                    }
                })

                if (!res.ok) {
                    throw res
                }

                const {
                    completion_time,
                    cases_worked,
                    working_days,
                    working_hours_per_day,
                    infrastructure_costs,
                    support_cost,
                    other_cost,
                    average_fte_cost,
                    internal_developer_cost,
                    internal_resources_CoE,
                    average_developer_cost,
                    consulting_resources_in_CoE,
                    required_process_days,
                    required_resources_fte,
                    coaching_factor,
                    estimated_maintenance_effort,
                    robot_physical_virtual_machine_cost,
                    production_server_cost,
                    production_server_maintenance_cost,
                    any_other_infrastructure_cost,
                    robot_license_cost,
                    robot_working_days_per_year,
                    robot_working_hours_per_day,
                    completion_time_robot,
                } = await res.json()

                formik.setValues({
                    completion_time,
                    cases_worked,
                    working_days,
                    working_hours_per_day,
                    infrastructure_costs,
                    support_cost,
                    other_cost,
                    average_fte_cost,
                    internal_developer_cost,
                    internal_resources_CoE,
                    average_developer_cost,
                    consulting_resources_in_CoE,
                    required_process_days,
                    required_resources_fte,
                    coaching_factor,
                    estimated_maintenance_effort,
                    robot_physical_virtual_machine_cost,
                    production_server_cost,
                    production_server_maintenance_cost,
                    any_other_infrastructure_cost,
                    robot_license_cost,
                    robot_working_days_per_year,
                    robot_working_hours_per_day,
                    completion_time_robot,
                })

                setLoading(false)


            })()

        } catch (e) {
            setError(true)
        }

    }, [])


    const handleNext = async () => {
        if (activeStep === 0) {

            setActiveStep(prevActiveStep => prevActiveStep + 1);

        } else if (activeStep === 1) {

            setActiveStep(prevActiveStep => prevActiveStep + 1);

        } else if (activeStep === 2) {

            setActiveStep(prevActiveStep => prevActiveStep + 1);

        } else if (formik.isValid) {

            setPending(true)

            try {
                const token = await firebase.auth().currentUser.getIdToken(true);

                let storedProcessId;
                if (!currentProcessId) {
                    storedProcessId = localStorage.getItem('currentProcessId')
                }

                const res = await fetch(`${apiBaseUrl}/update_assumptions/${currentProcessId || storedProcessId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        ...formik.values,
                    }),
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": token
                    }
                })

                if (!res.ok) {
                    throw res
                }

                // setActiveStep(prevActiveStep => prevActiveStep + 1);


                history.push(PATH_APP.processes.details)

                enqueueSnackbar('Costs updated', { variant: 'success' })




            } catch (e) {
                setError(true)
            }

        }

    };


    // Shows part of the form for each step
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CurrentProcess formik={formik} />
            case 1:
                return <Development formik={formik} />
            case 2:
                return <License formik={formik} />
            default:
                return <Infrastructure formik={formik} />
        }
    }

    if (error) {
        return <Page500View />
    }

    if (loading) {
        return <LoadingScreen />
    }



    return (
        <Page title="Cost Assessment" className={classes.root}>
            <Container>
                <Grid container justifyContent='space-between'>
                    <Grid item container className={classes.buttonContainer} spacing={3}>
                        <Grid item>
                            <Button variant='contained' color='secondary' onClick={() => setOpenDialog(true)}>Info</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='secondary'>Share Form</Button>
                        </Grid>
                    </Grid>
                    <Grid item marginBottom={3}>
                        <Typography variant='h4' gutterBottom>Update costs</Typography>
                    </Grid>
                </Grid>
                <div className={classes.root}>
                    <Stepper
                        alternativeLabel
                        activeStep={activeStep}
                        connector={<ColorlibConnector />}
                    >
                        {steps.map(({ label, step }) => (
                            <Step key={label}>
                                <StepLabel className={classes.stepLabel} onClick={() => setActiveStep(step)} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
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
                                        Your changes were saved.
                                    </Typography>
                                    <Button color='secondary' variant='contained' component={RouterLink} to={PATH_APP.processes.details}>
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
                                            color='secondary'
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