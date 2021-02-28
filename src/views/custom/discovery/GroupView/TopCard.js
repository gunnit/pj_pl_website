import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Box, Typography, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));



const matchPicture = {
    1: '/static/images/taxonomy/undraw_mindfulness_scgo.svg',
    2: '/static/images/taxonomy/undraw_product_teardown_elol.svg',
    3: '/static/images/taxonomy/undraw_Marketing_re_7f1g.svg',
    4: '/static/images/taxonomy/undraw_On_the_way_re_swjt.svg',
    5: '/static/images/taxonomy/undraw_tutorial_video_vtd1.svg',
    6: '/static/images/taxonomy/undraw_reviews_lp8w.svg',
    7: '/static/images/taxonomy/undraw_team_spirit_hrr4.svg',
    8: '/static/images/taxonomy/undraw_programming_2svr.svg',
    9: '/static/images/taxonomy/undraw_predictive_analytics_kf9n.svg',
    10: '/static/images/taxonomy/undraw_add_to_cart_vkjp.svg',
    11: '/static/images/taxonomy/undraw_warning_cyit.svg',
    12: '/static/images/taxonomy/undraw_word_of_mouth_v1j9.svg',
    13: '/static/images/taxonomy/undraw_Business_plan_re_0v81.svg',
    14: '/static/images/taxonomy/undraw_clean_up_ucm0.svg',
    15: '/static/images/taxonomy/undraw_Mind_map_re_nlb6.svg',
    16: '/static/images/taxonomy/undraw_career_development_oqcb.svg',
}


export default function TopCard({ hierarchy_id, title, body, }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader title={`${hierarchy_id} - ${title}`} />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={8} lg={8}>
                        <Typography>
                            {body}
                        </Typography>
                    </Grid>
                    <Grid item md={4} lg={4}>
                        <Box
                            component="img"
                            alt="welcome"
                            // Gets picture based on first number of hierarchy ID
                            src={matchPicture[hierarchy_id.split('.')[0]]}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}