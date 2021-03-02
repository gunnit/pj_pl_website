import clsx from 'clsx';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
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
                <Grid container spacing={3}>
                    <Grid item sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Completion Time"
                            {...getFieldProps('completion_time')}
                            error={Boolean(touched.completion_time && errors.completion_time)}
                            helperText={'What is the completion time in minutes for one case?'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Cases Worked"
                            {...getFieldProps('cases_worked')}
                            error={Boolean(touched.cases_worked && errors.cases_worked)}
                            helperText={'What is the number of cases processed per year?'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><WorkOutlineIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">per year</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Working Days Per Year"
                            {...getFieldProps('working_days')}
                            error={Boolean(touched.working_days && errors.working_days)}
                            helperText={'The number of working days per year for a typical FTE'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">days</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Working Hours Per Day"
                            {...getFieldProps('working_hours_per_day')}
                            error={Boolean(touched.working_hours_per_day && errors.working_hours_per_day)}
                            helperText={'The number of working hours per day for a typical FTE'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><ScheduleIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={4} lg={4}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Infrastructure Costs"
                            {...getFieldProps('infrastructure_costs')}
                            error={Boolean(touched.infrastructure_costs && errors.infrastructure_costs)}
                            helperText={'Estimated annual cost of the either physical or virtual machine required in process'}
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
                            label="Support Costs"
                            {...getFieldProps('support_cost')}
                            error={Boolean(touched.support_cost && errors.support_cost)}
                            helperText={'Estimated annual support or helpdesk costs'}
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
                            label="Other Costs"
                            {...getFieldProps('other_cost')}
                            error={Boolean(touched.other_cost && errors.other_cost)}
                            helperText={'Any other annual costs required to complete the process'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={12} lg={12}>
                        <TextField
                            fullWidth
                            type='number'
                            color='secondary'
                            label="Employee Cost Per Year"
                            {...getFieldProps('average_fte_cost')}
                            error={Boolean(touched.average_fte_cost && errors.average_fte_cost)}
                            helperText={'The estimated employee cost for a year'}
                            className={classes.margin}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>

            </Form>
        </FormikProvider >
    );
}
