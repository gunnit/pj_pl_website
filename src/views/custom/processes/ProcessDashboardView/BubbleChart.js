import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardHeader, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {}
}));

// ----------------------------------------------------------------------


export default function BubbleChart({ data, className, ...other }) {
  const classes = useStyles();

  // process_score
  // processassumptions.process_net_benefit
  // processobjectives.total_alignment_score_graph


  const chartData = data.map((process, i) => {
    return {
      name: process.process_name,
      data: [[process.process_score,
      process.processassumptions.total_net_benefit,
      process.processobjectives.total_alignment_score_coverted]]
    }
  })

  const theme = useTheme()

  const chartOptions = {
    colors: [
      theme.palette.primary.main,
      theme.palette.primary.light,
      theme.palette.primary.dark,
    ],


    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: true },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily,
      events: {
        dataPointSelection: (event, chartContext, config) => {
          // Series index should correspond to the process
          console.log(config)
        }
      }
    },

    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88
        }
      }
    },

    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100]
      }
    },

    dataLabels: { enabled: false },

    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider
    },

    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true
      },
      tickAmount: 5,
    },

    yaxis: {
      decimalsInFloat: 2
    },

    tooltip: {
      x: {
        show: false
      }
    },

    legend: {
      show: false,
    },
  }

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Process Heat Map" subheader="Overview of all of your processes" />
      <Box sx={{ mt: 3, mx: 3 }}>
        <ReactApexChart
          type="bubble"
          height={364}
          series={chartData}
          options={chartOptions}
        />
      </Box>
    </Card>
  );
}