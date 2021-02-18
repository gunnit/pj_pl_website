import React from 'react';
import { Container, Grid } from '@material-ui/core';
import CustomizedStepper from './CustomizedStepper';
import Welcome from './Welcome';
import GenericBoxInfoDetails from './GenericBoxInfoDetails';
import ProcessDescription from './ProcessDescription';


function Details({ processDetails }) {

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item container xs={12} md={8} spacing={3} alignContent='flex-start'>
                    <Grid item xs={12} md={12}>
                        <CustomizedStepper pipeline={processDetails.process.pipline} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Welcome />
                        {/* <WeeklySales /> */}
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
                            <WeeklySales />
                        </Grid> */}
                    <Grid item md={12} lg={12}>
                        <ProcessDescription />
                    </Grid>
                </Grid>
                <Grid item container spacing={3} md={4} alignContent='flex-start'>
                    <Grid item xs={12} md={12}>
                        <GenericBoxInfoDetails
                            infoType={'Automation Potential'}
                            mainNumber={7.5}
                            secondaryText={'score'}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <GenericBoxInfoDetails infoType={'Hours Saved'} mainNumber={52} secondaryText={'(in FTE) per year'} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <GenericBoxInfoDetails infoType={'Potential Savings'} mainNumber={8300} secondaryText={'per year'} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <GenericBoxInfoDetails infoType={'Cost With Automation'} mainNumber={472} secondaryText={'per year'} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <GenericBoxInfoDetails infoType={'Cost Without Automation'} mainNumber={8772} secondaryText={'per year'} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>

    );
}

export default Details;
