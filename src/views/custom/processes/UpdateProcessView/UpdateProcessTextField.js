import clsx from 'clsx';
import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    MenuItem,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    margin: {
        marginBottom: theme.spacing(3)
    },
}));


export default function UpdateProcessTextField({
    id,
    fullWidth,
    label,
    error,
    getFieldProps,
    helperText,
}) {

    const classes = useStyles();


    return (
        <TextField
            color='secondary'
            fullWidth={fullWidth}
            label={label}
            {...getFieldProps(id)}
            error={error}
            helperText={helperText}
            className={classes.margin}
        />
    );
}
