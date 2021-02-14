import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import Table from './SearchTable'
import Page from 'components/Page';
import Widgets1 from './Widgets1';
import Widgets2 from './Widgets2';
import Widgets3 from './Widgets3';
import ColumnSingleChart from './ColumnSingleChart';
import ProjectionsTable from './ProjectionsTable';
import Breakeven from './Breakeven';
import ThreeYearProjectionsTable from './ThreeYearProjectionsTable';
import BubbleChart from './BubbleChart';

const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessPipelineView() {
    const classes = useStyles();
    // const { auth, profile } = useSelector(state => state.firebase);
    // const displayName = auth.displayName || profile.displayName;

    return (
        <Page title="Pipeline Dashboard" className={classes.root}>
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4" gutterBottom>Pipeline Dashboard</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Build a business case by assessing the automation potential and ROI
                    </Typography>
                </Box>
                <Grid container spacing={3}>

                    {/* For widgets, replace chart with image/icon */}
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Widgets1 />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Widgets2 />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Widgets3 />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Table />
                    </Grid>
                    <Grid item lg={12}>
                        <BubbleChart />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title="Top 10 Processes: Automation Potential" />
                            <CardContent>
                                <ColumnSingleChart />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title="Top 10 Processes: Annual Savings (1st Year)" />
                            <CardContent>
                                <ColumnSingleChart />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectionsTable />
                    </Grid>
                    <Grid item xs={12}>
                        <Breakeven />
                    </Grid>
                    <Grid item xs={12}>
                        <ThreeYearProjectionsTable />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default ProcessPipelineView;
