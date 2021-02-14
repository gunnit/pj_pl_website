import { merge } from 'lodash';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from '~/components/Charts/Apexcharts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Net Profit', data: [196, 100, 96] }
];

const ColumnSingleChart = () => {
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
          return '$ ' + val + ' thousands';
        }
      }
    }
  });

  return (
    <ReactApexChart
      type="bar"
      height={320}
      series={CHART_DATA}
      options={chartOptions}
    />
  );
};

export default ColumnSingleChart;
