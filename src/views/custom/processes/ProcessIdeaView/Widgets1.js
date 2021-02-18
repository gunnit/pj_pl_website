import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon, InlineIcon } from '@iconify/react';
import thumbsUp from '@iconify-icons/akar-icons/thumbs-up';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'utils/formatNumber';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';


// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      padding: theme.spacing(3),
      backgroundColor: theme.palette.primary.dark
    },
    icon: {
      width: 120,
      height: 120,
      opacity: 0.12,
      position: 'absolute',
      right: theme.spacing(-3),
      color: theme.palette.common.white
    }
  };
});

// ----------------------------------------------------------------------


function Widgets1({ className, total, amount, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const chartData = [(amount / total * 100).toFixed(0)];
  const chartOptions = merge(ApexChartsOption(), {
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize
          }
        }
      }
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <ReactApexChart
        width={86}
        height={86}
        type="radialBar"
        series={chartData}
        options={chartOptions}
      />
      <Box sx={{ ml: 3, color: 'white' }}>
        <Typography variant="h4"> {fNumber(amount)} {amount !== 1 ? 'processes' : 'process'}</Typography>
        <Box sx={{ typography: 'body2', opacity: 0.72 }}>Suggested to move to pipeline</Box>
      </Box>
      <Icon icon={thumbsUp} className={classes.icon} />
    </Card>
  );
}

export default Widgets1;
