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

const CHART_DATA = [
  {
    name: 'Team A',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  },
  {
    name: 'Team B',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  {
    name: 'Team C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

function MixedChart() {
  const chartOptions = merge(ApexChartsOption(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '18%', endingShape: 'rounded' } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003'
    ],
    xaxis: { type: 'datetime' },
    yaxis: { title: { text: 'Points' }, min: 0 },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + ' points';
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
          series={CHART_DATA}
          options={chartOptions}
        />
      </CardContent>
    </Card>

  );
}

export default MixedChart;