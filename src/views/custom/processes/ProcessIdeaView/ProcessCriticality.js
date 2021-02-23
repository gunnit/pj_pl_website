import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { merge } from 'lodash';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
} from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';

// ----------------------------------------------------------------------
const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
}));



function ProcessCriticality({ data }) {
    const classes = useStyles()
    const chartOptions = merge(ApexChartsOption(), {
        plotOptions: { bar: { columnWidth: '14%', endingShape: 'rounded' } },
        stroke: { show: false },
        xaxis: {
            categories: [
                'Extremely',
                'Very',
                'Moderately',
                'Slightly',
                'Not at all',
                'Not answered',
            ]
        },
        tooltip: {

        }
    });
    return (
        <Card className={classes.root}>
            <CardHeader title="Process Criticality" />
            <CardContent>
                <ReactApexChart
                    type="bar"
                    height={320}
                    series={[{ name: 'Number of Processes', data }]}
                    options={chartOptions}
                />
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
