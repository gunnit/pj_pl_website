import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Container, Grid, Button } from '@material-ui/core';
import CustomizedStepper from './CustomizedStepper';
import ProcessNameCard from './ProcessNameCard';
import GenericBoxInfoDetails from './GenericBoxInfoDetails';
import ProcessDescription from './ProcessDescription';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import SideContent from './SideContent';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));


export default function Details({ processDetails, setProcessDetails }) {

    const classes = useStyles()

    // Need this to be a hook so it can be updated when the stage changes without having to reload the whole page
    const [stage, setStage] = useState(processDetails.process.pipline)

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item container xs={12} md={8} lg={8} spacing={3} alignContent='flex-start'>
                    <Grid item xs={12} md={12}>
                        <CustomizedStepper
                            pipeline={processDetails.process.pipline}
                            process_name={processDetails.process.process_name}
                            stage={stage}
                            setStage={setStage}
                            setProcessDetails={setProcessDetails}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <ProcessNameCard
                            process_name={processDetails.process.process_name}
                            process_L2_process_name={processDetails.process.process_L2_process_name}
                        />
                    </Grid>
                    <Grid item md={12} lg={12}>
                        <ProcessDescription
                            overview={processDetails.process.overview}
                            description={processDetails.process.description}
                            process_type={processDetails.process.process_type}
                            process_critical={processDetails.process.process_critical}
                            nature_of_process={processDetails.process.nature_of_process}
                            sponsor={processDetails.process.sponsor}
                            owner_name={processDetails.process.owner_name}
                            owner_email={processDetails.process.owner_email}
                            process_SME={processDetails.process.process_SME}
                            process_SME_email={processDetails.process.process_SME_email}
                            team={processDetails.process.team}
                            date_created={processDetails.process.date_created}
                            test_env_available={processDetails.process.test_env_available}
                            process_documentation_available={processDetails.process.process_documentation_available}
                        />
                    </Grid>
                </Grid>
                <Grid item container spacing={3} xs={12} sm={4} md={4} lg={4} alignContent='flex-start'>
                    <SideContent processDetails={processDetails} stage={stage} />
                </Grid>
            </Grid>
        </Container>

    );
}