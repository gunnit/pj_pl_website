import clsx from 'clsx';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    MenuItem,
    InputAdornment,
    Grid
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ScheduleIcon from '@material-ui/icons/Schedule';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
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
                    <Grid item sm={12} md={8} lg={8}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Internal Developer Cost"
                            {...getFieldProps('internal_developer_cost')}
                            error={Boolean(touched.internal_developer_cost && errors.internal_developer_cost)}
                            helperText={'Daily cost of a fully trained internal developer'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={4} lg={4}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="% Internal Resources in CoE"
                            {...getFieldProps('internal_resources_CoE')}
                            error={Boolean(touched.internal_resources_CoE && errors.internal_resources_CoE)}
                            helperText={'% of fully trained internal resources within the CoE (Center of Excellence)'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={8} lg={8}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="External Developer Cost"
                            {...getFieldProps('average_developer_cost')}
                            error={Boolean(touched.average_developer_cost && errors.average_developer_cost)}
                            helperText={'Daily cost of an contractor developer'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={4} lg={4}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="External Resources in CoE"
                            {...getFieldProps('consulting_resources_in_CoE')}
                            error={Boolean(touched.consulting_resources_in_CoE && errors.consulting_resources_in_CoE)}
                            helperText={'% of fully trained external resources within the CoE (Center of Excellence)'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={8} lg={8}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Total Days Required For Development"
                            {...getFieldProps('required_process_days')}
                            error={Boolean(touched.required_process_days && errors.required_process_days)}
                            helperText={'Total number of days required to develop the process'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">days</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={4} lg={4}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Required Resources"
                            {...getFieldProps('required_resources_fte')}
                            error={Boolean(touched.required_resources_fte && errors.required_resources_fte)}
                            helperText={'How many FTE are required for this process'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">FTE</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Coaching Factor"
                            {...getFieldProps('coaching_factor')}
                            error={Boolean(touched.coaching_factor && errors.coaching_factor)}
                            helperText={'Percent of external team time spent on coaching new resources.'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Estimated Maintenance Effort"
                            {...getFieldProps('estimated_maintenance_effort')}
                            error={Boolean(touched.estimated_maintenance_effort && errors.estimated_maintenance_effort)}
                            helperText={'Estimated maintenance effort per process per year when in production, percentage of development effort'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider >
    );
}
