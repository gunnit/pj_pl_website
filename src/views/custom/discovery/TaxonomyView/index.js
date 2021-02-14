import React from 'react';
import Page from '~/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import GenericBoxInfo from './GenericBoxInfo';
import { PATH_WIKI } from '~/routes/paths';
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
                        <GenericBoxInfo description={'Develop Vision and Strategy'} imagePath={'/static/icons/taxonomy/undraw_mindfulness_scgo.svg'} clickPath={PATH_WIKI.developVisionAndStrategy} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Develop and Manage Products and Services'} imagePath={'/static/icons/taxonomy/undraw_product_teardown_elol.svg'} clickPath={PATH_WIKI.developManageProductsServices} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Market and Sell Products'} imagePath={'/static/icons/taxonomy/undraw_Marketing_re_7f1g.svg'} clickPath={PATH_WIKI.marketSellProducts} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Deliver Physical Products'} imagePath={'/static/icons/taxonomy/undraw_On_the_way_re_swjt.svg'} clickPath={PATH_WIKI.deliverPhysicalProducts} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Deliver Services'} imagePath={'/static/icons/taxonomy/undraw_tutorial_video_vtd1.svg'} clickPath={PATH_WIKI.deliverServices} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Manage Customer Service'} imagePath={'/static/icons/taxonomy/undraw_reviews_lp8w.svg'} clickPath={PATH_WIKI.manageCustomerService} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Develop and Manage Human Capital'} imagePath={'/static/icons/taxonomy/undraw_team_spirit_hrr4.svg'} clickPath={PATH_WIKI.developManageHumanCapital} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Manage Information Technology (IT)'} imagePath={'/static/icons/taxonomy/undraw_programming_2svr.svg'} clickPath={PATH_WIKI.manageInformationTechnology} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Manage Financial Resources'} imagePath={'/static/icons/taxonomy/undraw_predictive_analytics_kf9n.svg'} clickPath={PATH_WIKI.manageFinancialResources} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Acquire, Construct, and Manage Assets'} imagePath={'/static/icons/taxonomy/undraw_add_to_cart_vkjp.svg'} clickPath={PATH_WIKI.acquireConstructManageAssets} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Manage Enterprise Risk, Compliance, Remediation, and Resiliency'} imagePath={'/static/icons/taxonomy/undraw_warning_cyit.svg'} clickPath={PATH_WIKI.manageEnterpriseRiskCompliance} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Manage External Relationships'} imagePath={'/static/icons/taxonomy/undraw_word_of_mouth_v1j9.svg'} clickPath={PATH_WIKI.manageExternalRelationships} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Develop and Manage Business Capabilities'} imagePath={'/static/icons/taxonomy/undraw_Business_plan_re_0v81.svg'} clickPath={PATH_WIKI.developManageBusinessCapabilities} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'Search all Processes'} imagePath={'/static/icons/taxonomy/undraw_clean_up_ucm0.svg'} clickPath={PATH_WIKI.searchAllProcesses} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'View per Process Groups'} imagePath={'/static/icons/taxonomy/undraw_Mind_map_re_nlb6.svg'} clickPath={PATH_WIKI.viewProcessGroups} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <GenericBoxInfo description={'View only Processes'} imagePath={'/static/icons/taxonomy/undraw_career_development_oqcb.svg'} clickPath={PATH_WIKI.viewOnlyProcesses} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default TaxonomyView;
