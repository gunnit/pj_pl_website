import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import {
    Card,
    CardHeader,
    CardContent
} from '@material-ui/core';




export default function BreakEvenChart({
    total_process_quarter_ideas_with_automation,
    total_process_quarter_ideas_with_no_automation,
}) {


    const chartData = [
        { name: 'Cost Without Automation', data: total_process_quarter_ideas_with_no_automation },
        { name: 'Cost With Automation', data: total_process_quarter_ideas_with_automation },
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
