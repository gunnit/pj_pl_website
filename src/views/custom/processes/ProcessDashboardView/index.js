import React, { useState, useEffect, useContext } from 'react';
import Welcome from './Welcome';
import Page from 'components/Page';
import { useSelector } from 'react-redux';
import BubbleChart from './BubbleChart';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import GenericBoxInfo from './GenericBoxInfo';
import CircleChart from './CircleChart'
import BusinessFunctionChart from './BusinessFunctionChart';
import BottomCard from './BottomCard';
import RecentProcesses from './RecentProcesses';
import NoProcesses from '../NoProcesses';
import LoadingScreen from 'components/LoadingScreen';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import Page500View from 'views/errors/Page500View';


const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessDashboardView() {
    const classes = useStyles();
    const theme = useTheme()
    const { auth, profile } = useSelector(state => state.firebase);
    const displayName = auth.displayName || profile.displayName;

    const [dashboard, setDashboard] = useState(null)
    const [error, setError] = useState(false)
    const { userId } = useContext(Context)

    useEffect(() => {

        if (!dashboard && userId) {

            (async function () {
                try {
                    const res = await fetch(`${apiBaseUrl}/dashboard/${userId}`)

                    setDashboard(await res.json())
                } catch (e) {
                    setError(true)
                }
            })()
        }

    }, [dashboard, userId])

    if (error) {
        return <Page500View />
    }

    if (!dashboard) {
        return <LoadingScreen />
    }



    return (
        <Page title="Dashboard" className={classes.root}>
            {dashboard
                ? <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={4}>

                            <Welcome displayName={displayName} />

                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <BubbleChart data={dashboard.processes} />
                        </Grid>
                        <Grid
                            item
                            container
                            spacing={3}
                            direction='row'
                            alignContent='flex-start'
                            xs={12}
                            md={8}>
                            <Grid item xs={12} md={6}>
                                <GenericBoxInfo
                                    numberOfItems={19}
                                    infoType={'Ideas'}
                                    mainNumber={dashboard.net_benefit_sum_idea}
                                    secondaryNumber={dashboard.processes_idea_count}
                                    chartColor={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <GenericBoxInfo
                                    numberOfItems={14}
                                    infoType={'Pipeline'}
                                    mainNumber={dashboard.net_benefit_sum_pipeline}
                                    secondaryNumber={dashboard.processes_pipeline_count}
                                    chartColor={theme.palette.info.main}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <GenericBoxInfo
                                    numberOfItems={65}
                                    infoType={'Development'}
                                    mainNumber={dashboard.net_benefit_sum_development}
                                    secondaryNumber={dashboard.processes_development_count}
                                    chartColor={theme.palette.warning.main}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <GenericBoxInfo
                                    numberOfItems={43}
                                    infoType={'Production'}
                                    mainNumber={dashboard.net_benefit_sum_production}
                                    secondaryNumber={dashboard.processes_production_count}
                                    chartColor={theme.palette.error.main}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} >
                            <CircleChart />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} >
                            <BusinessFunctionChart />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} >
                            <RecentProcesses />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} >
                            <BottomCard
                                title={'Define a Vision'}
                                description={'Create a vision for your digital workforce based on organizational strategy and goals, that support long term intelligent automation processes.'}
                                imagePath={'/static/images/process/undraw_statistic_chart_38b6.svg'}
                                clickPath={''}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} >
                            <BottomCard
                                title={'Assess your Organization'}
                                description={'Assess the organizational design that best supports delivery of your RPA capability and aligns with your corportate strategy and culture.'}
                                imagePath={'/static/images/process/undraw_solution_mindset_34bi.svg'}
                                clickPath={''}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} >
                            <BottomCard
                                title={'Govern the pipeline'}
                                description={'Assess and select processes to build a sustainable automation pipeline and implement governacne for a secured and digital workforce.'}
                                imagePath={'/static/images/process/undraw_Booking_re_gw4j.svg'}
                                clickPath={''}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} >
                            <BottomCard
                                title={'Consult the Wiki'}
                                description={'Discover your next process from our process database, benchmark your operations against industry standards and understand your process metrics.'}
                                imagePath={'/static/images/process/undraw_Web_search_re_efla.svg'}
                                clickPath={''}
                            />
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

export default ProcessDashboardView;
