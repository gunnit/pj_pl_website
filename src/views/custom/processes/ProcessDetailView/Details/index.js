import React from 'react';
import { Container, Grid } from '@material-ui/core';
import CustomizedStepper from './CustomizedStepper';
import ProcessNameCard from './ProcessNameCard';
import GenericBoxInfoDetails from './GenericBoxInfoDetails';
import ProcessDescription from './ProcessDescription';


export default function Details({ processDetails, totalAverageOfSubgroups }) {


    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item container xs={12} md={8} lg={8} spacing={3} alignContent='flex-start'>
                    <Grid item xs={12} md={12}>
                        <CustomizedStepper pipeline={processDetails.process.pipline} />
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
                    <Grid item xs={12} md={12} lg={12}>
                        <GenericBoxInfoDetails
                            infoType={'Automation Potential'}
                            mainNumber={totalAverageOfSubgroups}
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
                </Grid>
            </Grid>
        </Container>

    );
}