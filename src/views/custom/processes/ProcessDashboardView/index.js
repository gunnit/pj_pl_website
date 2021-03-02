import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import React, { useState, useEffect, useContext } from 'react';
import Welcome from './Welcome';
import WelcomeNoProcesses from './WelcomeNoProcesses';
import Page from 'components/Page';
import { useSelector } from 'react-redux';
import BubbleChart from '../BubbleChart';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import GenericBoxInfo from './GenericBoxInfo';
import CircleChart from './CircleChart'
import IdeasPerFunction from '../IdeasPerFunction';
import BottomCard from './BottomCard';
import RecentProcesses from './RecentProcesses';
import LoadingScreen from 'components/LoadingScreen';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import Page500View from 'views/errors/Page500View';
import { PATH_APP } from 'routes/paths';
import ideaIcon from '@iconify-icons/el/idea';
import rocket11 from '@iconify-icons/maki/rocket-11';
import gearsIcon from '@iconify-icons/whh/gears';
import raceflagIcon from '@iconify-icons/whh/raceflag';
import BarRechart from './BarRechart';


const useStyles = makeStyles(theme => ({
    root: {}
}));

export default function ProcessDashboardView() {
    const classes = useStyles();
    const theme = useTheme()
    const { auth, profile } = useSelector(state => state.firebase);
    const displayName = auth.displayName || profile.displayName;
    // profile has the displayName when the user first signs up and auth doesn't
    const [dashboard, setDashboard] = useState(null)
    const [error, setError] = useState(false)
    const { userId } = useContext(Context)

    useEffect(() => {

        if (!dashboard && userId) {

            (async function () {
                try {
                    const token = await firebase.auth().currentUser.getIdToken(true);

                    const res = await fetch(`${apiBaseUrl}/dashboard/${userId}`, {
                        headers: {
                            'Authorization': token
                        }
                    })
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


    // if (true) {
    //     return (
    //         <Container maxWidth="xl">
    //             <Grid container spacing={3}>
    //                 <Grid item xs={12} md={12} lg={12}>
    //                     <WelcomeBetaUser displayName={displayName} />
    //                 </Grid>
    //             </Grid>
    //         </Container>
    //     )
    // }


    // When the user has no processes
    if (!dashboard.processes.length) {
        return (
            <Page title="Dashboard" className={classes.root}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <WelcomeNoProcesses displayName={displayName} />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} >
                            <BottomCard
                                title={'Define a Vision'}
                                description={'Create a vision for your digital workforce based on organizational strategy and goals, that support long term intelligent automation processes.'}
                                imagePath={'/static/images/process/undraw_statistic_chart_38b6.svg'}
                                clickPath={PATH_APP.processes.new}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} >
                            <BottomCard
                                title={'Assess your Organization'}
                                description={'Assess the organizational design that best supports delivery of your RPA capability and aligns with your corporate strategy and culture.'}
                                imagePath={'/static/images/process/undraw_solution_mindset_34bi.svg'}
                                clickPath={PATH_APP.user.objectives}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} >
                            <BottomCard
                                title={'Govern the pipeline'}
                                description={'Assess and select processes to build a sustainable automation pipeline and implement governance for a secured and digital workforce.'}
                                imagePath={'/static/images/process/undraw_Booking_re_gw4j.svg'}
                                clickPath={PATH_APP.processes.list}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} >
                            <BottomCard
                                title={'Consult the Wiki'}
                                description={'Discover your next process from our process database, benchmark your operations against industry standards and understand your process metrics.'}
                                imagePath={'/static/images/process/undraw_Web_search_re_efla.svg'}
                                clickPath={PATH_APP.discovery.taxonomy}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        )
    }

    return (
        <Page title="Dashboard" className={classes.root}>
            <Container maxWidth="xl">
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
                                mainNumber={dashboard.net_benefit_sum_idea ? dashboard.net_benefit_sum_idea.sum : 0}
                                secondaryNumber={dashboard.processes_idea_count}
                                iconColor={theme.palette.info.main}
                                icon={ideaIcon}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GenericBoxInfo
                                numberOfItems={14}
                                infoType={'Pipeline'}
                                mainNumber={dashboard.net_benefit_sum_pipeline ? dashboard.net_benefit_sum_pipeline.sum : 0}
                                secondaryNumber={dashboard.processes_pipeline_count}
                                iconColor={theme.palette.error.main}
                                icon={rocket11}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GenericBoxInfo
                                numberOfItems={65}
                                infoType={'Development'}
                                mainNumber={dashboard.net_benefit_sum_development ? dashboard.net_benefit_sum_development.sum : 0}
                                secondaryNumber={dashboard.processes_development_count}
                                iconColor={theme.palette.warning.main}
                                icon={gearsIcon}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GenericBoxInfo
                                numberOfItems={43}
                                infoType={'Production'}
                                mainNumber={dashboard.net_benefit_sum_production ? dashboard.net_benefit_sum_production.sum : 0}
                                secondaryNumber={dashboard.processes_production_count}
                                iconColor={theme.palette.primary.main}
                                icon={raceflagIcon}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <CircleChart
                            net_benefit_sum_idea={dashboard.net_benefit_sum_idea}
                            net_benefit_sum_pipeline={dashboard.net_benefit_sum_pipeline}
                            net_benefit_sum_development={dashboard.net_benefit_sum_development}
                            net_benefit_sum_production={dashboard.net_benefit_sum_production}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <IdeasPerFunction
                            data={[
                                dashboard.count_function_processes_finance,
                                dashboard.count_function_processes_inventory,
                                dashboard.count_function_processes_production,
                                dashboard.count_function_processes_supply_chain,
                                dashboard.count_function_processes_procurement,
                                dashboard.count_function_processes_accounting,
                                dashboard.count_function_processes_HR,
                                dashboard.count_function_processes_legal,
                                dashboard.count_function_processes_marketing,
                                dashboard.count_function_processes_sales,
                                dashboard.count_function_processes_customer_services,
                                dashboard.count_function_processes_development,
                                dashboard.count_function_processes_IT,
                                dashboard.count_function_processes_other,
                                dashboard.count_function_processes_notanswered,
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <RecentProcesses
                            processes={dashboard.processes.slice(0, 10)}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} >
                        <BottomCard
                            title={'Define a Vision'}
                            description={'Create a vision for your digital workforce based on organizational strategy and goals, that support long term intelligent automation processes.'}
                            imagePath={'/static/images/process/undraw_statistic_chart_38b6.svg'}
                            clickPath={PATH_APP.processes.new}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} >
                        <BottomCard
                            title={'Assess your Organization'}
                            description={'Assess the organizational design that best supports delivery of your RPA capability and aligns with your corporate strategy and culture.'}
                            imagePath={'/static/images/process/undraw_solution_mindset_34bi.svg'}
                            clickPath={PATH_APP.user.objectives}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} >
                        <BottomCard
                            title={'Govern the pipeline'}
                            description={'Assess and select processes to build a sustainable automation pipeline and implement governance for a secured and digital workforce.'}
                            imagePath={'/static/images/process/undraw_Booking_re_gw4j.svg'}
                            clickPath={''}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} >
                        <BottomCard
                            title={'Consult the Wiki'}
                            description={'Discover your next process from our process database, benchmark your operations against industry standards and understand your process metrics.'}
                            imagePath={'/static/images/process/undraw_Web_search_re_efla.svg'}
                            clickPath={PATH_APP.discovery.taxonomy}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}