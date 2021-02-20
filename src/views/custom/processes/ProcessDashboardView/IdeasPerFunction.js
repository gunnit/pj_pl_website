import { merge } from 'lodash';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

// ----------------------------------------------------------------------



export default function IdeasPerFunction({ data }) {
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
      labels: {
        style: {
          colors: ['#F9FAFB']
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#F9FAFB']
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Number of Submitted Ideas per Function" />
      <CardContent>
        <ReactApexChart
          type="bar"
          height={320}
          series={[{ data }]}
          options={chartOptions}
        />
      </CardContent>
    </Card>

  );
}