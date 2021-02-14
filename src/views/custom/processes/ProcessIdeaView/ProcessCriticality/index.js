import React from 'react';
import ColumnSingleChart from './ColumnSingleChart';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        height: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function ProcessCriticality() {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Process Criticality" />
            <CardContent>
                <ColumnSingleChart />
            </CardContent>
            <CardContent>
                <Typography>
                    If the RPA robot is down and operations need to be performed manually, how severe will the impact on business be?
                    <br /><br />
                    Extremely: the process is critical to business and is one of the core processes.
                    <br /><br />
                    Not at all: the process does not impact business and operations
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProcessCriticality;