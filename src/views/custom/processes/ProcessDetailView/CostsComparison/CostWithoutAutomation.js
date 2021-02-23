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



export default function CostWithoutAutomation({ data: {
    current_employee_cost,
    infrastructure_costs,
    support_cost,
    other_cost,
}
}) {


    const chartData = [
        { name: 'Employee Costs', data: [current_employee_cost] },
        { name: 'Infrastructure', data: [infrastructure_costs] },
        { name: 'Maintenance', data: [support_cost] },
        { name: 'Other Costs', data: [other_cost] }
    ];





    const chartOptions = merge(ApexChartsOption(), {
        chart: {
            stacked: true,
            zoom: { enabled: false }
        },
        legend: {
            itemMargin: { vertical: 8 },
            position: 'right',
            offsetY: 20
        },
        plotOptions: {
            bar: { columnWidth: '44%' }
        },
        stroke: { show: false },
        xaxis: {
            // type: 'datetime',
            categories: [
                'Current Process'
            ]
        }
    });

    return (
        <Card>
            <CardHeader title="Costs With Automation" />
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
}
