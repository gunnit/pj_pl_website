import React from 'react';
import { Container, Grid } from '@material-ui/core';
import SuggestedTasks from './SuggestedTasks';
import AllTasks from './AllTasks';


function Progress() {

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item lg={12}>
                    <SuggestedTasks />
                </Grid>
                <Grid item lg={12}>
                    <AllTasks />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Progress;
