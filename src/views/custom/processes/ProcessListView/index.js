import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import React, { useState, useEffect, useContext } from 'react';
import Page from 'components/Page';
import Ideas from './Ideas';
import Pipeline from './Pipeline';
import Development from './Development';
import Production from './Production';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import Table from './Table'
import { ButtonAnimate } from 'components/Animate';
import ShowAllProcesses from './ShowAllProcesses';
import Page500View from 'views/errors/Page500View';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import LoadingScreen from 'components/LoadingScreen';
import NoProcesses from '../NoProcesses';
import ideaIcon from '@iconify-icons/el/idea';
import rocket11 from '@iconify-icons/maki/rocket-11';



const useStyles = makeStyles(theme => ({
    root: {},
    buttonAnimate: {
        width: '100%'
    }
}));

export default function ProcessListView() {
    const classes = useStyles()
    const theme = useTheme()

    const [processes, setProcesses] = useState(null)
    const [error, setError] = useState(false)
    const [pipelineFilter, setPipelineFilter] = useState('')

    const { userId, currentProcessId, setProcessCounts } = useContext(Context)


    useEffect(() => {

        if (!processes && userId) {

            (async function () {
                try {
                    const token = await firebase.auth().currentUser.getIdToken(true);

                    const res = await fetch(`${apiBaseUrl}/process_list/${userId}`, {
                        headers: {
                            'Authorization': token
                        }
                    })
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



    const handleDeleteProcess = async () => {

        const token = await firebase.auth().currentUser.getIdToken(true);

        const res = await fetch(`${apiBaseUrl}/delete_process/${currentProcessId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": token
            }
        })
        const { pipeline } = await res.json()

        // Remove deleted process from state
        // These names are confusing
        const newProcessesArray = processes.processes.filter(process => process.id !== currentProcessId)
        setProcesses({ ...processes, processes: newProcessesArray })

        // Update number on navbar
        setProcessCounts(previous => ({ ...previous, [pipeline]: previous[pipeline] - 1 }))

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
                                <ShowAllProcesses number={processes.processes.length} setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <Ideas number={processes.processes_in_idea} setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <Pipeline number={processes.processes_in_pipline} setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <Development number={processes.processes_in_development} setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                            <ButtonAnimate className={classes.buttonAnimate}>
                                <Production number={processes.processes_in_deployment} setPipelineFilter={setPipelineFilter} />
                            </ButtonAnimate>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Table processes={processes.processes} handleDeleteProcess={handleDeleteProcess} pipelineFilter={pipelineFilter} />
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