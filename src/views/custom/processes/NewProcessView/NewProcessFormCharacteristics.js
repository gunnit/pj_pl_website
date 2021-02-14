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

NewProcessFormCharacteristics.propTypes = {
    formik: PropTypes.object.isRequired,
    onOpenPreview: PropTypes.func,
    className: PropTypes.string
};

function NewProcessFormCharacteristics({ formik, onOpenPreview, className, ...other }) {
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

    const [processCritical, setProcessCritical] = useState('');
    const [businessProcess, setBusinessProcess] = useState('');
    const [businessUnit, setBusinessUnit] = useState('');
    const [businessFunction, setBusinessFunction] = useState('');
    const [documentationAvailable, setDocumentationAvailable] = useState('');
    const [natureOfProcess, setNatureOfProcess] = useState('');
    const [testEnvironmentAvailable, setTestEnvironmentAvailable] = useState('');


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
                    select
                    fullWidth
                    variant="outlined"
                    label="Process Critical"
                    value={processCritical}
                    onChange={(e) => setProcessCritical(e.target.value)}
                    helperText="If the process is down and operations need to be performed manually, how severe will the impact on business be? Extremely: the process is critical to business and is one of the core processes. Not at all: the process does not impact business and operations"
                    className={classes.margin}
                >
                    {['Extremely: Same hour critical', 'Very: Same day critical', 'Moderately: Same week critical', 'Slightly: Backlog acceptable', 'Not at all: Backlog acceptable'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Type of Business Process"
                    value={businessProcess}
                    onChange={(e) => setBusinessProcess(e.target.value)}
                    // helperText="If the process is down and operations need to be performed manually, how severe will the impact on business be? Extremely: the process is critical to business and is one of the core processes. Not at all: the process does not impact business and operations"
                    className={classes.margin}
                >
                    {['Core', 'Operating', 'Supporting', 'Development'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Business Unit"
                    value={businessUnit}
                    onChange={(e) => setBusinessUnit(e.target.value)}
                    // helperText="If the process is down and operations need to be performed manually, how severe will the impact on business be? Extremely: the process is critical to business and is one of the core processes. Not at all: the process does not impact business and operations"
                    className={classes.margin}
                >
                    {['CIO', 'CEO', 'CFO', 'CTO', 'COO', 'CRO', 'CMO', 'CCO', 'CHRO'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Function"
                    value={businessFunction}
                    onChange={(e) => setBusinessFunction(e.target.value)}
                    // helperText="If the process is down and operations need to be performed manually, how severe will the impact on business be? Extremely: the process is critical to business and is one of the core processes. Not at all: the process does not impact business and operations"
                    className={classes.margin}
                >
                    {['Finance', 'Inventory', 'Production', 'Supply Chain', 'Procurement', 'Accounting', 'HR', 'Legal', 'Marketing', 'Sales', 'Customer Services', 'Development', 'IT', 'Other'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Documentation Available"
                    value={documentationAvailable}
                    onChange={(e) => setDocumentationAvailable(e.target.value)}
                    helperText="Is documentation for the process available? E.g. flowcharts, knowhow doc, video recordings, etc."
                    className={classes.margin}
                >
                    {['Yes', 'No', 'Not sure'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Nature of Process"
                    value={natureOfProcess}
                    onChange={(e) => setNatureOfProcess(e.target.value)}
                    className={classes.margin}
                >
                    {['Entirely repetitive', 'Semi-repetitive', 'Not repetitive'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Test Environment Available"
                    value={testEnvironmentAvailable}
                    onChange={(e) => setTestEnvironmentAvailable(e.target.value)}
                    helperText="Is there a virtual test environment where the process could be developed?"
                    className={classes.margin}
                >
                    {['Yes', 'No', 'Not sure'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Form>
        </FormikProvider >
    );
}

export default NewProcessFormCharacteristics;
