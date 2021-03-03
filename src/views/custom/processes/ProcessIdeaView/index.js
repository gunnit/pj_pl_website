import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import IdeasTable from './IdeasTable'
import Page from 'components/Page';
import Widgets1 from './Widgets1';
import Widgets2 from './Widgets2';
import Widgets3 from './Widgets3';
import IdeasPerFunction from '../IdeasPerFunction';
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
                    const token = await firebase.auth().currentUser.getIdToken(true);

                    const res = await fetch(`${apiBaseUrl}/ideas/${userId}`, {
                        headers: {
                            'Authorization': token
                        }
                    })
                    setIdeas(await res.json())
                } catch (e) {
                    setError(true)
                }
            })()
        }

    }, [ideas, userId])


    // const handleDeleteProcess = async () => {

    //     const token = await firebase.auth().currentUser.getIdToken(true);

    //     const res = await fetch(`${apiBaseUrl}/delete_process/${currentProcessId}`, {
    //         method: 'DELETE',
    //         headers: {
    //             "Authorization": token
    //         }
    //     })
    //     const { pipeline } = await res.json()

    //     // Remove deleted process from state
    //     // These names are confusing
    //     const newProcessesArray = processes.processes.filter(process => process.id !== currentProcessId)
    //     setProcesses({ ...processes, processes: newProcessesArray })

    //     // Update number on navbar
    //     setProcessCounts(previous => ({ ...previous, [pipeline]: previous[pipeline] - 1 }))

    // }



    if (error) {
        return <Page500View />
    }

    if (!ideas) {
        return <LoadingScreen />
    }

    return (
        <Page title="Idea Dashboard" className={classes.root}>
            {ideas.processes_idea.length
                ? <Container maxWidth="xl">
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
                            <IdeasTable processes={ideas.processes_idea} />
                        </Grid>

                        <Grid item lg={12}>
                            <IdeasPerFunction data={[
                                ideas.count_function_processes_finance,
                                ideas.count_function_processes_inventory,
                                ideas.count_function_processes_production,
                                ideas.count_function_processes_supply_chain,
                                ideas.count_function_processes_procurement,
                                ideas.count_function_processes_accounting,
                                ideas.count_function_processes_HR,
                                ideas.count_function_processes_legal,
                                ideas.count_function_processes_marketing,
                                ideas.count_function_processes_sales,
                                ideas.count_function_processes_customer_services,
                                ideas.count_function_processes_development,
                                ideas.count_function_processes_IT,
                                ideas.count_function_processes_other,
                                ideas.count_function_processes_notanswered,
                            ]} />
                        </Grid>
                        <Grid item lg={6}>
                            <ProcessCriticality
                                data={[
                                    ideas.count_criticality_processes_idea_extremely,
                                    ideas.count_criticality_processes_idea_very,
                                    ideas.count_criticality_processes_idea_moderately,
                                    ideas.count_criticality_processes_idea_slightly,
                                    ideas.count_criticality_processes_idea_notatall,
                                    ideas.count_criticality_processes_idea_notanswered,
                                ]}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <NatureOfProcess data={[
                                ideas.count_natureofprocess_processes_idea_entirely_repetitive,
                                ideas.count_natureofprocess_processes_idea_semi_repetitive,
                                ideas.count_natureofprocess_processes_idea_not_repetitive,
                                ideas.count_natureofprocess_processes_idea_blank_repetitive,
                            ]} />
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
