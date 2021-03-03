import 'firebase/auth';
import firebase from 'firebase/app';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import Check from '@material-ui/icons/Check';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Step,
  Stepper,
  StepLabel,
  StepConnector,
  Card,
  Box,
  Dialog,
  DialogTitle,
  Button
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



// const ColorlibConnector = withStyles(theme => ({
//   alternativeLabel: {
//     top: 22
//   },
//   active: {
//     '& $line': {
//       backgroundImage:
//         `linear-gradient( 95deg,${theme.palette.error.light} 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)`
//     }
//   },
//   completed: {
//     '& $line': {
//       backgroundImage:
//         `linear-gradient( 95deg,rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)`
//     }
//   },
//   line: {
//     height: 3,
//     border: 0,
//     backgroundColor: '#eaeaf0',
//     borderRadius: 1
//   }
// }))(StepConnector);

// const useColorlibStepIconStyles = makeStyles({
//   root: {
//     zIndex: 1,
//     width: 50,
//     height: 50,
//     color: '#fff',
//     display: 'flex',
//     borderRadius: '50%',
//     alignItems: 'center',
//     backgroundColor: '#ccc',
//     justifyContent: 'center'
//   },
//   active: {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
//   },
//   completed: {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(91, 229, 132) 0%,rgb(0, 171, 85) 50%,rgb(0, 123, 85) 100%)'
//   }
// });



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  button: { marginRight: theme.spacing(1) },
  instructions: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
  stepLabel: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
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

export default function CustomizedStepper({
  setProcessDetails,
  stage,
  pipeline,
  process_name,
  setStage,
  className,
  ...other
}) {

  const theme = useTheme()

  let backgroundColor;
  if (stage === 'Idea') {
    backgroundColor = theme.palette.info.light

  }
  if (stage === 'Pipeline') {
    backgroundColor = theme.palette.error.light
  }

  if (stage === 'Development') {
    backgroundColor = theme.palette.warning.light

  }

  if (stage === 'Production') {
    backgroundColor = theme.palette.primary.light
  }

  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22
    },
    active: {
      '& $line': {
        backgroundColor
      }
    },
    completed: {
      '& $line': {
        backgroundColor
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
      backgroundColor,
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    },
    completed: {
      backgroundColor,
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

  const classes = useStyles();

  const steps = getSteps();
  const [openDialog, setOpenDialog] = useState('')

  const { currentProcessId, setProcessCounts } = useContext(Context)

  const moveStage = async (currentStage, futureStage) => {
    setStage(futureStage)
    setOpenDialog(false)
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);

      let storedProcessId;

      if (!currentProcessId) {
        storedProcessId = localStorage.getItem('currentProcessId')
      }

      // currentProcessId will be the ID of the process that was clicked on
      const res = await fetch(`${apiBaseUrl}/change_status/${currentProcessId || storedProcessId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          pipeline_status: futureStage
        }),
        headers: {
          "Content-Type": 'application/json',
          "Authorization": token
        }
      })

      // Change navbar numbers
      setProcessCounts(previous => ({
        ...previous,
        [currentStage]: previous[currentStage] - 1,
        [futureStage]: previous[futureStage] + 1
      }))


      // // Redirect to process detail page
      // history.push(PATH_APP.processes.details)


      const { pipline_development, predicted_go_live_date, start_development } = await res.json()

      setProcessDetails(previous => ({ ...previous, process: { ...previous.process, pipline: futureStage, pipline_development, predicted_go_live_date, start_development } }))

    } catch (e) {
      console.error(e)
    }
  }


  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <div>
          <Stepper
            alternativeLabel
            activeStep={getActiveStep(stage)}
            connector={<ColorlibConnector />}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel className={label !== stage ? classes.stepLabel : ''} onClick={() => {
                  if (label === stage) {
                    return
                  }
                  setOpenDialog(label)
                }} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog('')}>
        {openDialog &&
          <>
            <DialogTitle id="simple-dialog-title">Move {process_name} into {openDialog} phase?</DialogTitle>
            <Button onClick={() => moveStage(pipeline, openDialog)}>Yes</Button>
            <Button color='error' onClick={() => setOpenDialog(false)}>Cancel</Button>
          </>}
      </Dialog>


    </Card>
  );
}
