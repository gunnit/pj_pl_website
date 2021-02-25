import { merge } from 'lodash';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import { Card, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const CHART_DATA = [
    { name: 'Net Profit', data: [196, 100, 96] }
];

export default function CostsComparisonColumns({ assumptions }) {

    const chartData = [
        {
            name: 'Costs',
            data: [
                assumptions.current_process_cost_calc,
                assumptions.tot_future_process_cost,
                assumptions.current_process_cost_calc - assumptions.tot_future_process_cost
            ]
        },
    ]

    const chartOptions = merge(ApexChartsOption(), {
        plotOptions: { bar: { columnWidth: '14%', endingShape: 'rounded' } },
        stroke: { show: false },
        xaxis: {
            categories: [
                'Without Automation',
                'With Automation',
                'Difference'
            ]
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return '$ ' + parseFloat(val).toFixed(2);
                }
            }
        }
    });

    return (
        <Card>
            <CardHeader title="Cost Comparison" />
            <CardContent>
                <ReactApexChart
                    type="bar"
                    height={320}
                    series={chartData}
                    options={chartOptions}
                />
            </CardContent>
        </Card>
    );
};