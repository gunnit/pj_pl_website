import React, { useState, useEffect, useContext } from 'react';
import Page from 'components/Page';
import Ideas from './Ideas';
import Pipeline from './Pipeline';
import Development from './Development';
import Production from './Production';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import Table from './Table'
import { ButtonAnimate } from 'components/Animate';
import ShowAllProcesses from './ShowAllProcesses';
import Page500View from 'views/errors/Page500View';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import LoadingScreen from 'components/LoadingScreen';
import NoProcesses from '../NoProcesses';


const useStyles = makeStyles(theme => ({
    root: {},
    buttonAnimate: {
        width: '100%'
    }
}));

export default function ProcessListView() {
    const classes = useStyles();

    const [processes, setProcesses] = useState(null)
    const [error, setError] = useState(false)
    const { userId } = useContext(Context)

    const [pipelineFilter, setPipelineFilter] = useState('')

    useEffect(() => {

        if (!processes && userId) {

            (async function () {
                try {
                    const res = await fetch(`${apiBaseUrl}/process_list/${userId}`)
                    setProcesses(await res.json())
                } catch (e) {
                    setError(true)
                }
            })()
        }

    }, [processes, userId])

    if (error) {
        return <Page500View />
    }

    if (!processes) {
        return <LoadingScreen />
    }

    return (
        <Page title="All Processes" className={classes.root}>
            {processes.processes.length
                ? <Container maxWidth="xl">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4">All Processes</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <ShowAllProcesses setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <Ideas setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <Pipeline setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <Development setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <Production setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Table processes={processes.processes} pipelineFilter={pipelineFilter} />
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