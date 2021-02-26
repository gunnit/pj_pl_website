import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
} from '@material-ui/core';
import { MLabel } from '@material-extend';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        // height: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function AutomationScoreDescriptionCard({ processDetails, totalAverageOfSubgroups }) {
    const classes = useStyles();


    if (totalAverageOfSubgroups <= 3) {
        return (
            <Card>
                <CardHeader title={
                    <>
                        <Typography variant='subtitle2'>Automation Score</Typography>
                        <Typography variant='h3'>{totalAverageOfSubgroups}</Typography>
                        <MLabel color='error'>Low</MLabel>
                    </>
                } />

                <CardContent className={classes.content}>
                    <Typography variant='body1'>
                        Highly complex project with unclear problem/solution and undefined requirements.
                        Process is required to be automated with agressive schedule of 2-4 months with a mixed team as large as 10 automation specialists.
                        The automation project is required as part of a large scale organizational change. The process has un unclear problem solution and complex team structure.
                        This is a low impact high effort and high complexity project that should be automated only with special care.
                </Typography>
                    <Button variant='contained' color='inherit' to={PATH_APP.processes.automationAssessment} component={RouterLink}>Update Assessment</Button>
                </CardContent>

            </Card>
        );
    } else if (totalAverageOfSubgroups <= 6) {
        return (
            <Card>
                <CardHeader title={
                    <>
                        <Typography variant='subtitle2'>Automation Score</Typography>
                        <Typography variant='h3'>{totalAverageOfSubgroups.toFixed(2)}</Typography>
                        <MLabel color='warning'>Medium</MLabel>
                    </>
                } />

                <CardContent className={classes.content}>
                    <Typography variant='body1'>
                        It looks like your process automation complexity is <b>"Medium"</b> and we estimate medium to high FTE benefits by automating this process.
               Moderate complexity project with clear requirments but some problem solving solution ambiguity.
               This is a medium impact medium effort process considered as a "Long Term Improvement" and therefore we recommend you to"Check for other processes before automating this process"
               Project automation time should be no longer than 4-6 weeks with a a mixed team of 2-4 automation specialists.
                </Typography>
                    <Button variant='contained' color='inherit' to={PATH_APP.processes.automationAssessment} component={RouterLink}>Update Assessment</Button>
                </CardContent>

            </Card>
        );
    } else {
        return (
            <Card>
                <CardHeader title={
                    <>
                        <Typography variant='subtitle2'>Automation Score</Typography>
                        <Typography variant='h3'>{totalAverageOfSubgroups}</Typography>
                        <MLabel color='success'>High</MLabel>
                    </>
                } />

                <CardContent className={classes.content}>
                    <Typography variant='body1'>
                        It looks like your process automation complexity is <b>"Low"</b> and we estimate high FTE benefits by automating this process.
               This processes is considered a "Low Hanging Fruit" and therefore we recommend you to <b>"Go ahead for Automation if you don't have any other critical processs for automation"</b>
               This is a high impact and low effort proceess which is an ideal candidate for automation.
               Project automation time should be no longer than 3-4 weeks with a mixed team of 1-3 automation specialists.
                </Typography>
                    <Button variant='contained' color='inherit' to={PATH_APP.processes.automationAssessment} component={RouterLink}>Update Assessment</Button>
                </CardContent>

            </Card>
        );
    }


}

export default AutomationScoreDescriptionCard;