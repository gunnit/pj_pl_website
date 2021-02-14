import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

NewProcessFormDetails.propTypes = {
  formik: PropTypes.object.isRequired,
  onOpenPreview: PropTypes.func,
  className: PropTypes.string
};

function NewProcessFormDetails({ formik, onOpenPreview, className, ...other }) {
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

  const [pipelineSelect, setPipelineSelect] = useState('');

  const handleChangePipeline = e => {
    setPipelineSelect(e.target.value);
  };

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
          label="Process Name"
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          // helperText={touched.name && errors.name}
          className={classes.margin}
        />
        <TextField
          fullWidth
          label="Level 2 - Process Name"
          {...getFieldProps('name2')}
          error={Boolean(touched.name2 && errors.name2)}
          helperText={'Level 2 process name or taxonomy reference'}
          className={classes.margin}
        />
        <TextField
          select
          fullWidth
          variant="outlined"
          label="Pipeline"
          value={pipelineSelect}
          onChange={handleChangePipeline}
          // helperText="Please select your currency"
          className={classes.margin}
        >
          {['Idea', 'Pipeline', 'Development', 'Production'].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

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

        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="button"
            color="inherit"
            variant="outlined"
            onClick={onOpenPreview}
            sx={{ mr: 1.5 }}
          >
            Preview
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Post
          </LoadingButton>
        </Box> */}
      </Form>
    </FormikProvider>
  );
}

export default NewProcessFormDetails;
