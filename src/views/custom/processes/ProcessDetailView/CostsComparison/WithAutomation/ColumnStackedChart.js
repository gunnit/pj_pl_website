import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Product A', data: [44,] },
  { name: 'Product B', data: [13,] },
  { name: 'Product C', data: [11,] },
  { name: 'Product D', data: [21,] }
];

function ColumnStackedChart() {
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
    <ReactApexChart
      type="bar"
      height={320}
      series={CHART_DATA}
      options={chartOptions}
    />
  );
}

export default ColumnStackedChart;
