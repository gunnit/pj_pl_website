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
        touched,
        handleSubmit,
        getFieldProps,
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
                    label="Completion Time"
                    {...getFieldProps('completion_time')}
                    error={Boolean(touched.completion_time && errors.completion_time)}
                    // helperText={touched.completion_time && errors.completion_time}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Cases Worked"
                    {...getFieldProps('cases_worked')}
                    error={Boolean(touched.cases_worked && errors.cases_worked)}
                    // helperText={touched.cases_worked && errors.cases_worked}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Working Days Per Year"
                    {...getFieldProps('working_days')}
                    error={Boolean(touched.working_days && errors.working_days)}
                    // helperText={touched.working_days && errors.working_days}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Working Hours Per Day"
                    {...getFieldProps('working_hours_per_day')}
                    error={Boolean(touched.working_hours_per_day && errors.working_hours_per_day)}
                    // helperText={touched.working_hours_per_day && errors.working_hours_per_day}
                    className={classes.margin}
                />


                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Infrastructure Costs"
                    {...getFieldProps('infrastructure_costs')}
                    error={Boolean(touched.infrastructure_costs && errors.infrastructure_costs)}
                    // helperText={touched.infrastructure_costs && errors.infrastructure_costs}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Support Costs"
                    {...getFieldProps('support_cost')}
                    error={Boolean(touched.support_cost && errors.support_cost)}
                    // helperText={touched.support_cost && errors.support_cost}
                    className={classes.margin}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Other Costs"
                    {...getFieldProps('other_cost')}
                    error={Boolean(touched.other_cost && errors.other_cost)}
                    // helperText={touched.other_cost && errors.other_cost}
                    className={classes.margin}
                />


                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Employee Cost Per Year"
                    {...getFieldProps('average_fte_cost')}
                    error={Boolean(touched.average_fte_cost && errors.average_fte_cost)}
                    // helperText={touched.average_fte_cost && errors.average_fte_cost}
                    className={classes.margin}
                />



            </Form>
        </FormikProvider >
    );
}
