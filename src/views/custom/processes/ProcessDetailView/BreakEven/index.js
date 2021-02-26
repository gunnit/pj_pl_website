import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import BreakEvenAnalysis from './BreakEvenAnalysis';
import ThreeYearProjectionsTable from './ThreeYearProjectionsTable';
import MoneyBox from './MoneyBox';
import NotMoneyBox from './NotMoneyBox';
import ThreeYearProjectionsChart from './ThreeYearProjectionsChart';
import ThreeYearROI from './ThreeYearROI';
import QuarterlyCashFlow from './QuarterlyCashFlow';


const useStyles = makeStyles(theme => ({
    root: {}
}));

export default function BreakEven({ processDetails }) {
    const classes = useStyles();


    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item xs={12} lg={3}>
                    <MoneyBox infoType={'ROI Year 1'} mainNumber={processDetails.roi_y1} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <MoneyBox infoType={'ROI Year 2'} mainNumber={processDetails.roi_y2} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <MoneyBox infoType={'ROI Year 3'} mainNumber={processDetails.roi_y3} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <MoneyBox infoType={'Savings After 3 Years'} mainNumber={processDetails.year_1_saving_cumulative} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <MoneyBox infoType={'FTE Savings'} mainNumber={processDetails.year_2_saving_cumulative} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <MoneyBox infoType={'Hours Returned to Business'} mainNumber={processDetails.year_3_saving_cumulative} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <MoneyBox infoType={'Net Present Value'} mainNumber={processDetails.net_benefit} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <NotMoneyBox infoType={'Hours Saved (Yearly)'} mainNumber={processDetails.process_hours_saved} />
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
                    <ThreeYearProjectionsChart data={processDetails.year} />
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