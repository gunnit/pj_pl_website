import React from 'react';
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
} from '@material-ui/core';
import { MLabel } from '../../../../@material-extend';
// ----------------------------------------------------------------------


const useStyles = makeStyles({
  root: {}
});

// ----------------------------------------------------------------------

export default function RecentProcesses({ processes }) {
  const classes = useStyles();
  // business_unit: ""
  // client_satisfaction: "7.00"
  // cost_reduction: "7.00"
  // date_created: "2021-02-20T03:53:24.619547Z"
  // date_updated: "2021-02-20T03:53:24.619600Z"
  // description: ""
  // document_link: "https://crm1riskdb.s3.amazonaws.com/Picture1.png?AWSAccessKeyId=AKIATZTTHPARV5ZJ64EB&Signature=9hK8DnNpqWrteX8YVdD77%2B83uYE%3D&Expires=1613799424"
  // enable_audit_trail: "7.00"
  // enable_scalability: "7.00"
  // final_process_score: "0.00"
  // function: ""
  // id: 32
  // improve_accuracy: "7.00"
  // improve_consistency: "7.00"
  // improve_reliability: "7.00"
  // improve_security: "7.00"
  // increase_retention: "7.00"
  // initial_process_score: "0.00"
  // nature_of_process: ""
  // note: ""
  // num_of_manual_steps: ""
  // overview: ""
  // owner_email: ""
  // owner_name: ""
  // pipline: "Pipeline"
  // pipline_development: null
  // predicted_go_live_date: "2021-02-20"
  // process_L2_process_name: ""
  // process_L3_process_name: "L3 Process Name"
  // process_SME: ""
  // process_SME_email: ""
  // process_SME_tel: ""
  // process_critical: ""
  // process_documentation_available: ""
  // process_hours_saved: 0
  // process_name: "efeadsfasdf"
  // process_net_benefit: 0
  // process_objective: null
  // process_score: 0
  // process_type: ""
  // processassumptions: { completion_time: 0, cases_worked: 0, working_days: 261, working_hours_per_day: 7, average_fte_cost: 75000, … }
  // processobjectives: { cost_reduction_score: "0.00", improve_accuracy_score: "0.00", improve_reliability_score: "0.00", increase_retention_score: "0.00", reduce_process_duration_score: "0.00", … }
  // reduce_process_duration: "7.00"
  // saving_target_explanation: ""
  // sponsor: ""
  // start_development: null
  // status: "Pending"
  // team: ""
  // test_env_available: ""
  // user_rel: "None-2021-02-20 02:39:56.81
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
              </TableRow>
            </TableHead>
            <TableBody>
              {processes.map(({
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
                  <TableCell align="right">{(business_unit && businessFunction) ? `${business_unit} - ${businessFunction}` : !!business_unit ? `${business_unit}` : !!businessFunction ? businessFunction : ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>
    </Card>
  );
}
