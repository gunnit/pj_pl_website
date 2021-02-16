import React from 'react';
import Page from 'components/Page';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid, Card, CardHeader, Box, CardContent, Button, Typography } from '@material-ui/core';
import RadarChart from './RadarChart';
import CategoryRatings from './CategoryRatings';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles(theme => ({
    root: {},
}));

export default function AssessmentListView() {
    const classes = useStyles();

    const title = 'Assessment title'

    return (
        <Page title="Assessment List" className={classes.root}>
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4" gutterBottom>
                        Assessment List
                     </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Keep track of how your group evolves over time
                    </Typography>
                </Box>
                <Card>
                    <CardHeader title={title} />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <CategoryRatings />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6.75}>
                                <RadarChart />
                            </Grid>
                            <Grid item container md={1.25} lg={1.25} alignContent='space-around'>
                                <Grid item lg={12}>
                                    <Button variant='contained'>
                                        <EditIcon />
                                    </Button>
                                </Grid>
                                <Grid item lg={12}>
                                    <Button variant='contained'>
                                        <EditIcon />
                                    </Button>
                                </Grid>
                                <Grid item lg={12}>
                                    <Button variant='contained'>
                                        <EditIcon />
                                    </Button>
                                </Grid>
                                <Grid item lg={12}>
                                    <Button variant='contained'>
                                        <EditIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Container>
        </Page>
    );
}
