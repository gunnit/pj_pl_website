import 'firebase/auth';
import firebase from 'firebase/app';
import React, { useState, useEffect, useContext } from 'react';
import Page from 'components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { PATH_WIKI } from 'routes/paths';
import Table from './Table';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import Page500View from 'views/errors/Page500View';
import LoadingScreen from 'components/LoadingScreen';
import TopCard from './TopCard';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

export default function CategoryView() {
    const classes = useStyles();

    const { currentTaxonomy } = useContext(Context)

    const [error, setError] = useState(false)
    const [glossary, setGlossary] = useState(null)

    useEffect(() => {

        try {

            (async function () {
                let storedTaxonomy;
                if (!currentTaxonomy) {
                    storedTaxonomy = localStorage.getItem('currentTaxonomy')
                }

                const token = await firebase.auth().currentUser.getIdToken(true);


                const res = await fetch(`${apiBaseUrl}/wiki/${currentTaxonomy || storedTaxonomy}`, {
                    headers: {
                        'Authorization': token
                    }
                })

                if (!res.ok) {

                    throw res
                }

                // const { glossary } = await res.json()

                setGlossary((await res.json()).glossary)

            })()

        } catch (e) {
            setError(true)
        }


    }, [currentTaxonomy])

    if (error) {
        return <Page500View />
    }

    if (!glossary) {
        return <LoadingScreen />
    }

    return (
        <Page title="Process Taxonomy" className={classes.root}>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TopCard title={glossary[0].process_type} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Table glossary={glossary} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}