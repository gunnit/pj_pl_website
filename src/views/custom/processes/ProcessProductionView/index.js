import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import SearchTable from './SearchTable'
import Page from 'components/Page';
import Breakeven from './Breakeven';
import ThreeYearProjectionsTable from './ThreeYearProjectionsTable';
import GenericBoxInfoProduction from './GenericBoxInfoProduction';
import BarChart from './BarChart';
import NoProcesses from '../NoProcesses';

const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessProductionView() {
    const classes = useStyles();
    // const { auth, profile } = useSelector(state => state.firebase);
    // const displayName = auth.displayName || profile.displayName;

    const processes = true;

    return (
        <Page title="Production Dashboard" className={classes.root}>
            {processes
                ? <Container maxWidth="xl">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4" gutterBottom>Production Dashboard</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Track your achieved savings and monitor your processes in production
                    </Typography>
                    </Box>
                    <Grid container spacing={3}>

                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'Total Development Cost'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'Total Maintenance Cost'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'Total License Cost'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'Total Infrastructure Cost'} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchTable />
                        </Grid>

                        <Grid item lg={12}>
                            <BarChart />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'ROI Year 1'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'ROI Year 2'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'ROI Year 3'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'Savings After 3 Years'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'FTE Savings'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'Hours Returned to Business'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'Net Present Value'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoProduction infoType={'Hours Saved (Yearly)'} />
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
                    primaryText={'No processes in production'}
                    secondaryText={'Add some of your ideas to unleash the full potential of the app!'}
                />}
        </Page>
    );
}

export default ProcessProductionView;
