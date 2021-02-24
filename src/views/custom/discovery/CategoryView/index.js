import React from 'react';
import Page from 'components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { PATH_WIKI } from 'routes/paths';
import Table from './Table';
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

export default function CategoryView() {
    const classes = useStyles();

    return (
        <Page title="Process Taxonomy" className={classes.root}>
            <Container maxWidth="xl">
                <Table />
            </Container>
        </Page>
    );
}