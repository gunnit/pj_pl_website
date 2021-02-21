import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import React, { useState, useEffect, useContext } from 'react';
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
import { apiBaseUrl } from 'config';
import Page500View from 'views/errors/Page500View';
import LoadingScreen from 'components/LoadingScreen';
import Context from 'context/Context';



const useStyles = makeStyles(theme => ({
    root: {},

}));

function ProcessDevelopmentView() {
    const classes = useStyles();
    const theme = useTheme()
    const [development, setDevelopment] = useState(null)
    const [error, setError] = useState(false)
    const { userId } = useContext(Context)


    useEffect(() => {

        if (!development && userId) {

            (async function () {
                try {
                    const token = await firebase.auth().currentUser.getIdToken(true);
                    // console.log(token)
                    const res = await fetch(`${apiBaseUrl}/development_report/${userId}`, {
                        headers: {
                            'Authorization': token
                        }
                    })
                    setDevelopment(await res.json())
                } catch (e) {
                    setError(true)
                }
            })()
        }

    }, [development, userId])

    if (error) {
        return <Page500View />
    }

    if (!development) {
        return <LoadingScreen />
    }


    return (
        <Page title="Development Dashboard" className={classes.root}>
            {development.processes_idea.length
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
                                mainNumber={development.sum_total_development_costs}
                                backgroundColor={theme.palette.secondary.lighter}
                                icon={constructionWorker}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Avg. Development Cost'}
                                mainNumber={development.avg_development_cost}
                                backgroundColor={theme.palette.success.lighter}
                                icon={costEstimateOutline}

                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Avg. Development Daily Rate'}
                                mainNumber={development.avg_development_rate}
                                backgroundColor={theme.palette.success.lighter}
                                icon={dollarCircleFilled}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <InfoBoxWithTitleAndNumber
                                infoType={'Avg. Development Duration'}
                                mainNumber={development.avg_development_time}
                                backgroundColor={theme.palette.success.lighter}
                                icon={fieldTimeOutlined}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchTable processes={development.processes_idea} />
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
