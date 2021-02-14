import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { QuillEditor } from '~/components/Editor';
import { UploadSingleFile } from '~/components/Upload';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Button,
    TextField,
    Typography,
    FormHelperText,
    MenuItem,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    margin: {
        marginBottom: theme.spacing(3)
    },
    helperText: {
        padding: theme.spacing(0, 2)
    }
}));

// ----------------------------------------------------------------------

NewProcessFormOwnership.propTypes = {
    formik: PropTypes.object.isRequired,
    onOpenPreview: PropTypes.func,
    className: PropTypes.string
};

function NewProcessFormOwnership({ formik, onOpenPreview, className, ...other }) {
    const classes = useStyles();
    const {
        errors,
        values,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        getFieldProps
    } = formik;



    return (
        <FormikProvider value={formik}>
            <Form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className={clsx(classes.root, className)}
                {...other}
            >
                <TextField
                    fullWidth
                    label="Project Sponsor"
                    {...getFieldProps('sponsor')}
                    error={Boolean(touched.sponsor && errors.sponsor)}
                    helperText={'Who in the company is financing the project?'}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    label="Assigned Team"
                    {...getFieldProps('team')}
                    error={Boolean(touched.team && errors.team)}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    label="Process SME"
                    {...getFieldProps('sme')}
                    error={Boolean(touched.sme && errors.sme)}
                    helperText={'Process subject matter expert name. The one with the most knowledge on the process.'}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='email'
                    label="Process SME Email"
                    {...getFieldProps('smeEmail')}
                    error={Boolean(touched.smeEmail && errors.smeEmail)}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    label="Process SME Phone Number"
                    {...getFieldProps('smePhone')}
                    error={Boolean(touched.smePhone && errors.smePhone)}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    label="Process Owner Name"
                    {...getFieldProps('ownerName')}
                    error={Boolean(touched.ownerName && errors.ownerName)}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    label="Process Owner Email"
                    {...getFieldProps('ownerEmail')}
                    error={Boolean(touched.ownerEmail && errors.ownerEmail)}
                    className={classes.margin}
                />

            </Form>
        </FormikProvider>
    );
}

export default NewProcessFormOwnership;
