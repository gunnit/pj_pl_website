import clsx from 'clsx';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    MenuItem,
    InputAdornment
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
                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Robot Physical/Virtual Machine Cost"
                    {...getFieldProps('robot_physical_virtual_machine_cost')}
                    error={Boolean(touched.robot_physical_virtual_machine_cost && errors.robot_physical_virtual_machine_cost)}
                    // helperText={touched.robot_physical_virtual_machine_cost && errors.robot_physical_virtual_machine_cost}
                    className={classes.margin}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                        endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                    }}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Production Server Cost"
                    {...getFieldProps('production_server_cost')}
                    error={Boolean(touched.production_server_cost && errors.production_server_cost)}
                    // helperText={touched.production_server_cost && errors.production_server_cost}
                    className={classes.margin}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                        endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                    }}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Production Server Maintenance Cost"
                    {...getFieldProps('production_server_maintenance_cost')}
                    error={Boolean(touched.production_server_maintenance_cost && errors.production_server_maintenance_cost)}
                    // helperText={touched.production_server_maintenance_cost && errors.production_server_maintenance_cost}
                    className={classes.margin}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                        endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                    }}
                />

                <TextField
                    fullWidth
                    type='number'
                    color='secondary'
                    label="Other Infrastructure Costs"
                    {...getFieldProps('any_other_infrastructure_cost')}
                    error={Boolean(touched.any_other_infrastructure_cost && errors.any_other_infrastructure_cost)}
                    // helperText={touched.any_other_infrastructure_cost && errors.any_other_infrastructure_cost}
                    className={classes.margin}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>,
                        endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                    }}
                />


            </Form>
        </FormikProvider >
    );
}
