import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Container, Grid, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import IdeaSideContent from './IdeaSideContent';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));


export default function SideContent({ processDetails, stage }) {

    const classes = useStyles()



    if (stage === 'Idea') {
        return (
            <IdeaSideContent processDetails={processDetails} />
        )
    }

    if (stage === 'Pipeline') {
        return (
            <div>Pipeline side content</div>
        )
    }

    return (
        <>
            {/* <Grid item xs={12} md={12} lg={12}>
                <GenericBoxInfoDetails
                    infoType={'Automation Potential'}
                    mainNumber={processDetails.process.average_automation_score}
                    secondaryText={'score'}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <GenericBoxInfoDetails
                    infoType={'Hours Saved'}
                    mainNumber={processDetails.total_FTE_saved}
                    secondaryText={'(in FTE) per year'}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <GenericBoxInfoDetails
                    infoType={'Potential Savings'}
                    mainNumber={processDetails.assumptions.process_net_benefit} // ? check this
                    secondaryText={'per year'}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <GenericBoxInfoDetails
                    infoType={'Cost With Automation'}
                    mainNumber={processDetails.assumptions.tot_future_process_cost}
                    secondaryText={'per year'}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <GenericBoxInfoDetails
                    infoType={'Cost Without Automation'}
                    mainNumber={processDetails.assumptions.current_process_cost_calc}
                    secondaryText={'per year'}
                />
            </Grid> */}
        </>
    );
}