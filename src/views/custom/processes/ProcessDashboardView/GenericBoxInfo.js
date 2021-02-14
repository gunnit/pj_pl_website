import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'utils/formatNumber';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
    trending: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    trendingIcon: {
        width: 24,
        height: 24,
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing(1),
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.16)
    },
    isTrendingDown: {
        color: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.16)
    },
    estimatedSavings: {
        marginBottom: theme.spacing(1)
    }
}));

// ----------------------------------------------------------------------

GenericBoxInfo.propTypes = {
    className: PropTypes.string,
    numberOfItems: PropTypes.number,
    infoType: PropTypes.string,
    mainNumber: PropTypes.number,
    secondaryNumber: PropTypes.number,
};


function GenericBoxInfo({ className, numberOfItems, infoType, mainNumber, secondaryNumber, chartColor, ...other }) {
    const classes = useStyles();
    const theme = useTheme();

    const chartData = [{
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19].map(num => {
            return Math.random() * num
        })
    }];
    const chartOptions = {
        colors: [chartColor],
        chart: { sparkline: { enabled: true } },
        plotOptions: { bar: { columnWidth: '68%', endingShape: 'rounded' } },
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        tooltip: {
            x: { show: false },
            y: {
                formatter: seriesName => fNumber(seriesName),
                title: {
                    formatter: function (seriesName) {
                        return '';
                    }
                }
            },
            marker: { show: false }
        }
    };

    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                    {infoType}
                </Typography>
                <Typography variant="h3">
                    {`$${fNumber(mainNumber)}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    &nbsp;estimated savings
                </Typography>

                <div className={classes.trending}>
                    <div
                        className={clsx(classes.trendingIcon, {
                            [classes.isTrendingDown]: secondaryNumber < 0
                        })}
                    >
                        <Icon
                            width={16}
                            height={16}
                            icon={secondaryNumber >= 0 ? trendingUpFill : trendingDownFill}
                        />
                    </div>
                    <Typography variant="subtitle2" component="span">
                        {secondaryNumber > 0 && '+'}
                        {fPercent(secondaryNumber)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="span">
                        &nbsp;number of processes
                    </Typography>
                </div>
            </Box>

            <ReactApexChart
                type="bar"
                width={60}
                height={36}
                series={chartData}
                options={chartOptions}
            />
        </Card>
    );
}

export default GenericBoxInfo;
