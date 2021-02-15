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
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GenericBoxInfo
                        title={'Robotics (RPA)'}
                        description={'Robotics refers to an execution engine for processing rulebased tasks'}
                        imagePath={'/static/images/process/undraw_Firmware_jw6u.svg'}
                        clickPath={''}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GenericBoxInfo
                        title={'Computer Vision (OCR)'}
                        description={'Tools used to extract information from images and convert them into a machine-readable format'}
                        imagePath={'/static/images/process/undraw_Artificial_intelligence_re_enpp.svg'}
                        clickPath={''}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GenericBoxInfo
                        title={'Business Process Management (BPM)'}
                        description={'A set of workflow and process designing tools in which the business logic for optimized processes can be configured'}
                        imagePath={'/static/images/process/undraw_prototyping_process_rswj.svg'}
                        clickPath={''}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GenericBoxInfo
                        title={'Cognitive Enhancements'}
                        description={'Tools needed to automate knowledge-based business processes where human insight and decision making is required'}
                        imagePath={'/static/images/process/undraw_services_5tv9.svg'}
                        clickPath={''}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default AutomationPotential;
