import React from 'react';
import RadarChart from './RadarChart';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent
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

function RadarChartCard() {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Radar" />
            <CardContent className={classes.content}>
                <RadarChart />
            </CardContent>
        </Card>
    );
}

export default RadarChartCard;