import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import SearchTable from './SearchTable'
import Page from 'components/Page';
import InfoBoxWithTitleAndNumber from '../InfoBoxWithTitleAndNumber';
import NoProcesses from '../NoProcesses';
import { Icon, InlineIcon } from '@iconify/react';
import constructionWorker from '@iconify-icons/emojione-monotone/construction-worker';
import costEstimateOutline from '@iconify-icons/teenyicons/cost-estimate-outline';
import dollarCircleFilled from '@iconify-icons/ant-design/dollar-circle-filled';
import fieldTimeOutlined from '@iconify-icons/ant-design/field-time-outlined';




const useStyles = makeStyles(theme => ({
    root: {},

}));

function ProcessDevelopmentView() {
    const classes = useStyles();
    const theme = useTheme()
    // const { auth, profile } = useSelector(state => state.firebase);
    // const displayName = auth.displayName || profile.displayName;
    const processes = true;

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
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total Development Cost'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={constructionWorker}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Avg. Development Cost'}
                                mainNumber={0}
                                backgroundColor={theme.palette.success.lighter}
                                icon={costEstimateOutline}
                                
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Avg. Development Daily Rate'}
                                mainNumber={0}
                                backgroundColor={theme.palette.success.lighter}
                                icon={dollarCircleFilled}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Avg. Development Duration'}
                                mainNumber={0}
                                backgroundColor={theme.palette.success.lighter}
                                icon={fieldTimeOutlined}
                            />
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
