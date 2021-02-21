import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Container, Grid, Button } from '@material-ui/core';
import { PATH_APP } from 'routes/paths';
import RadarChartCard from './RadarChartCard';
import AutomationScores from './AutomationScores';
import AutomationScoreDescriptionCard from './AutomationScoreDescriptionCard';
import GenericBoxInfo from './GenericBoxInfo';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));

export default function AutomationPotential({ processDetails }) {
    const classes = useStyles();


    // if (processDetails.median_score_potential === '0.00') {
    //     return (
    //         <Card className={classes.root}>
    //             <Box
    //                 component="img"
    //                 alt="welcome"
    //                 src={''}
    //                 sx={{
    //                     p: 2,
    //                     height: 205,
    //                     margin: { xs: 'auto', md: 'inherit' }
    //                 }}
    //             />
    //             <Box sx={{ flexGrow: 1 }}>
    //                 <Typography variant="h6" gutterBottom>
    //                     Complete the process automation potential assessment
    //                 </Typography>
    //                 <Typography variant="subtitle1" color="textSecondary">
    //                     The automation potential assessment will help you determine in a qualitative way if the process is a good candidate for automation.
    //                 </Typography>
    //             </Box>
    //             <Button variant='contained' color='info' to={PATH_APP.processes.automationAssessment} component={RouterLink}>Take Assessment</Button>
    //         </Card>
    //     )
    // }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item lg={6}>
                    <AutomationScores processDetails={processDetails} />
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