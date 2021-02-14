import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import RadarChartCard from './RadarChartCard';
import AutomationScores from './AutomationScores';
import AutomationScoreDescriptionCard from './AutomationScoreDescriptionCard';
import GenericBoxInfo from './GenericBoxInfo';

// ----------------------------------------------------------------------


const useStyles = makeStyles(theme => ({
    root: {}
}));

function AutomationPotential() {
    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item lg={6}>
                    <AutomationScores />
                </Grid>
                <Grid item lg={6}>
                    <RadarChartCard />
                </Grid>
                <Grid item lg={12}>
                    <AutomationScoreDescriptionCard />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfo
                        title={'Robotics (RPA)'}
                        description={'Robotics refers to an execution engine for processing rulebased tasks'}
                        imagePath={''}
                        clickPath={''}
                    />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfo
                        title={'Computer Vision (OCR)'}
                        description={'Tools used to extract information from images and convert them into a machine-readable format'}
                        imagePath={''}
                        clickPath={''}
                    />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfo
                        title={'Business Process Management (BPM)'}
                        description={'A set of workflow and process designing tools in which the business logic for optimized processes can be configured'}
                        imagePath={''}
                        clickPath={''}
                    />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfo
                        title={'Cognitive Enhancements'}
                        description={'Tools needed to automate knowledge-based business processes where human insight and decision making is required'}
                        imagePath={''}
                        clickPath={''}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default AutomationPotential;
