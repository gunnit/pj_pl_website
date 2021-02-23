import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Container, Grid, Button } from '@material-ui/core';
import { PATH_APP } from 'routes/paths';
import CostWithoutAutomation from './CostWithoutAutomation';
import CostWithAutomation from './CostWithAutomation';
import GenericBoxInfoCostsComparison from './GenericBoxInfoCostsComparison';
import GenericBoxInfoDevelopment from './GenericBoxInfoDevelopment';
import GenericBoxInfo from './GenericBoxInfo';
import ComparisonChartCard from './ComparisonChartCard';
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

function CostsComparison({ processDetails }) {
    const classes = useStyles();


    if (processDetails.assumptions.current_process_cost_calc === 0) {
        return (
            <Card className={classes.root}>
                <Box
                    component="img"
                    alt="welcome"
                    src={''}
                    sx={{
                        p: 2,
                        height: 205,
                        margin: { xs: 'auto', md: 'inherit' }
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        Add your current and future costs to see a breakdown and comparison of your costs and savings.
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Gain a quantitative perspective on the feasability of implementing your process with a comprehensive cost breakdown. Adding your costs will further unlock insights into quarterly and yearly projections, metrics, and different KPI's.
                    </Typography>
                </Box>
                <Button variant='contained' color='info' to={PATH_APP.processes.costAssessment} component={RouterLink}>Add Costs</Button>
            </Card>
        )
    }


    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item lg={6}>
                    <CostWithoutAutomation data={processDetails.assumptions} />
                </Grid>
                <Grid item lg={6}>
                    <CostWithAutomation data={processDetails.assumptions} />
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
