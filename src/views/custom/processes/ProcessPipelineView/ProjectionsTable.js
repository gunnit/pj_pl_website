import React from 'react';
import GroupingFixedHeader from './GroupingFixedHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

// ----------------------------------------------------------------------

function ProjectionsTable() {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Quarterly Projections" />
            <GroupingFixedHeader />
        </Card>
    );
}

export default ProjectionsTable;
