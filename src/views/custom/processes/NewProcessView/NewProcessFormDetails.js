import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  MenuItem,
  Grid,
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

NewProcessFormDetails.propTypes = {
  formik: PropTypes.object.isRequired,
  className: PropTypes.string
};

function NewProcessFormDetails({ formik, className, triedToClickPast, ...other }) {
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
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <TextField
              fullWidth
              label="Process Name"
              {...getFieldProps('process_name')}
              error={Boolean((touched.process_name || triedToClickPast) && errors.process_name)}
              // helperText={touched.process_name && errors.process_name}
              className={classes.margin}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              fullWidth
              label="Level 2 - Process Name"
              {...getFieldProps('process_L2_process_name')}
              error={Boolean(touched.process_L2_process_name && errors.process_L2_process_name)}
              helperText={'Level 2 process name or taxonomy reference'}
              className={classes.margin}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              fullWidth
              label="Level 3 - Process Name"
              {...getFieldProps('process_L3_process_name')}
              error={Boolean(touched.process_L3_process_name && errors.process_L3_process_name)}
              helperText={'Level 3 process name or taxonomy reference'}
              className={classes.margin}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Pipeline"
              {...getFieldProps('pipeline')}
              // This select field needs formik.handleChange for formik to detect its value even though the other ones don't seem to need it for some reason
              onChange={formik.handleChange}
              // helperText="Please select your currency"
              className={classes.margin}
              error={Boolean((touched.pipeline || triedToClickPast) && errors.pipeline)}
            >
              {['Idea', 'Pipeline', 'Development', 'Production'].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item lg={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Process Overview"
              {...getFieldProps('overview')}
              error={Boolean(touched.overview && errors.overview)}
              // helperText={touched.overview && errors.overview}
              className={classes.margin}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Process Description"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              // helperText={touched.description && errors.description}
              className={classes.margin}
            />
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

export default NewProcessFormDetails;
