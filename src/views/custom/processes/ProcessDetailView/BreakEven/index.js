import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import BreakEvenAnalysis from './BreakEvenAnalysis';
import ThreeYearProjectionsTable from './ThreeYearProjectionsTable';
import GenericBoxInfoProduction from './GenericBoxInfoProduction';
import MixedChart from './MixedChart';
import ThreeYearROI from './ThreeYearROI';
import QuarterlyCashFlow from './QuarterlyCashFlow';


const useStyles = makeStyles(theme => ({
    root: {}
}));

export default function BreakEven({ processDetails }) {
    const classes = useStyles();
    // const { auth, profile } = useSelector(state => state.firebase);
    // const displayName = auth.displayName || profile.displayName;

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                {/* <Grid item lg={12}>
                    <BarChart />
                </Grid> */}
                <Grid item xs={12} lg={3}>
                    <GenericBoxInfoProduction infoType={'ROI Year 1'} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <GenericBoxInfoProduction infoType={'ROI Year 2'} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <GenericBoxInfoProduction infoType={'ROI Year 3'} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <GenericBoxInfoProduction infoType={'Savings After 3 Years'} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <GenericBoxInfoProduction infoType={'FTE Savings'} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <GenericBoxInfoProduction infoType={'Hours Returned to Business'} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <GenericBoxInfoProduction infoType={'Net Present Value'} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <GenericBoxInfoProduction infoType={'Hours Saved (Yearly)'} />
                </Grid>
                <Grid item xs={12}>
                    <QuarterlyCashFlow data={processDetails.quarter} />
                </Grid>
                <Grid item xs={12}>
                    <BreakEvenAnalysis data={processDetails.quarter} />
                </Grid>
                <Grid item xs={12}>
                    <ThreeYearProjectionsTable data={processDetails.year} />
                </Grid>
                <Grid item xs={12}>
                    <MixedChart data={processDetails.year} />
                </Grid>
                <Grid item xs={12}>
                    <ThreeYearROI data={{
                        year_1_saving_cumulative: processDetails.year_1_saving_cumulative,
                        year_2_saving_cumulative: processDetails.year_2_saving_cumulative,
                        year_3_saving_cumulative: processDetails.year_3_saving_cumulative,
                    }} />
                </Grid>
            </Grid>
        </Container>
    );
}