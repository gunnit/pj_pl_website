import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Step,
    Button,
    Stepper,
    StepLabel,
    Typography,
    StepConnector
} from '@material-ui/core';

// ----------------------------------------------------------------------

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

const useStyles = makeStyles(theme => ({
    root: {},
    button: { marginRight: theme.spacing(1) },
    instructions: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }
}));

function getSteps() {
    return ['Process Details', 'Process Characteristics', 'Process Ownership', 'Automation Requirements'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (
                <div>HDSFSDFSDFSDF</div>
            );
        case 1:
            return 'Process Characteristics';
        case 2:
            return 'Process Ownership';
        default:
            return 'Automation Requirements';
    }
}

function NewProcessStepper() {
    const classes = useStyles();
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

    return (
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
                                All steps completed - you&apos;re finished
              </Typography>
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
    );
}

export default NewProcessStepper;
