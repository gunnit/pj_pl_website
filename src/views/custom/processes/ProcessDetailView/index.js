import React, { useState, useContext, useEffect } from 'react';
import Page from 'components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Container, Box, Button, ButtonGroup } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Details from './Details';
import AutomationPotential from './AutomationPotential';
import CostsComparison from './CostsComparison';
import BreakEven from './BreakEven';
import Progress from './Progress';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import { PATH_APP } from 'routes/paths';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import Page500View from 'views/errors/Page500View';
import LoadingScreen from 'components/LoadingScreen';


const SIMPLE_TAB = [
    { value: '1', icon: <PhoneIcon />, label: 'Details' },
    { value: '2', icon: <FavoriteIcon />, label: 'Automation Potential' },
    { value: '3', icon: <PersonPinIcon />, label: 'Costs Comparison' },
    { value: '4', icon: <PersonPinIcon />, label: 'Break-even' },
    { value: '5', icon: <PersonPinIcon />, label: 'Progress' }
];


const useStyles = makeStyles(theme => ({
    root: {},
    topArea: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default function ProcessDetailView() {
    const classes = useStyles();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [ideas, setIdeas] = useState(null)
    const [error, setError] = useState(false)
    const { userId } = useContext(Context)

    // useEffect(() => {

    //     if (!ideas && userId) {

    //         // (async function () {
    //         //     try {
    //         //         const res = await fetch(`${apiBaseUrl}/ideas/${processId}`)

    //         //         setIdeas(await res.json())
    //         //     } catch (e) {
    //         //         setError(true)
    //         //     }
    //         // })()
    //     }

    // }, [ideas, userId])

    // if (error) {
    //     return <Page500View />
    // }

    // if (!ideas) {
    //     return <LoadingScreen />
    // }


    return (
        <Page title="Dashboard" className={classes.root}>
            <Container maxWidth="xl">
                <TabContext value={value}>
                    <Box sx={{ pb: 5 }} className={classes.topArea}>
                        <TabList onChange={handleChange}>
                            {SIMPLE_TAB.map(tab => (
                                <Tab
                                    key={tab.value}
                                    label={tab.label}
                                    value={tab.value}
                                />
                            ))}
                        </TabList>
                        <ButtonGroup variant='contained'>
                            <Button variant="contained" color='info' component={RouterLink} to={PATH_APP.processes.update}>
                                <EditIcon />
                                {/* Update Process */}
                            </Button>
                            <Button color='inherit' variant="contained" component={RouterLink} to={''}>
                                <ArchiveIcon />
                                {/* Archive Process */}
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <TabPanel value={'1'}>
                        <Details />
                    </TabPanel>
                    <TabPanel value={'2'}>
                        <AutomationPotential />
                    </TabPanel>
                    <TabPanel value={'3'}>
                        <CostsComparison />
                    </TabPanel>
                    <TabPanel value={'4'}>
                        <BreakEven />
                    </TabPanel>
                    <TabPanel value={'5'}>
                        <Progress />
                    </TabPanel>
                </TabContext>
            </Container>
        </Page>
    );
}