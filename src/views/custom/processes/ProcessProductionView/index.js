import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import SearchTable from './SearchTable'
import Page from 'components/Page';
import BreakEvenChart from './BreakEvenChart';
import ThreeYearProjectionsTable from './ThreeYearProjectionsTable';
import InfoBoxWithTitleAndNumber from '../InfoBoxWithTitleAndNumber';
import IdeasPerFunction from '../IdeasPerFunction';
import NoProcesses from '../NoProcesses';
import rocketIcon from '@iconify-icons/fxemoji/rocket';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import Page500View from 'views/errors/Page500View';
import LoadingScreen from 'components/LoadingScreen';


const useStyles = makeStyles(theme => ({
    root: {},
}));

function ProcessProductionView() {
    const classes = useStyles();
    const theme = useTheme()
    const [production, setProduction] = useState(null)
    const [error, setError] = useState(false)
    const { userId } = useContext(Context)


    useEffect(() => {

        if (!production && userId) {

            (async function () {
                try {
                    const token = await firebase.auth().currentUser.getIdToken(true);

                    const res = await fetch(`${apiBaseUrl}/production_report/${userId}`, {
                        headers: {
                            'Authorization': token
                        }
                    })


                    setProduction(await res.json())
                } catch (e) {
                    setError(true)
                }
            })()
        }

    }, [production, userId])

    if (error) {
        return <Page500View />
    }

    if (!production) {
        return <LoadingScreen />
    }

    return (
        <Page title="Production Dashboard" className={classes.root}>
            {production.processes_idea.length
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
                                mainNumber={production.total_development_cost}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total Maintenance Cost'}
                                mainNumber={production.total_maintenance_cost}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total License Cost'}
                                mainNumber={production.total_licence_cost}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total Infrastructure Cost'}
                                mainNumber={production.total_infrastructure_cost}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchTable processes={production.processes_idea} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <IdeasPerFunction
                                data={[
                                    production.count_function_processes_finance,
                                    production.count_function_processes_inventory,
                                    production.count_function_processes_production,
                                    production.count_function_processes_supply_chain,
                                    production.count_function_processes_procurement,
                                    production.count_function_processes_accounting,
                                    production.count_function_processes_HR,
                                    production.count_function_processes_legal,
                                    production.count_function_processes_marketing,
                                    production.count_function_processes_sales,
                                    production.count_function_processes_customer_services,
                                    production.count_function_processes_development,
                                    production.count_function_processes_IT,
                                    production.count_function_processes_other,
                                    production.count_function_processes_notanswered,
                                ]}
                                production={true}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'ROI Year 1'}
                                mainNumber={production.total_infrastructure_cost}
                                backgroundColor={theme.palette.error.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'ROI Year 2'}
                                mainNumber={0}
                                backgroundColor={theme.palette.error.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'ROI Year 3'}
                                mainNumber={0}
                                backgroundColor={theme.palette.error.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Savings After 3 Years'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'FTE Savings'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Hours Returned to Business'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Net Present Value'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Hours Saved (Yearly)'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <BreakEvenChart
                                total_process_quarter_ideas_with_automation={production.total_process_quarter_ideas_with_automation}
                                total_process_quarter_ideas_with_no_automation={production.total_process_quarter_ideas_with_no_automation}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ThreeYearProjectionsTable
                                total_process_years_ideas_with_auto={production.total_process_years_ideas_with_auto}
                                total_process_years_ideas_with_no_auto_total={production.total_process_years_ideas_with_no_auto_total}
                                total_process_years_ideas_savings_total={production.total_process_years_ideas_savings_total}
                            />
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
