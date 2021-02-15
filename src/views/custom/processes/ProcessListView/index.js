import React from 'react';
import Page from 'components/Page';
import Ideas from './Ideas';
import Pipeline from './Pipeline';
import Development from './Development';
import Production from './Production';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import Table from './Table'
import { ButtonAnimate } from 'components/Animate';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    buttonAnimate: {
        width: '100%'
    }
}));

function ProcessListView() {
    const classes = useStyles();

    return (
        <Page title="All Processes" className={classes.root}>
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">All Processes</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <ButtonAnimate className={classes.buttonAnimate}>
                            <Ideas />
                        </ButtonAnimate>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <ButtonAnimate className={classes.buttonAnimate}>
                            <Pipeline />
                        </ButtonAnimate>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <ButtonAnimate className={classes.buttonAnimate}>
                            <Development />
                        </ButtonAnimate>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <ButtonAnimate className={classes.buttonAnimate}>
                            <Production />
                        </ButtonAnimate>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Table />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default ProcessListView;
