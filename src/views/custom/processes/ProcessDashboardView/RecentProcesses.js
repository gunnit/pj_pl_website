import React, { useContext, useState } from 'react';
import Scrollbars from 'components/Scrollbars';
import { fNumber } from 'utils/formatNumber';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { MLabel } from '../../../../@material-extend';
import { Icon } from '@iconify/react';
import Context from 'context/Context';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { PATH_APP } from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import ideaIcon from '@iconify-icons/el/idea';
import rocket11 from '@iconify-icons/maki/rocket-11';
import gearsIcon from '@iconify-icons/whh/gears';
import raceflagIcon from '@iconify-icons/whh/raceflag';

// ----------------------------------------------------------------------


const useStyles = makeStyles({
  root: {},
  routerLink: {
    textDecoration: 'none'
  },
  icon: {
    height: 24,
    width: 24,
    margin: 10,
    marginLeft: 0
  }
});

// ----------------------------------------------------------------------

export default function RecentProcesses({ processes }) {
  const classes = useStyles();
  const theme = useTheme()
  const { setCurrentProcessId } = useContext(Context)

  const [isOpen, setOpen] = useState(null);

  const handleOpen = (event, id) => {
    setOpen(event.currentTarget);

    // Context to get the process details if the user clicks to view the process details
    setCurrentProcessId(id)
    localStorage.setItem('currentProcessId', id)

  };

  const handleClose = (option) => {
    setOpen(null);
  };

  function getIcon(pipeline) {
    if (pipeline === 'Idea') {
      return (
        <Icon icon={ideaIcon} className={classes.icon} color={theme.palette.info.light} />
      )
    }

    if (pipeline === 'Pipeline') {
      return (
        <Icon icon={rocket11} className={classes.icon} color={theme.palette.error.light} />
      )
    }

    if (pipeline === 'Development') {
      return (
        <Icon icon={gearsIcon} className={classes.icon} color={theme.palette.warning.light} />
      )
    }

    if (pipeline === 'Production') {
      return (
        <Icon icon={raceflagIcon} className={classes.icon} color={theme.palette.primary.light} />
      )
    }
  }


  return (
    <Card>
      <CardHeader title="Recently Created Processes" />
      <Scrollbars>
        <TableContainer
          component={Box}
          sx={{ minWidth: 800, mt: 3 }}
          className={classes.root}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Process Name</TableCell>
                <TableCell align="right">Objective Alignment</TableCell>
                <TableCell align="right">Automation Score</TableCell>
                <TableCell align="right">Savings</TableCell>
                <TableCell align="right">Owner</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {processes.map(({
                id,
                pipline: pipeline,
                process_name,
                processobjectives: {
                  total_alignment_score_coverted
                },
                process_score,
                processassumptions: {
                  total_net_benefit
                },
                business_unit,
                function: businessFunction,
              }, i) => (
                <TableRow key={`${process_name}${i}`} className={classes.hideLastBorder}>
                  <Tooltip title={pipeline} placement='left'><TableCell align="right">{getIcon(pipeline)}</TableCell></Tooltip>
                  <TableCell component="th" scope="row">
                    <b>{process_name}</b>
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color={total_alignment_score_coverted > 0 ? "info" : "default"}>
                      {total_alignment_score_coverted}%
                    </MLabel>
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color={process_score > 0 ? "info" : "default"}>
                      {process_score !== 0 ? process_score : 'Not completed'}
                    </MLabel>
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color={total_net_benefit > 0 ? "primary" : "error"}>
                      {total_net_benefit >= 0 ? `$${fNumber(total_net_benefit)}` : `-$${fNumber(-total_net_benefit)}`}
                    </MLabel>
                  </TableCell>
                  {/* Display business unit and/or business function depending on if they're there */}
                  <TableCell align="right">{(business_unit && businessFunction) ? `${business_unit} - ${businessFunction}` : !!business_unit ? `${business_unit}` : !!businessFunction ? businessFunction : 'Not completed'}</TableCell>
                  <TableCell align="right">
                    <IconButton className={classes.margin} onClick={(event) => handleOpen(event, id)}>
                      <Icon
                        icon={moreVerticalFill}
                        width={20}
                        height={20}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>

      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={isOpen}
        onClose={handleClose}
        open={Boolean(isOpen)}
      >
        {[{ text: 'View details', path: PATH_APP.processes.details },
        { text: 'Update', path: PATH_APP.processes.update },
          // { text: 'Delete', path: '' }
        ].map(option => (
          <RouterLink key={option.text} to={option.path} className={classes.routerLink}>
            <MenuItem key={option.text} onClick={handleClose}>
              {option.text}
            </MenuItem>
          </RouterLink>
        ))}
      </Menu>

    </Card>
  );
}
