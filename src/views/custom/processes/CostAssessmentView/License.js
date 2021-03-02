import clsx from 'clsx';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Grid,
    InputAdornment
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ScheduleIcon from '@material-ui/icons/Schedule';
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
                <Grid container spacing={3}>
                    <Grid item lg={12}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Robot License Cost"
                            {...getFieldProps('robot_license_cost')}
                            error={Boolean(touched.robot_license_cost && errors.robot_license_cost)}
                            // helperText={touched.robot_license_cost && errors.robot_license_cost}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Robot Working Days Per Year"
                            {...getFieldProps('robot_working_days_per_year')}
                            error={Boolean(touched.robot_working_days_per_year && errors.robot_working_days_per_year)}
                            // helperText={touched.robot_working_days_per_year && errors.robot_working_days_per_year}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">days</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4}>

                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Robot Working Hours Per Day"
                            {...getFieldProps('robot_working_hours_per_day')}
                            error={Boolean(touched.robot_working_hours_per_day && errors.robot_working_hours_per_day)}
                            // helperText={touched.robot_working_hours_per_day && errors.robot_working_hours_per_day}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4}>

                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Robot Completion Time"
                            {...getFieldProps('completion_time_robot')}
                            error={Boolean(touched.completion_time_robot && errors.completion_time_robot)}
                            // helperText={touched.completion_time_robot && errors.completion_time_robot}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider >
    );
}
