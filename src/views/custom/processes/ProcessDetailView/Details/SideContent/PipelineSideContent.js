import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Card, Typography, Container, Grid, Button, Dialog, DialogTitle,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import 'firebase/auth';
import firebase from 'firebase/app';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import GenericBoxInfoDetails from '../GenericBoxInfoDetails';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));

export default function PipelineSideContent({ processDetails }) {

    const classes = useStyles()

    const { currentProcessId, setProcessCounts } = useContext(Context)


    const [openDialog, setOpenDialog] = useState(false)


    if (!processDetails.scores.length) {

        return (
            <Grid item xs={12} md={12} lg={12}>
                <Card className={classes.root}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            Next step:
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Take the automation potential assessment to get the process automation score. This score will tell you the potential for automation of the process.
                    </Typography>
                    </Box>
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
                    <Button variant='contained' color='inherit' to={PATH_APP.processes.automationAssessment} component={RouterLink}>Take Assessment</Button>
                </Card>
            </Grid>
        )
    }

    // if haven't taken cost assessment
    if (processDetails.assumptions.current_process_cost_calc === 0) {
        return (
            <>
                <Grid item xs={12} md={12} lg={12}>
                    <GenericBoxInfoDetails
                        infoType={'Automation Potential'}
                        mainNumber={processDetails.process.average_automation_score}
                        secondaryText={'score'}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Card className={classes.root}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Next step:
                        </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Take the cost assessment to confirm the costs of the process.
                    </Typography>
                        </Box>
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
                        <Button variant='contained' color='warning' to={PATH_APP.processes.costAssessment} component={RouterLink}>Add Costs</Button>
                    </Card>
                </Grid>
            </>
        )
    }

    return (
        <>
            <Grid item xs={12} md={12} lg={12}>
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
            </Grid>
        </>
    )

}