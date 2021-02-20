import React from 'react';
import { Container, Grid } from '@material-ui/core';
import SuggestedTasks from './SuggestedTasks';
import AllTasks from './AllTasks';


export default function Progress({ processDetails }) {

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item lg={12}>
                    <SuggestedTasks tasks={processDetails.process_tasks} />
                </Grid>
                <Grid item lg={12}>
                    <AllTasks tasks={processDetails.all_process_tasks} />
                </Grid>
            </Grid>
        </Container>
    );
}