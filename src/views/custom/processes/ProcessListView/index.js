import React from 'react';
import Tasks from './Tasks';
import NewUsers from './NewUsers';
import ItemOrders from './ItemOrders';
import ListProduction from './ListProduction';
import NewsUpdate from './NewsUpdate';
import Page from '~/components/Page';
import WeeklySales from './WeeklySales';
import WebsiteVisits from './WebsiteVisits';
import CurrentVisits from './CurrentVisits';
import OrderTimeline from './OrderTimeline';
import TrafficBySite from './TrafficBySite';
import CurrentSubject from './CurrentSubject';
import ConversionRates from './ConversionRates';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import Table from './Table'
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessListView() {
    const classes = useStyles();

    return (
        <Page title="All Processes" className={classes.root}>
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">All Processes</Typography>
                </Box>
                <Grid container spacing={3}>
                    {/*********************/}
                    <Grid item xs={12} sm={6} md={3}>
                        {/* Ideas */}
                        <WeeklySales />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* Pipeline */}
                        <NewUsers />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* Development */}
                        <ItemOrders />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {/* Production */}
                        <ListProduction />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Table />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default ProcessListView;
