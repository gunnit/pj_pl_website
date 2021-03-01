import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Grid
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
                <Grid container spacing={3}>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            label="Project Sponsor"
                            {...getFieldProps('sponsor')}
                            error={Boolean(touched.sponsor && errors.sponsor)}
                            helperText={'Who in the company is financing the project?'}
                            className={classes.margin}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            label="Assigned Team"
                            {...getFieldProps('team')}
                            error={Boolean(touched.team && errors.team)}
                            className={classes.margin}
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            label="Process SME"
                            {...getFieldProps('process_SME')}
                            error={Boolean(touched.process_SME && errors.process_SME)}
                            helperText={'Process subject matter expert name. The one with the most knowledge on the process.'}
                            className={classes.margin}
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type='email'
                            label="Process SME Email"
                            {...getFieldProps('process_SME_email')}
                            error={Boolean(touched.process_SME_email && errors.process_SME_email)}
                            className={classes.margin}
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type='number'
                            label="Process SME Phone Number"
                            {...getFieldProps('process_SME_tel')}
                            error={Boolean(touched.smePhone && errors.smePhone)}
                            className={classes.margin}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                            fullWidth
                            label="Process Owner Name"
                            {...getFieldProps('owner_name')}
                            error={Boolean(touched.ownerName && errors.ownerName)}
                            className={classes.margin}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                            fullWidth
                            label="Process Owner Email"
                            {...getFieldProps('owner_email')}
                            error={Boolean(touched.ownerEmail && errors.ownerEmail)}
                            className={classes.margin}
                        />
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
}

export default NewProcessFormOwnership;
