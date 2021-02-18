import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import SearchTable from './SearchTable'
import Page from 'components/Page';
import Breakeven from './Breakeven';
import ThreeYearProjectionsTable from './ThreeYearProjectionsTable';
import InfoBoxWithTitleAndNumber from '../InfoBoxWithTitleAndNumber';
import BarChart from './BarChart';
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
                    const res = await fetch(`${apiBaseUrl}/production_report/${userId}`)
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
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total Maintenance Cost'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total License Cost'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Total Infrastructure Cost'}
                                mainNumber={0}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={rocketIcon}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchTable processes={production.processes_idea} />
                        </Grid>
                        <Grid item lg={12}>
                            <BarChart />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'ROI Year 1'}
                                mainNumber={0}
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
