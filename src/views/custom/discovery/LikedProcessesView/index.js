import 'firebase/auth';
import firebase from 'firebase/app';
import React, { useState, useEffect, useContext } from 'react';
import Page from 'components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Table from './Table';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import Page500View from 'views/errors/Page500View';
import LoadingScreen from 'components/LoadingScreen';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

export default function LikedProcessesView() {
    const classes = useStyles();

    const { userId } = useContext(Context)

    const [error, setError] = useState(false)
    const [liked, setLiked] = useState(null)


    useEffect(() => {


        if (userId) {
            (async function () {

                try {

                    const token = await firebase.auth().currentUser.getIdToken(true);

                    const res = await fetch(`${apiBaseUrl}/liked-processes/${userId}`, {
                        headers: {
                            'Authorization': token
                        }
                    })

                    if (!res.ok) {
                        throw res
                    }

                    setLiked((await res.json()).liked)
                    // console.log(await res.json())
                } catch (e) {
                    setError(true)
                }
            })()

        }


    }, [userId])

    if (error) {
        return <Page500View />
    }

    if (!liked) {
        return <LoadingScreen />
    }


    return (
        <Page title="Liked Process Taxonomy" className={classes.root}>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Table glossary={liked} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}