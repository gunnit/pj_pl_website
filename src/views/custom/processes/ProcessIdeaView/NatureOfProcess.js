import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
} from '@material-ui/core';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        height: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));




function NatureOfProcess({ data }) {
    const classes = useStyles();

    const chartOptions = merge(ApexChartsOption(), {
        labels: ['Entirely repetitive', 'Semi-repetitive', 'Not repetitive', 'Not answered'],
        stroke: { show: false },
        legend: { horizontalAlign: 'center' },
        plotOptions: { pie: { donut: { size: '90%' } } }
    });


    return (
        <Card>
            <CardHeader title="Nature of Process" />
            <CardContent className={classes.content}>
                <ReactApexChart
                    width={400}
                    type="donut"
                    series={data}
                    options={chartOptions}
                />
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
