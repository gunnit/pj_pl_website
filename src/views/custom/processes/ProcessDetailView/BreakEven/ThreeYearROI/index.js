import React from 'react';
import LineChart from './LineChart';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent
} from '@material-ui/core';


function ThreeYearROI() {

    return (
        <Card>
            <CardHeader title="3-year ROI" />
            <CardContent>
                <LineChart />
            </CardContent>
        </Card>
    );
}

export default ThreeYearROI;
