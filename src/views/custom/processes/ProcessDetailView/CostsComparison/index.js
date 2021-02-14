import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import WithoutAutomation from './WithoutAutomation';
import WithAutomation from './WithAutomation';
import GenericBoxInfoCostsComparison from './GenericBoxInfoCostsComparison';
import GenericBoxInfoDevelopment from './GenericBoxInfoDevelopment';
import GenericBoxInfo from './GenericBoxInfo';
import ComparisonChartCard from './ComparisonChartCard';
// ----------------------------------------------------------------------


const useStyles = makeStyles(theme => ({
    root: {}
}));

function CostsComparison() {
    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item lg={6}>
                    <WithAutomation />
                </Grid>
                <Grid item lg={6}>
                    <WithoutAutomation />
                </Grid>
                <Grid item lg={6}>
                    <GenericBoxInfoCostsComparison infoType={'Total Cost Without Automation'} />
                </Grid>
                <Grid item lg={6}>
                    <GenericBoxInfoCostsComparison infoType={'Total Cost With Automation'} />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfoDevelopment infoType={'Employee Costs (Annual)'} />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfoDevelopment infoType={'Infrastructure (Annual)'} />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfoDevelopment infoType={'License (Annual)'} />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfoDevelopment infoType={'Infrastructure (Annual)'} />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfoDevelopment infoType={'Maintenance (Annual)'} />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfoDevelopment infoType={'Other Costs (Annual)'} />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfoDevelopment infoType={'Maintenance (Annual)'} />
                </Grid>
                <Grid item lg={3}>
                    <GenericBoxInfoDevelopment infoType={'Development Costs (One Time)'} />
                </Grid>
                <Grid item lg={12}>
                    <ComparisonChartCard />
                </Grid>
                <Grid item lg={6}>
                    <GenericBoxInfo
                        title={'Business Process Management (BPM)'}
                        description={`A benefit–cost ratio is an indicator, used in cost–benefit analysis, that attempts to summarize the overall value for money of a project or proposal. A BCR is the ratio of the benefits of a project or proposal, expressed in monetary terms, relative to its costs, also expressed in monetary terms.`}
                        imagePath={''}
                        clickPath={''}
                    />
                </Grid>
                <Grid item lg={6}>
                    <GenericBoxInfo
                        title={'Business Process Management (BPM)'}
                        description={`The automation cost performance index is a ratio that measures the financial effectiveness of an automation 
                  project by dividing the future cost of work performed by the actual cost of work performed. 
                  If the result is less than 1, as in 0.5, then the project with automation is saving on budget, which is the best result. 
                  An ACPI of 1 means the project is on breakeven and can still be considered a good result as other benefits are achived with automaton. 
                  An ACPI of more than 1 means the process with automation costs more than the process without automation. 
                  This represents a risk and will result in a negative ROI and savings.`}
                        imagePath={''}
                        clickPath={''}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default CostsComparison;
