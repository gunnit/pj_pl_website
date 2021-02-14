import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
} from '@material-ui/core';
import { MLabel } from '~/@material-extend';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        // height: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function AutomationScoreDescriptionCard() {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title={
                <>
                    <Typography variant='subtitle2'>Automation Score</Typography>
                    <Typography variant='h3'>5.2</Typography>
                    <MLabel color='warning'>Medium</MLabel>
                </>
            } />

            <CardContent className={classes.content}>
                <Typography variant='body1'>
                    It looks like your process automation complexity is "Medium" and we estimate medium to high FTE benefits by automating this process. Moderate complexity project with clear requirements but some problem solving solution ambiguity. This is a medium impact medium effort process considered as a "Long Term Improvement" and therefore we recommend you to"Check for other processes before automating this process" Project automation time should be no longer than 4-6 weeks with a a mixed team of 2-4 automation specialists.
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AutomationScoreDescriptionCard;