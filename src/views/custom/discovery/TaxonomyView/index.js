import React from 'react';
import Page from 'components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import GenericBoxInfo from './GenericBoxInfo';
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

function TaxonomyView() {
    const classes = useStyles();

    return (
        <Page title="Process Taxonomy" className={classes.root}>
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4" gutterBottom>Process Taxonomy</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Vote for the process you suggest for automation and learn from others
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Develop Vision and Strategy'}
                            imagePath={'/static/images/taxonomy/undraw_mindfulness_scgo.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Develop and Manage Products and Services'}
                            imagePath={'/static/images/taxonomy/undraw_product_teardown_elol.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Market and Sell Products and Services'}
                            imagePath={'/static/images/taxonomy/undraw_Marketing_re_7f1g.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Deliver Physical Products'}
                            imagePath={'/static/images/taxonomy/undraw_On_the_way_re_swjt.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Deliver Services'}
                            imagePath={'/static/images/taxonomy/undraw_tutorial_video_vtd1.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Manage Customer Service'}
                            imagePath={'/static/images/taxonomy/undraw_reviews_lp8w.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Develop and Manage Human Capital'}
                            imagePath={'/static/images/taxonomy/undraw_team_spirit_hrr4.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Manage Information Technology (IT)'}
                            imagePath={'/static/images/taxonomy/undraw_programming_2svr.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Manage Financial Resources'}
                            imagePath={'/static/images/taxonomy/undraw_predictive_analytics_kf9n.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Acquire, Construct, and Manage Assets'}
                            imagePath={'/static/images/taxonomy/undraw_add_to_cart_vkjp.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Manage Enterprise Risk, Compliance, Remediation, and Resiliency'}
                            imagePath={'/static/images/taxonomy/undraw_warning_cyit.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Manage External Relationships'}
                            imagePath={'/static/images/taxonomy/undraw_word_of_mouth_v1j9.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Develop and Manage Business Capabilities'}
                            imagePath={'/static/images/taxonomy/undraw_Business_plan_re_0v81.svg'}
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'Search all Processes'}
                            imagePath={'/static/images/taxonomy/undraw_clean_up_ucm0.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'View per Process Groups'}
                            imagePath={'/static/images/taxonomy/undraw_Mind_map_re_nlb6.svg'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo
                            description={'View only Processes'}
                            imagePath={'/static/images/taxonomy/undraw_career_development_oqcb.svg'}
                        />
                    </Grid> */}
                </Grid>
            </Container>
        </Page>
    );
}

export default TaxonomyView;
