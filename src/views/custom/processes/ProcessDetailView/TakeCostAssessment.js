import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Button } from '@material-ui/core';
import { PATH_APP } from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));

export default function TakeCostAssessment() {

    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <Box
                component="img"
                alt="welcome"
                src={''}
                sx={{
                    p: 2,
                    height: 205,
                    margin: { xs: 'auto', md: 'inherit' }
                }}
            />
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    Add your current and future costs to see a breakdown and comparison of your costs and savings.
                    </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Gain a quantitative perspective on the feasability of implementing your process with a comprehensive cost breakdown. Adding your costs will further unlock insights into quarterly and yearly projections, metrics, and different KPI's.
                    </Typography>
            </Box>
            <Button variant='contained' color='warning' to={PATH_APP.processes.costAssessment} component={RouterLink}>Add Costs</Button>
        </Card>
    )

}
