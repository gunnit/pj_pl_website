import './BubbleChart.css';
import clsx from 'clsx';
import React, { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardHeader, Box, Typography } from '@material-ui/core';
import Context from 'context/Context';
import { useHistory } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  xAxisLabel: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    top: -20
  },
  yAxisLabel: {
    position: 'absolute',
    transform: 'rotate(-90deg)',
    top: '50%',
    left: 0
  }
}));

// ----------------------------------------------------------------------


export default function BubbleChart({ data, className, ...other }) {
  const classes = useStyles();
  const history = useHistory()

  const { setCurrentProcessId } = useContext(Context)


  const chartData = data.map((process, i) => {
    return {
      name: process.process_name,
      data: [[parseFloat(process.average_automation_score),
      process.processassumptions.total_net_benefit,
      process.processobjectives.total_alignment_score_coverted + 5]]
    }
  })

  const theme = useTheme()

  const chartOptions = {
    colors: [
      theme.palette.primary.main,
      // theme.palette.primary.light,
      // theme.palette.primary.dark,
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
          setCurrentProcessId(data[config.seriesIndex].id)
          localStorage.setItem('currentProcessId', data[config.seriesIndex].id)
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
        show: true,
      },
      tickAmount: 1,
      tooltip: {
        enabled: false
      }
    },

    yaxis: {
      decimalsInFloat: 2,
      labels: {
        show: true
      }
    },

    tooltip: {
      x: {
        show: true,
        formatter: function (w) {
          if (!w && w !== 0) {
            return 'Automation Potential: Not completed'
          }
          return `Automation Potential: ${w}`
        }
      },
      y: {
        show: true,
        formatter: function (w) {
          return w < 0 ? `-$${-w} savings` : `$${w} savings`
        }
      },
      z: {
        title: 'Alignment Score:',
        formatter: function (w) {
          return w - 5
        }
      },
      marker: {
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
      <Typography variant='subtitle2' color='textSecondary' className={classes.yAxisLabel}>Savings</Typography>
      <Box sx={{ mt: 3, ml: 5, mr: 3 }}>
        <ReactApexChart
          type="bubble"
          height={364}
          series={chartData}
          options={chartOptions}
        />
        <Typography variant='subtitle2' color='textSecondary' className={classes.xAxisLabel}>Automation Potential</Typography>
      </Box>
    </Card>
  );
}