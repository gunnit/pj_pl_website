import 'firebase/auth';
import firebase from 'firebase/app';
import React, { useState, useEffect, useContext } from 'react';
import Page from 'components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';
import Page500View from 'views/errors/Page500View';
import LoadingScreen from 'components/LoadingScreen';
import ListCard from './ListCard';
import TopCard from './TopCard';
import MetricCard from './MetricCard';
import PictureCard from './PictureCard';
import Breadcrumbs from './Breadcrumbs';
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {}
}));

export default function GroupView() {
    const classes = useStyles();

    const { taxonomyGroupId } = useContext(Context)

    const [error, setError] = useState(false)
    const [group, setGroup] = useState(null)
    const [previousGroups, setPreviousGroups] = useState([])

    useEffect(() => {


        try {

            (async function () {
                let storedTaxonomyGroupId;
                if (!taxonomyGroupId) {
                    storedTaxonomyGroupId = localStorage.getItem('taxonomyGroupId')
                }

                const token = await firebase.auth().currentUser.getIdToken(true);


                const res = await fetch(`${apiBaseUrl}/metric/${taxonomyGroupId || storedTaxonomyGroupId}`, {
                    headers: {
                        'Authorization': token
                    }
                })

                if (!res.ok) {
                    throw res
                }
                const group = await res.json()
                setGroup(group)

                window.scrollTo(0, 0)

            })()

        } catch (e) {
            setError(true)
        }



    }, [taxonomyGroupId])

    if (error) {
        return <Page500View />
    }

    if (!group) {
        return <LoadingScreen />
    }



    return (
        <Page title="Process Taxonomy" className={classes.root}>
            <Container maxWidth="xl">

                <Grid container spacing={3}>
                    <Grid item>
                        <Breadcrumbs
                            process_type={group.glossary.process_type}
                            hierarchy_id={group.glossary.hierarchy_id}
                            previousGroups={previousGroups}
                            setPreviousGroups={setPreviousGroups}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TopCard hierarchy_id={group.glossary.hierarchy_id} title={group.glossary.process_element} body={group.glossary.definition} />
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={3}>
                        {!group.metrics.length
                            ? <Grid item xs={12} sm={12} md={12} lg={12} spacing={3}>
                                <Typography variant='h4'>No metrics found</Typography>
                            </Grid>
                            : <>
                                <Grid item xs={12} sm={12} md={12} lg={12} spacing={3}>
                                    <Typography variant='h4'>Metrics</Typography>
                                </Grid>
                                {group.metrics.map(({ metric_name, formula, formula_units }) => {
                                    return (
                                        <Grid key={metric_name} item xs={12} sm={12} md={12} lg={12}>
                                            <MetricCard
                                                metric_name={metric_name}
                                                formula={formula}
                                                formula_units={formula_units}
                                            />
                                        </Grid>
                                    )
                                })}
                            </>}
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={3}>

                        {!group.query_glossary_process_group.length
                            ? <Grid item xs={12} sm={12} md={12} lg={12} spacing={3}>
                                <Typography variant='h4'>No related processes found</Typography>
                            </Grid>
                            : <>
                                <Grid item xs={12} sm={12} md={12} lg={12} spacing={3}>
                                    <Typography variant='h4'>Related processes</Typography>
                                </Grid>
                                {group.query_glossary_process_group.map(({ hierarchy_id, process_element_id, process_element, definition }) => {
                                    return (
                                        <Grid item xs={12} sm={12} md={4} lg={4} spacing={3}>
                                            <PictureCard
                                                hierarchy_id={hierarchy_id}
                                                process_element_id={process_element_id}
                                                title={process_element}
                                                body={definition}
                                                currentGroup={group.glossary}
                                                setPreviousGroups={setPreviousGroups}
                                            />
                                        </Grid>
                                    )
                                })}
                            </>
                        }
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
}