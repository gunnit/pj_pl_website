import { merge } from 'lodash';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------


const useStyles = makeStyles(theme => ({
  axisLabels: {
    fill: theme.palette.text.primary,
    fontSize: 14,
  }
}));

export default function IdeasPerFunction({ data, production }) {
  const theme = useTheme()
  const classes = useStyles()


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
          colors: [theme.palette.text.primary],
        },
        formatter: function (value, timestamp, opts) {
          return parseInt(value)
        }
      },
      tickAmount: 1,
    },
    yaxis: {
      labels: {
        style: {
          // colors: [theme.palette.text.primary],
          cssClass: classes.axisLabels
        },

      }
    },
    tooltip: {
      x: {
        show: true
      },
      y: {
        show: false
      },
    }
  });

  return (
    <Card>
      <CardHeader title={production ? "Processes in Production by Function" : "Number of Submitted Ideas per Function"} />
      <CardContent>
        <ReactApexChart
          type="bar"
          height={420}
          series={[{ data }]}
          options={chartOptions}
        />
      </CardContent>
    </Card>
  );
}