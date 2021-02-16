import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import SearchTable from './SearchTable'
import Page from 'components/Page';
import Breakeven from './Breakeven';
import ThreeYearProjectionsTable from './ThreeYearProjectionsTable';
import InfoBoxWithTitleAndNumber from '../InfoBoxWithTitleAndNumber';
import BarChart from './BarChart';
import NoProcesses from '../NoProcesses';
import rocketIcon from '@iconify-icons/fxemoji/rocket';


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
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total Development Cost'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total Maintenance Cost'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total License Cost'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total Infrastructure Cost'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchTable />
                        </Grid>

                        <Grid item lg={12}>
                            <BarChart />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'ROI Year 1'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'ROI Year 2'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'ROI Year 3'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Savings After 3 Years'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'FTE Savings'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Hours Returned to Business'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Net Present Value'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Hours Saved (Yearly)'}
                                mainNumber={0}
                                backgroundColor={''}
                                icon={rocketIcon}
                            />
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
