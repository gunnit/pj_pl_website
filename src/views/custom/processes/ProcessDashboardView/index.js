import React from 'react';
import Welcome from './Welcome';
import Page from 'components/Page';
import { useSelector } from 'react-redux';
import BubbleChart from './BubbleChart';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import GenericBoxInfo from './GenericBoxInfo';
import CircleChart from './CircleChart'
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

function ProcessDashboardView() {
    const classes = useStyles();
    const theme = useTheme()
    const { auth, profile } = useSelector(state => state.firebase);
    const displayName = auth.displayName || profile.displayName;

    return (
        <Page title="Dashboard" className={classes.root}>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}>

                        <Welcome displayName={displayName} />

                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <BubbleChart />
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
                                mainNumber={5594797}
                                secondaryNumber={2.8}
                                chartColor={theme.palette.primary.main}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GenericBoxInfo
                                numberOfItems={14}
                                infoType={'Pipeline'}
                                mainNumber={45797}
                                secondaryNumber={-6.0}
                                chartColor={theme.palette.info.main}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <GenericBoxInfo
                                numberOfItems={65}
                                infoType={'Development'}
                                mainNumber={9694797}
                                secondaryNumber={-7.9}
                                chartColor={theme.palette.warning.main}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GenericBoxInfo
                                numberOfItems={43}
                                infoType={'Production'}
                                mainNumber={5597}
                                secondaryNumber={1.4}
                                chartColor={theme.palette.error.main}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} >
                        <CircleChart />
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
}

export default ProcessDashboardView;
