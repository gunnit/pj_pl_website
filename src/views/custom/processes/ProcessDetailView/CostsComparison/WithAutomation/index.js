import React from 'react';
import ColumnStackedChart from './ColumnStackedChart';
import {
    Card,
    CardHeader,
    CardContent
} from '@material-ui/core';


function WithAutomation() {

    return (
        <Card>
            <CardHeader title="Costs With Automation" />
            <CardContent>
                <ColumnStackedChart />
            </CardContent>
        </Card>

    );
}

export default WithAutomation;
