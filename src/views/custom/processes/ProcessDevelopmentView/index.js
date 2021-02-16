import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import SearchTable from './SearchTable'
import Page from 'components/Page';
import GenericBoxInfoDevelopment from './GenericBoxInfoDevelopment';
import NoProcesses from '../NoProcesses';


const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessDevelopmentView() {
    const classes = useStyles();
    // const { auth, profile } = useSelector(state => state.firebase);
    // const displayName = auth.displayName || profile.displayName;
    const processes = false;

    return (
        <Page title="Development Dashboard" className={classes.root}>
            {processes
                ? <Container maxWidth="xl">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4" gutterBottom>Development Dashboard</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Track your projects in development and make sure they are put into production as predicted
                    </Typography>
                    </Box>
                    <Grid container spacing={3}>

                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoDevelopment infoType={'Total Development Cost'} />
                            {/* <Icon icon={rocketIcon} className={classes.icon} /> */}
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoDevelopment infoType={'Avg. Development Cost'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoDevelopment infoType={'Avg. Development Daily Rate'} />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <GenericBoxInfoDevelopment infoType={'Avg. Development Duration'} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchTable />
                        </Grid>
                    </Grid>
                </Container>
                : <NoProcesses
                    primaryText={'No processes in development'}
                    secondaryText={'Add some of your ideas to unleash the full potential of the app!'}
                />}
        </Page>
    );
}

export default ProcessDevelopmentView;
