import clsx from 'clsx';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
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


export default function UpdateProcessFormCharacteristics({ formik, className, ...other }) {
    const classes = useStyles();
    const {
        errors,
        values,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        getFieldProps,
        handleChange
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
                    type='number'
                    color='secondary'
                    label="Internal Developer Cost"
                    {...getFieldProps('internal_developer_cost')}
                    error={Boolean(touched.internal_developer_cost && errors.internal_developer_cost)}
                    // helperText={touched.internal_developer_cost && errors.internal_developer_cost}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="% Internal Resources in CoE"
                    {...getFieldProps('internal_resources_CoE')}
                    error={Boolean(touched.internal_resources_CoE && errors.internal_resources_CoE)}
                    // helperText={touched.internal_resources_CoE && errors.internal_resources_CoE}
                    className={classes.margin}
                />


                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="External Developer Cost"
                    {...getFieldProps('average_developer_cost')}
                    error={Boolean(touched.average_developer_cost && errors.average_developer_cost)}
                    // helperText={touched.average_developer_cost && errors.average_developer_cost}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="External Resources in CoE"
                    {...getFieldProps('consulting_resources_in_CoE')}
                    error={Boolean(touched.consulting_resources_in_CoE && errors.consulting_resources_in_CoE)}
                    // helperText={touched.consulting_resources_in_CoE && errors.consulting_resources_in_CoE}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Total Days Required For Development"
                    {...getFieldProps('required_process_days')}
                    error={Boolean(touched.required_process_days && errors.required_process_days)}
                    // helperText={touched.required_process_days && errors.required_process_days}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Required Resources"
                    {...getFieldProps('required_resources_fte')}
                    error={Boolean(touched.required_resources_fte && errors.required_resources_fte)}
                    // helperText={touched.required_resources_fte && errors.required_resources_fte}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Coaching Factor"
                    {...getFieldProps('coaching_factor')}
                    error={Boolean(touched.coaching_factor && errors.coaching_factor)}
                    // helperText={touched.coaching_factor && errors.coaching_factor}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Estimated Maintenance Effort"
                    {...getFieldProps('estimated_maintenance_effort')}
                    error={Boolean(touched.estimated_maintenance_effort && errors.estimated_maintenance_effort)}
                    // helperText={touched.estimated_maintenance_effort && errors.estimated_maintenance_effort}
                    className={classes.margin}
                />

            </Form>
        </FormikProvider >
    );
}
