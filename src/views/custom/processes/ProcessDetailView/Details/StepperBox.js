import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card } from '@material-ui/core';
import CustomizedStepper from './CustomizedStepper';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
}));

// ----------------------------------------------------------------------

StepperBox.propTypes = {
    className: PropTypes.string,
};


function StepperBox({ className, ...other }) {
    const classes = useStyles();

    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
                <CustomizedStepper />
            </Box>
        </Card>
    );
}

export default StepperBox;
