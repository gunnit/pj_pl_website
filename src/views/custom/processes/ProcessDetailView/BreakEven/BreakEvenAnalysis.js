import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import {
    Card,
    CardHeader,
    CardContent
} from '@material-ui/core';
// ----------------------------------------------------------------------


export default function BreakEvenAnalysis({ data: {
    q1_with_auto_y1,
    q1_with_auto_y2,
    q1_with_no_auto_y1,
    q1_with_no_auto_y2,
    q2_with_auto_y1,
    q2_with_auto_y2,
    q2_with_no_auto_y1,
    q2_with_no_auto_y2,
    q3_with_auto_y1,
    q3_with_auto_y2,
    q3_with_no_auto_y1,
    q3_with_no_auto_y2,
    q4_with_auto_y1,
    q4_with_auto_y2,
    q4_with_no_auto_y1,
    q4_with_no_auto_y2,
} }) {


    const chartData = [
        {
            name: 'Cost Without Automation',
            data: [
                q1_with_no_auto_y1,
                q2_with_no_auto_y1,
                q3_with_no_auto_y1,
                q4_with_no_auto_y1,
                q1_with_no_auto_y2,
                q2_with_no_auto_y2,
                q3_with_no_auto_y2,
                q4_with_no_auto_y2,
            ]
        },
        {
            name: 'Cost With Automation',
            data: [
                q1_with_auto_y1,
                q2_with_auto_y1,
                q3_with_auto_y1,
                q4_with_auto_y1,
                q1_with_auto_y2,
                q2_with_auto_y2,
                q3_with_auto_y2,
                q4_with_auto_y2,
            ]
        }
    ];




    const chartOptions = merge(ApexChartsOption(), {
        xaxis: {
            categories: [
                'Q1',
                'Q2',
                'Q3',
                'Q4',
                'Q1',
                'Q2',
                'Q3',
                'Q4',
            ]
        },
        tooltip: { x: { show: false }, marker: { show: false } }
    });

    return (
        <Card>
            <CardHeader title="Quarterly Break-Even Analysis" />
            <CardContent>
                <ReactApexChart
                    type="line"
                    height={320}
                    series={chartData}
                    options={chartOptions}
                />
            </CardContent>
        </Card>
    );
}