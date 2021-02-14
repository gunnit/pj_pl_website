import React from 'react';
import LineChart from './LineChart';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent
} from '@material-ui/core';


function Breakeven() {

    return (
        <Card>
            <CardHeader title="Quarterly Break-Even Analysis" />
            <CardContent>
                <LineChart />
            </CardContent>
        </Card>
    );
}

export default Breakeven;
