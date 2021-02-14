import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import Table from './Table'
import Page from 'components/Page';
import Widgets1 from './Widgets1';
import Widgets2 from './Widgets2';
import Widgets3 from './Widgets3';
import BarChart from './BarChart';
import ProcessCriticality from './ProcessCriticality';
import NatureOfProcess from './NatureOfProcess';

const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessIdeaView() {
    const classes = useStyles();
    // const { auth, profile } = useSelector(state => state.firebase);
    // const displayName = auth.displayName || profile.displayName;

    return (
        <Page title="Idea Dashboard" className={classes.root}>
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4" gutterBottom>Idea Dashboard</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Gain insight and understand the potential in your automation ideas
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
        </Page>
    );
}

export default ProcessIdeaView;
