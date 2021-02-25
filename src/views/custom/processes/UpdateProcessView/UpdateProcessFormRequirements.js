import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    Slider,
    Typography,
    TextField,
    MenuItem,
    Grid,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { apiBaseUrl } from 'config';


const useStyles = makeStyles(theme => ({
    root: {},
    margin: {
        marginBottom: theme.spacing(3)
    },
    helperText: {
        padding: theme.spacing(0, 2)
    }
}));

function valuetext(value) {
    return `$${value}°C`;
}


export default function UpdateProcessFormRequirements({ formik, onOpenPreview, applications, sliderValues, setSliderValues, checkboxValues, setCheckboxValues, className, ...other }) {
    const classes = useStyles();
    const {
        errors,
        touched,
        handleSubmit,
        getFieldProps,
        handleChange,
    } = formik;


    const handleCheckboxChange = (e) => {

        if (checkboxValues.has(parseInt(e.target.value))) {
            const copy = new Set([...checkboxValues])
            copy.delete(parseInt(e.target.value))
            setCheckboxValues(copy)
        } else {
            const copy = new Set([...checkboxValues])

            setCheckboxValues(copy.add(parseInt(e.target.value)))
        }
    }



    return (
        <FormikProvider value={formik}>
            <Form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className={clsx(classes.root, className)}
                {...other}
            >
                <Typography variant='h4' gutterBottom>Execution</Typography>

                <Typography gutterBottom>Direct Cost Reduction</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.cost_reduction)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, cost_reduction: value }))}
                />
                <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    The desired goal from automation is to reduce costs with automation
                </Typography>

                <Typography gutterBottom>Reduce Process Duration</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.reduce_process_duration)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, reduce_process_duration: value }))}
                />
                <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    The end to end time for processes needs to improve
                </Typography>

                <Typography gutterBottom>Improve Accuracy</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.improve_accuracy)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, improve_accuracy: value }))}
                />
                <Typography gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    The quality of data generated by processes needs to improve
                </Typography>

                <Typography variant='h4' gutterBottom>Strategy</Typography>

                <Typography gutterBottom>Improve Audit Trail</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.enable_audit_trail)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, enable_audit_trail: value }))}
                />
                <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    Process steps need to be recorded and available for audit purposes
                </Typography>


                <Typography gutterBottom>Enable Scalability of Automation</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.enable_scalability)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, enable_scalability: value }))}
                />
                <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    Scaling automation within the different business departments in the company
                </Typography>

                <Typography variant='h4' gutterBottom>Risk</Typography>

                <Typography gutterBottom>Security</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.improve_security)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, improve_security: value }))}
                />
                <Typography gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    Process security from physical and cyber threats is a priority
                </Typography>


                <Typography gutterBottom>Improve Consistency</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.improve_consistency)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, improve_consistency: value }))}
                />
                <Typography gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    Processes overall need to perform better and be more stable
                </Typography>


                <Typography gutterBottom>Improve Reliability</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.improve_reliability)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, improve_reliability: value }))}
                />
                <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    The processes have to produce consistent results
                </Typography>

                <Typography variant='h4' gutterBottom>Customer</Typography>

                <Typography gutterBottom>Client Satisfaction</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.client_satisfaction)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, client_satisfaction: value }))}
                />
                <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    Processes need to improve to improve client satisfaction
                </Typography>

                <Typography variant='h4' gutterBottom>People</Typography>

                <Typography gutterBottom>Increase Retention</Typography>
                <Slider
                    color='secondary'
                    defaultValue={parseInt(sliderValues.increase_retention)}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, increase_retention: value }))}
                />
                <Typography gutterBottom
                    variant="subtitle2"
                    color="textSecondary">
                    By removing repetitive tasks employees will be able to perform more value adding tasks
                </Typography>


                {/* Find out what to change this name to */}
                <TextField
                    fullWidth
                    color='secondary'
                    type='number'
                    label="Savings Goal"
                    {...getFieldProps('process_objective')}
                    error={Boolean(touched.process_objective && errors.process_objective)}
                    helperText={'What is a quantitative measure on how success will be measured on the process?'}
                    className={classes.margin}
                />

                <TextField
                    color='secondary'
                    fullWidth
                    label="Savings Goal Justification"
                    {...getFieldProps('saving_target_explanation')}
                    error={Boolean(touched.saving_target_explanation && errors.saving_target_explanation)}
                    helperText={'Provide a short explanation on how you calculated the savings goal for this process.'}
                    className={classes.margin}
                />

                <TextField
                    select
                    color='secondary'
                    fullWidth
                    variant="outlined"
                    label="Number of Manual Steps"
                    {...getFieldProps('num_of_manual_steps')}
                    onChange={handleChange}
                    className={classes.margin}
                >
                    {/* Maybe change this to 0-9, 10-19, etc, 50+ */}
                    {['0-10', '10-20', '20-30', '30-40', '40-50', '51+'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography>Applications</Typography>
                <Grid container>
                    <FormGroup>
                        {applications.map(({ id, name }) => {
                            return (
                                <FormControlLabel
                                    checked={checkboxValues.has(id)}
                                    key={`${id}${name}`}
                                    control={<Checkbox color='secondary' />}
                                    label={name}
                                    value={id}
                                    onChange={handleCheckboxChange}
                                />
                            )
                        })}
                    </FormGroup>
                </Grid>


                <TextField
                    color='secondary'
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Explain pain points"
                    {...getFieldProps('note')}
                    error={Boolean(touched.note && errors.note)}
                    // helperText={touched.note && errors.note}
                    helperText={'List the main issues why this process needs to be automated'}
                    className={classes.margin}
                />

            </Form>
        </FormikProvider >
    );
}
