import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Box, Typography, Divider } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    cardContent: {
        display: 'flex',
    }

}));

export default function MetricCard({ metric_name, formula, formula_units }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <Box
                    sx={{
                        my: 5,
                        mx: 'auto',
                        maxWidth: 280,
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom color='textSecondary'>
                        Metric Name
                    </Typography>
                    <Typography>
                        {metric_name}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        my: 5,
                        mx: 'auto',
                        maxWidth: 280,
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom color='textSecondary'>
                        Formula
                    </Typography>
                    <Typography>
                        {formula}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        my: 5,
                        mx: 'auto',
                        maxWidth: 280,
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom color='textSecondary'>
                        Formula Units
                    </Typography>
                    <Typography>
                        {formula_units}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}