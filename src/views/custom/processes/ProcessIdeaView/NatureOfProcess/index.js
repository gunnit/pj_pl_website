import React from 'react';
import DonutChart from './DonutChart';
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

function NatureOfProcess() {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Nature of Process" />
            <CardContent className={classes.content}>
                <DonutChart />
            </CardContent>
            <CardContent>
                <Typography>
                    Are the majority of the steps in the process repetitive in nature or are there many business rules that result in different paths for the execution of the process.
                    <br /><br />
                    Entirely repetitive are processes with no deviation from the standard path of execution while not repetitive adresses proceeses that are always done differently.
                </Typography>
            </CardContent>
        </Card>
    );
}

export default NatureOfProcess;
