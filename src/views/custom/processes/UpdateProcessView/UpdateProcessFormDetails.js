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



export default function UpdateProcessFormDetails({ formik, triedToClickPast, className, ...other }) {
  const classes = useStyles();
  const {
    errors,
    touched,
    handleSubmit,
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
        <TextField
          color='secondary'
          fullWidth
          label="Process Name"
          {...getFieldProps('process_name')}
          error={Boolean((touched.process_name || triedToClickPast) && errors.process_name)}
          // helperText={touched.name && errors.name}
          className={classes.margin}
        />
        <TextField
          fullWidth
          color='secondary'
          label="Level 2 - Process Name"
          {...getFieldProps('process_L2_process_name')}
          error={Boolean(touched.process_L2_process_name && errors.process_L2_process_name)}
          helperText={'Level 2 process name or taxonomy reference'}
          className={classes.margin}
        />
        <TextField
          select
          color='secondary'
          fullWidth
          variant="outlined"
          label="Pipeline"
          {...getFieldProps('pipeline')}
          // This select field needs formik.handleChange for formik to detect its value even though the other ones don't seem to need it for some reason
          onChange={formik.handleChange}
          className={classes.margin}
          error={Boolean((touched.pipeline || triedToClickPast) && errors.pipeline)}
        >
          {['Idea', 'Pipeline', 'Development', 'Production'].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          color='secondary'
          multiline
          minRows={3}
          maxRows={5}
          label="Process Overview"
          {...getFieldProps('overview')}
          error={Boolean(touched.overview && errors.overview)}
          // helperText={touched.overview && errors.overview}
          className={classes.margin}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          color='secondary'
          maxRows={5}
          label="Process Description"
          {...getFieldProps('description')}
          error={Boolean(touched.description && errors.description)}
          // helperText={touched.description && errors.description}
          className={classes.margin}
        />

      </Form>
    </FormikProvider>
  );
}