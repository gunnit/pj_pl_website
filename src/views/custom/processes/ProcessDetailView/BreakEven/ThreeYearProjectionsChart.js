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



export default function ThreeYearProjectionsChart({
  data: {
    y1_savings_total,
    y1_with_auto_total,
    y1_with_no_auto_total,
    y2_savings_total,
    y2_with_auto_total,
    y2_with_no_auto_total,
    y3_savings_total,
    y3_with_auto_total,
    y3_with_no_auto_total,
  }
}) {


  const chartData = [
    {
      name: 'Cost Without Automation',
      type: 'column',
      data: [y1_with_no_auto_total, y2_with_no_auto_total, y3_with_no_auto_total]
    },
    {
      name: 'Cost With Automation',
      type: 'column',
      data: [y1_with_auto_total, y2_with_auto_total, y3_with_auto_total]
    },
    {
      name: 'Savings',
      type: 'line',
      data: [parseFloat(y1_savings_total), parseFloat(y2_savings_total), parseFloat(y3_savings_total)]
    }
  ];


  const chartOptions = merge(ApexChartsOption(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '18%', endingShape: 'rounded' } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      'Year One',
      'Year Two',
      'Year Three',
    ],
    // xaxis: { type: 'datetime' },
    yaxis: { title: { text: 'Points' }, min: 0 },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y >= 0 ? '$' + y.toFixed(2) : '-$' + -y.toFixed(2);
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="3-year Projection" />
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