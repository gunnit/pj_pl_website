import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'utils/formatNumber';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => {
  const chartHeight = 392;
  const legendHeight = 72;
  return {
    root: {},
    chart: {
      height: chartHeight,
      marginTop: theme.spacing(2),
      '& .apexcharts-canvas svg': { height: chartHeight },
      '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
      },
      '& .apexcharts-legend': {
        height: legendHeight,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${chartHeight - legendHeight}px) !important`
      }
    }
  };
});

function CircleChart({
  net_benefit_sum_idea,
  net_benefit_sum_pipeline,
  net_benefit_sum_development,
  net_benefit_sum_production,
  className,
  ...other
}) {

  // console.log(net_benefit_sum_idea)
  // console.log(net_benefit_sum_pipeline)
  // console.log(net_benefit_sum_development)
  // console.log(net_benefit_sum_production)


  const classes = useStyles();
  const theme = useTheme();
  const chartData = [
    net_benefit_sum_idea.sum ? net_benefit_sum_idea.sum : net_benefit_sum_idea,
    net_benefit_sum_pipeline.sum ? net_benefit_sum_pipeline.sum : net_benefit_sum_pipeline,
    net_benefit_sum_development.sum ? net_benefit_sum_development.sum : net_benefit_sum_development,
    net_benefit_sum_production.sum ? net_benefit_sum_production.sum : net_benefit_sum_production,

  ];
  const chartOptions = merge(ApexChartsOption(), {
    labels: ['Ideas', 'Pipeline', 'Development', 'Production'],
    legend: { floating: true, horizontalAlign: 'center' },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            {
              offset: 0,
              color: theme.palette.primary.main
            },
            {
              offset: 100,
              color: theme.palette.primary.main
            }
          ],
          [
            {
              offset: 0,
              color: theme.palette.info.main
            },
            {
              offset: 100,
              color: theme.palette.info.main
            }
          ],
          [
            {
              offset: 0,
              color: theme.palette.warning.main
            },
            {
              offset: 100,
              color: theme.palette.warning.main
            }
          ],
          [
            {
              offset: 0,
              color: theme.palette.error.main
            },
            {
              offset: 100,
              color: theme.palette.error.main
            }
          ],
        ]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: function (w) {
              return fNumber(2324); // change this
            }
          }
        }
      }
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Savings" />
      <ReactApexChart
        height={310}
        type="radialBar"
        series={chartData}
        options={chartOptions}
        className={classes.chart}
      />
    </Card>
  );
}

CircleChart.propTypes = {
  className: PropTypes.string
};

export default CircleChart;
