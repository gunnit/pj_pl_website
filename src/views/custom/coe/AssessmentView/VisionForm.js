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

VisionForm.propTypes = {
    formik: PropTypes.object.isRequired,
    onOpenPreview: PropTypes.func,
    className: PropTypes.string
};



function VisionForm({ formik, onOpenPreview, className, ...other }) {
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

    const [Q1, setQ1] = useState('');
    const [Q2, setQ2] = useState('');
    const [Q3, setQ3] = useState('');
    const [Q4, setQ4] = useState('');
    const [Q5, setQ5] = useState('');
    const [Q6, setQ6] = useState('');
    const [Q7, setQ7] = useState('');
    const [Q8, setQ8] = useState('');
    const [Q9, setQ9] = useState('');
    const [Q10, setQ10] = useState('');
    const [Q11, setQ11] = useState('');
    const [Q12, setQ12] = useState('');
    const [Q13, setQ13] = useState('');
    const [Q14, setQ14] = useState('');
    const [Q15, setQ15] = useState('');
    const [Q16, setQ16] = useState('');




    return (
        <FormikProvider value={formik}>
            <Form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className={clsx(classes.root, className)}
                {...other}
            >
                <Typography variant="subtitle2" gutterBottom>
                    Please outline your organization's objectives for your RPA capability. What benefits are you aiming to achieve, and how are these aligned with your corporate strategy?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q1"
                    value={Q1}
                    onChange={(e) => setQ1(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'RPA objectives are clearly aligned with corporate strategy.',
                        'RPA objectives need adjustments and are aligned with corporate strategy.',
                        'Work In Progress',
                        'We are looking to identify the objectives of RPA and how these are aligned with the corporate strategy.',
                        'There are no clear objectives or alignment to strategy.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    Please describe how your vision for RPA and strategy has been documented and communicated throughout your organization. Is there a vision statement?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q2"
                    value={Q2}
                    onChange={(e) => setQ2(e.target.value)}
                    // helperText="If the process is down and operations need to be performed manually, how severe will the impact on business be? Extremely: the process is critical to business and is one of the core processes. Not at all: the process does not impact business and operations"
                    className={classes.margin}
                >
                    {[
                        'The RPA strategy has been documented, there is a vision statement and is communicated to all key stakeholders.',
                        'Vision statement needs adjustments along with strategy documentation.',
                        'Work In Progress',
                        'We are looking to produce vision statement',
                        'There is no vision statement, related strategy documentation or plans to provide something.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    Who has defined and agreed to the vision? Which stakeholder groups understand and align with the vision?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q3"
                    value={Q3}
                    onChange={(e) => setQ3(e.target.value)}
                    // helperText="If the process is down and operations need to be performed manually, how severe will the impact on business be? Extremely: the process is critical to business and is one of the core processes. Not at all: the process does not impact business and operations"
                    className={classes.margin}
                >
                    {[
                        'Vision is cascaded from the top of the organization and Head of RPA. There is clear ownership of vision and all key stakeholders are aligned with it.',
                        'Vision is cascaded from the top of the organization and Head of RPA. There is sufficient ownership of vision and some of the stakeholders are aligned with it.',
                        'Vision is cascaded by the Head of RPA. There is sufficient ownership of vision but stakeholders are not aligned.',
                        'Vision is cascaded by the Head of RPA. There is insufficient ownership of vision although some stakeholders are aligned.',
                        'Vision is cascaded by the Head of RPA. There is insufficient ownership of vision and stakeholders are not aligned.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    How often do you evaluate the role of RPA achieving goals and aligning with the corporate strategy?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q4"
                    value={Q4}
                    onChange={(e) => setQ4(e.target.value)}
                    // helperText="If the process is down and operations need to be performed manually, how severe will the impact on business be? Extremely: the process is critical to business and is one of the core processes. Not at all: the process does not impact business and operations"
                    className={classes.margin}
                >
                    {[
                        'We are having frequent evaluations and updates (i.e. per FY basis, semester, when strategy changes).',
                        'When there is an urgency.',
                        'Work In Progress',
                        'Are looking to evaluate',
                        'Never been evaluated and there are no plans to do this.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    Describe your management communication plan. How often is it updated and which stakeholders have agreed to it?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q5"
                    value={Q5}
                    onChange={(e) => setQ5(e.target.value)}
                    helperText="Is documentation for the process available? E.g. flowcharts, knowhow doc, video recordings, etc."
                    className={classes.margin}
                >
                    {[
                        'There is a management communication plan, that is often updated and it is signed off by key stakeholders such as IT, CoE, senior sponsor, steering group and operation representatives.',
                        'Plan exists, all key stakeholders (IT,CoE,senior sponsors, steering group and operation representatives) have agreed but it is not regularly updated.',
                        'Plan exists although it is not agreed with key stakeholders or it is not updated.',
                        'Are looking to produce a communication management plan.',
                        'There is no communication management plan.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    How are you evaluating the effectiveness of current communications?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q6"
                    value={Q6}
                    onChange={(e) => setQ6(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'Yes we are using KPIs and they are effective.',
                        'We are using some effectiveness check but not KPIs',
                        'Work In Progress',
                        'Are looking to have some measurements of success',
                        'No there is no measurement.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    How are you measuring success and effectiveness of the processes that are automated? Are any KPI's (Key Performance Indicators) used?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q7"
                    value={Q7}
                    onChange={(e) => setQ7(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'Yes we are using KPIs and they are effective.',
                        'We are using some effectiveness check but not KPIs',
                        'Work In Progress',
                        'Are looking to have some measurements of success',
                        'No there is no measurement.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography variant="subtitle2" gutterBottom>
                    How often are the KPI's evaluated and updated? Are the KPI's aligned to corporate strategy?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q8"
                    value={Q8}
                    onChange={(e) => setQ8(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'KPIs are evaluated frequently, corrective actions are taken and are aligned with corporate strategy.',
                        'It is work in Progress and KPIs are aligned with corporate strategy.',
                        'There are thoughts of evaluating the KPIs and align them to the corporate strategy.',
                        'KPIs have never been evaluated and there are no current plans to evaluate them.',
                        'There are no measurements at all.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    Please describe the Executive Leadership for RPA within your organization.
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q9"
                    value={Q9}
                    onChange={(e) => setQ9(e.target.value)}
                    helperText="Is there an executive sponsor and a steering group constructively challenging and supporting on decision making the CoE team?"
                    className={classes.margin}
                >
                    {[
                        'Yes there is a senior sponsor and a steering group.',
                        'There is a senior sponsor but not a steering group.',
                        'Work In Progress',
                        'We are looking to have a steering group and a senior sponsor.',
                        'No there is no senior sponsorship or steering group.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography variant="subtitle2" gutterBottom>
                    Which other departments are involved in RPA?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q10"
                    value={Q10}
                    onChange={(e) => setQ10(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'We have involved the IT, Operations, Business Excellence and subject matter experts.',
                        'RPA objectives need adjustments and are aligned with corporate strategy.',
                        'Work In Progress',
                        'We are looking to identify the objectives of RPA and how these are aligned with the corporate strategy.',
                        'There are no clear objectives or alignment to strategy.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    Please describe how your organization has filled the role of Head of Robotic Process Automation.
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q11"
                    value={Q11}
                    onChange={(e) => setQ11(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'There is a person that fills the Head of RPA (internal and full time) and the role is in accordance to the RPA job description.',
                        'There is a Head of RPA but his role is not covering some of the points that are raised in the RPA job description..',
                        'They have advertised the role and at the moment it is primarily done by partners (i.e. ROM Architect)',
                        'We are looking to bring someone (internal or partner) to fill the role.',
                        'There is no ROM Architect and not current plan on how to fill this role.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    Please describe how your organization has filled the role of ROM Architect.
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q12"
                    value={Q12}
                    onChange={(e) => setQ12(e.target.value)}
                    helperText="Do you have a Centralized organizational structure where a CoE acts as a central unit for all divisions controlling the RPA implementation? If not, do you have a divisional structure where you have a divisional CoE per division initiating and controlling the implementation of RPA? Do you have a federated organizational structure where you have several divisional CoEs and one centralized CoE? Are you following a hybrid approach of all the above mentioned models?"
                    className={classes.margin}
                >
                    {[
                        'There is a person that fills the ROM Architect role and is  a certified RPA ROM Architect.',
                        'There is a ROM Architect and is looking to be certified as a RPA ROM Architect.',
                        'We have advertised the role and at the moment it is primarily done by partners.',
                        'We are looking to bring someone (internal or partner) to fill the role..',
                        'There is no ROM Architect and not current plan on how to fill this role.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    Please describe the organizational structure that supports RPA within your enterprise and how organizational change is managed?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q13"
                    value={Q13}
                    onChange={(e) => setQ13(e.target.value)}
                    helperText="Key roles are Head of RPA, senior sponsor of RPA, ROM architect, Analyst, Developer, Technical Architect, Controller."
                    className={classes.margin}
                >
                    {[
                        'There is clear organization structure and plan on managing organizational changes.',
                        'There is clear organization structure but not a plan on managing organizational changes.',
                        'Work In Progress',
                        'We are looking on the organizational structure options.',
                        'There is no clear organizational structure.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography variant="subtitle2" gutterBottom>
                    Is the enterprise aware of the key roles and responsibilities within the RPA capability? Describe how they are communicated.
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q14"
                    value={Q14}
                    onChange={(e) => setQ14(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'Yes there are clear roles and responsibilities and are communicated to all key stakeholders via variable communication links (i.e. electronic announcements, meetings etc.)',
                        'There are clear roles and responsibilities but they are not advertised.',
                        'Work In Progress',
                        'Are looking to define some roles and responsibilities.',
                        'There are no clear roles and responsibilities.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="subtitle2" gutterBottom>
                    How positive is your organization to the adoption of RPA?
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q15"
                    value={Q15}
                    onChange={(e) => setQ15(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'People are positive to RPA and want to be involved.',
                        'People are positive to RPA but have not expressed the desire to be involved.',
                        'Some people are positive and some neutral.',
                        'Few people are positive but majority is negative.',
                        'People are negative and concerned on changes through RPA.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography variant="subtitle2" gutterBottom>
                    Describe how the organization celebrates successful outcomes of RPA.
                </Typography>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Q16"
                    value={Q16}
                    onChange={(e) => setQ16(e.target.value)}
                    className={classes.margin}
                >
                    {[
                        'The organization is celebrating successful outcomes of RPA through communication, recognition, rewards on employees involved etc.',
                        'Organization is currently only communicating to some of the employees successful outcomes.',
                        'Organization has celebrated only to small groups successful outcomes.',
                        'Organization has not celebrated successful outcomes although there are some thoughts.',
                        'Organization has not celebrated successful outcomes and there is no current plan.',
                    ].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Form>
        </FormikProvider >
    );
}

export default VisionForm;
