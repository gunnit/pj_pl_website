import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import Table from './SearchTable'
import Page from 'components/Page';
import Widgets1 from './Widgets1';
import Widgets2 from './Widgets2';
import Widgets3 from './Widgets3';
import ColumnSingleChart from './ColumnSingleChart';
import QuarterlyProjectionsTable from './QuarterlyProjectionsTable';
import Breakeven from './Breakeven';
import ThreeYearProjectionsTable from './ThreeYearProjectionsTable';
import BubbleChart from './BubbleChart';
import NoProcesses from '../NoProcesses';
import Page500View from 'views/errors/Page500View';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import LoadingScreen from 'components/LoadingScreen';


const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessPipelineView() {
    const classes = useStyles();
    const [pipeline, setPipeline] = useState(null)
    const [error, setError] = useState(false)
    const { userId } = useContext(Context)

    useEffect(() => {

        if (!pipeline && userId) {

            (async function () {
                try {
                    const res = await fetch(`${apiBaseUrl}/pipeline_report/${userId}`)
                    setPipeline(await res.json())
                } catch (e) {
                    setError(true)
                }
            })()
        }

    }, [pipeline, userId])

    if (error) {
        return <Page500View />
    }

    if (!pipeline) {
        return <LoadingScreen />
    }

    return (
        <Page title="Pipeline Dashboard" className={classes.root}>
            {pipeline.processes_idea.length
                ? <Container maxWidth="xl">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4" gutterBottom>Pipeline Dashboard</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Build a business case by assessing the automation potential and ROI
                    </Typography>
                    </Box>
                    <Grid container spacing={3}>

                        {/* For widgets, replace chart with image/icon */}
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Widgets1 amount={pipeline.strongly_suggested_for_automation} total={pipeline.processes_idea.length} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Widgets2 amount={pipeline.suggested_for_automation} total={pipeline.processes_idea.length} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Widgets3 amount={pipeline.not_suggested_for_automation} total={pipeline.processes_idea.length} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Table processes={pipeline.processes_idea} />
                        </Grid>
                        <Grid item lg={12}>
                            <BubbleChart processes={pipeline.processes_idea} />
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
                            <QuarterlyProjectionsTable data={pipeline} />
                        </Grid>
                        <Grid item xs={12}>
                            <Breakeven />
                        </Grid>
                        <Grid item xs={12}>
                            <ThreeYearProjectionsTable />
                        </Grid>
                    </Grid>
                </Container>
                : <NoProcesses
                    primaryText={'No processes in the pipeline'}
                    secondaryText={'Add some of your ideas to unleash the full potential of the app!'}
                />}
        </Page>
    );
}

export default ProcessPipelineView;
