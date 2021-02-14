import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import ColumnSingleChart from './ColumnSingleChart';

const useStyles = makeStyles(theme => ({
    root: {}
}));

function ComparisonChartCard() {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Cost Comparison" />
            <CardContent>
                <ColumnSingleChart />
            </CardContent>
        </Card>
    );
}

export default ComparisonChartCard;
