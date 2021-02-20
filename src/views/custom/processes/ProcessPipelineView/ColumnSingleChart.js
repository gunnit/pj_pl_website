import { merge } from 'lodash';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';

// ----------------------------------------------------------------------



const ColumnSingleChart = ({ xAxisData, yAxisData }) => {


  const chartData = [
    { name: 'Process', data: yAxisData }
  ];


  const chartOptions = merge(ApexChartsOption(), {
    plotOptions: { bar: { columnWidth: '14%', endingShape: 'rounded' } },
    stroke: { show: false },
    xaxis: {
      categories: xAxisData
    },
    tooltip: {

    }
  });

  return (
    <ReactApexChart
      type="bar"
      height={320}
      series={chartData}
      options={chartOptions}
    />
  );
};

export default ColumnSingleChart;
