import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
    }
}));

export default function TopCard({ title }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader title={title} />
            <CardContent>
                <Box
                    component="img"
                    alt="welcome"
                    src=""
                />
            </CardContent>
        </Card>
    );
}