import React from 'react';
import GroupingFixedHeader from './QuarterlyProjectionsTable';
import { Card, CardHeader } from '@material-ui/core';

function ProjectionsTable() {

    return (
        <Card>
            <CardHeader title="Quarterly Projections" />
            <GroupingFixedHeader />
        </Card>
    );
}

export default ProjectionsTable;
