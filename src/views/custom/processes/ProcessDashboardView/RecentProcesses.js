import React, { useContext, useState } from 'react';
import Scrollbars from 'components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import { MLabel } from '../../../../@material-extend';
import { Icon } from '@iconify/react';
import Context from 'context/Context';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { PATH_APP } from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------


const useStyles = makeStyles({
  root: {},
  routerLink: {
    textDecoration: 'none'
  }
});

// ----------------------------------------------------------------------

export default function RecentProcesses({ processes }) {
  const classes = useStyles();

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
                  <TableCell component="th" scope="row">
                    {process_name}
                  </TableCell>
                  <TableCell align="right">
                    {total_alignment_score_coverted}%
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color="info">
                      {process_score !== 0 ? process_score : 'Not completed'}
                    </MLabel>
                  </TableCell>
                  <TableCell align="right">
                    <MLabel variant="filled" color={total_net_benefit > 0 ? "primary" : "error"}>
                      {total_net_benefit}
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
        { text: 'Delete', path: '' }].map(option => (
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
