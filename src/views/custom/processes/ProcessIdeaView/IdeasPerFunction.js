import { merge } from 'lodash';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }
];

export default function IdeasPerFunction() {
  const theme = useTheme();
  const chartOptions = merge(ApexChartsOption(), {
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%', endingShape: 'rounded' }
    },
    xaxis: {
      categories: [
        'Finance',
        'Inventory',
        'Production',
        'Supply Chain',
        'Procurement',
        'Accounting',
        'HR',
        'Legal',
        'Marketing',
        'Sales',
        'Customer Services',
        'Development',
        'IT',
        'Other',
        'Not answered',
      ],
    }
  });

  return (
    <Card>
      <CardHeader title="Number of Submitter ideas per Function" />
      <CardContent>
        <ReactApexChart
          type="bar"
          height={320}
          series={CHART_DATA}
          options={chartOptions}
        />
      </CardContent>
    </Card>

  );
}
