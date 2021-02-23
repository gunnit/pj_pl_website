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
    licence_cost,
    tot_infrastructure_cost,
    production_server_maintenance_cost,
    development_cost,
} }) {



    const chartData = [
        { name: 'License', data: [licence_cost] },
        { name: 'Infrastructure', data: [tot_infrastructure_cost] },
        { name: 'Maintenance', data: [production_server_maintenance_cost] },
        { name: 'Development', data: [development_cost] }
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
            <CardHeader title="Costs Without Automation" />
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
