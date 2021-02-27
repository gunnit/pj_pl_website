import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Box, Typography, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

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
                            src="/static/images/taxonomy/undraw_programming_2svr.svg"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}