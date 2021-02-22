import clsx from 'clsx';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardHeader, Box } from '@material-ui/core';
import Context from 'context/Context';
import { useHistory } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {}
}));

// ----------------------------------------------------------------------

BubbleChart.propTypes = {
  className: PropTypes.string
};

function BubbleChart({ processes, className, ...other }) {
  const classes = useStyles();
  const history = useHistory()

  const { setCurrentProcessId } = useContext(Context)


  const chartData = processes.map((process, i) => {
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
          // config.seriesIndex is the same as the index of the process in the original array, giving the process that was clicked on
          setCurrentProcessId(processes[config.seriesIndex].id)
          history.push(PATH_APP.processes.details)
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

export default BubbleChart;
