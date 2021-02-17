import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import Table from './Table'
import Page from 'components/Page';
import Widgets1 from './Widgets1';
import Widgets2 from './Widgets2';
import Widgets3 from './Widgets3';
import BarChart from './IdeasPerFunction';
import ProcessCriticality from './ProcessCriticality';
import NatureOfProcess from './NatureOfProcess';
import NoProcesses from '../NoProcesses';
import LoadingScreen from 'components/LoadingScreen';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import Page500View from 'views/errors/Page500View';


const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessIdeaView() {
    const classes = useStyles();
    const [ideas, setIdeas] = useState(null)
    const [error, setError] = useState(false)
    const { userId } = useContext(Context)

    useEffect(() => {

        if (!ideas && userId) {

            (async function () {
                try {
                    const res = await fetch(`${apiBaseUrl}/ideas/${userId}`)

                    setIdeas(await res.json())
                } catch (e) {
                    setError(true)
                }
            })()
        }

    }, [ideas, userId])

    if (error) {
        return <Page500View />
    }

    if (!ideas) {
        return <LoadingScreen />
    }

    return (
        <Page title="Idea Dashboard" className={classes.root}>
            {ideas.processes_idea.length ? <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4" gutterBottom>Idea Dashboard</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Gain insight and understand the potential in your automation ideas
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Widgets1 amount={ideas.strongly_suggested_for_automation} total={ideas.processes_idea.length} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Widgets2 amount={ideas.suggested_for_automation} total={ideas.processes_idea.length} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Widgets3 amount={ideas.not_suggested_for_automation} total={ideas.processes_idea.length} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Table />
                    </Grid>

                    <Grid item lg={12}>
                        <BarChart />
                    </Grid>
                    <Grid item lg={6}>
                        <ProcessCriticality />
                    </Grid>
                    <Grid item lg={6}>
                        <NatureOfProcess />
                    </Grid>
                </Grid>
            </Container>
                : <NoProcesses
                    primaryText={'No process ideas'}
                    secondaryText={'Add some of your ideas to unleash the full potential of the app!'}
                />}
        </Page>
    );
}

export default ProcessIdeaView;
