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



export default function ThreeYearROI({ data: {
    year_1_saving_cumulative,
    year_2_saving_cumulative,
    year_3_saving_cumulative,
} }) {


    const chartData = [
        { name: 'Cumulative Savings', data: [year_1_saving_cumulative, year_2_saving_cumulative, year_3_saving_cumulative] }
    ];

    const chartOptions = merge(ApexChartsOption(), {
        xaxis: {
            categories: [
                'Year One',
                'Year Two',
                'Year Three',
            ]
        },
        tooltip: { x: { show: false }, marker: { show: false } }
    });

    return (
        <Card>
            <CardHeader title="3-year ROI" />
            <CardContent>
                <ReactApexChart
                    type="line"
                    height={320}
                    series={chartData}
                    options={chartOptions}
                />
            </CardContent>
        </Card >
    );
}
