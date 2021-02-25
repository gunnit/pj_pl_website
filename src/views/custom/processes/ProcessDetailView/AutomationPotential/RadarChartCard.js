import { merge } from 'lodash';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
} from '@material-ui/core';
import { MLabel } from '@material-extend';
import { fData } from 'utils/formatNumber';

// ----------------------------------------------------------------------


const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        height: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardHeader: {
        display: 'flex',
    },
    cardLabel: {
        marginLeft: theme.spacing(1)
    }
}));

export default function RadarChartCard({ average_scores_per_subgroup }) {
    const classes = useStyles();

    const theme = useTheme();


    // This is so the chart data and category labels will be based on the same order. In the future, the subgroups should have a specific order every time
    const subgroups = Object.keys(average_scores_per_subgroup)

    const CHART_DATA = [
        {
            name: 'Subgroups',
            data: subgroups.map(subgroup => average_scores_per_subgroup[subgroup].average)
        },
    ];

    const totalAverageOfSubgroups = Object.values(average_scores_per_subgroup).reduce((currentSum, subgroup) => (currentSum + parseFloat(subgroup.average)), 0) / subgroups.length



    const chartOptions = merge(ApexChartsOption(), {
        stroke: { width: 2 },
        fill: { opacity: 0.48 },
        legend: { position: 'bottom', horizontalAlign: 'center' },
        xaxis: {
            categories: subgroups,
            labels: {
                style: {
                    colors: [
                        theme.palette.text.secondary,
                        theme.palette.text.secondary,
                        theme.palette.text.secondary,
                        theme.palette.text.secondary,
                        theme.palette.text.secondary,
                        theme.palette.text.secondary
                    ]
                }
            }
        }
    });

    return (
        <Card>
            <CardHeader title={
                <div className={classes.cardHeader}>
                    <Typography>Automation Score:</Typography>
                    <MLabel className={classes.cardLabel} variant="filled" color={"primary"}>
                        {totalAverageOfSubgroups.toFixed(2)}
                    </MLabel>
                </div>
            } />
            <CardContent className={classes.content}>
                <ReactApexChart
                    width={540}
                    type="radar"
                    series={CHART_DATA}
                    options={chartOptions}
                />
            </CardContent>
        </Card>
    );
}