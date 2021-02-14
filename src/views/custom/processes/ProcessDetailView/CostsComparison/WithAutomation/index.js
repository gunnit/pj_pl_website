import React from 'react';
import ColumnStackedChart from './ColumnStackedChart';
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

function WithAutomation() {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Costs With Automation" />
            <CardContent>
                <ColumnStackedChart />
            </CardContent>
        </Card>

    );
}

export default WithAutomation;
