import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Check from '@material-ui/icons/Check';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Step,
  Stepper,
  StepLabel,
  StepConnector,
  Card,
  Box,
} from '@material-ui/core';
import ideaIcon from '@iconify-icons/el/idea';
import raceflagIcon from '@iconify-icons/whh/raceflag';
import rocket11 from '@iconify-icons/maki/rocket-11';
import gearsIcon from '@iconify-icons/whh/gears';
import { Icon } from '@iconify/react';


// ----------------------------------------------------------------------

const useQontoStepIconStyles = makeStyles({
  root: {
    height: 22,
    display: 'flex',
    color: '#eaeaf0',
    alignItems: 'center'
  },
  active: { color: '#784af4' },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  completed: { color: '#784af4', zIndex: 1, fontSize: 18 }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
          <div className={classes.circle} />
        )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)'
    }
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)'
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    width: 50,
    height: 50,
    color: '#fff',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    backgroundColor: '#ccc',
    justifyContent: 'center'
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)'
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Icon icon={ideaIcon} />,
    2: <Icon icon={rocket11} />,
    3: <Icon icon={gearsIcon} />,
    4: <Icon icon={raceflagIcon} />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  button: { marginRight: theme.spacing(1) },
  instructions: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }
}));

function getSteps() {
  return ['Idea', 'Pipeline', 'Development', 'Production'];
}

function getActiveStep(pipeline) {
  switch (pipeline) {
    case 'Idea':
      return 0;
    case 'Pipeline':
      return 1;
    case 'Development':
      return 2;
    default:
      return 3;
  }
}

export default function CustomizedStepper({ pipeline, className, ...other }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(getActiveStep(pipeline));
  const steps = getSteps();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <div>

          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </Box>
    </Card>
  );
}
