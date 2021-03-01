import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import React, { useState, useContext, useEffect } from 'react';
import Page from 'components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Container, Box, Button, ButtonGroup, Tooltip } from '@material-ui/core';
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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssessmentIcon from '@material-ui/icons/Assessment';


const notIdeaTabs = [
    { value: '1', icon: <PhoneIcon />, label: 'Details' },
    { value: '2', icon: <FavoriteIcon />, label: 'Automation Potential' },
    { value: '3', icon: <PersonPinIcon />, label: 'Costs Comparison' },
    { value: '4', icon: <PersonPinIcon />, label: 'Break-even' },
    { value: '5', icon: <PersonPinIcon />, label: 'Progress' }
];

const ideaTabs = [
    { value: '1', icon: <PhoneIcon />, label: 'Details' },
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

    const [processDetails, setProcessDetails] = useState(null)
    const [stage, setStage] = useState(null)
    const [error, setError] = useState(false)
    const { userId, currentProcessId } = useContext(Context)

    useEffect(() => {

        try {
            let storedProcessId;

            if (!currentProcessId) {
                storedProcessId = localStorage.getItem('currentProcessId')
                // If there is no currentProcessId in context or local storage, the page cannot load
                if (!storedProcessId) {
                    throw storedProcessId
                }
            }


            if ((currentProcessId || storedProcessId) && userId) {

                (async function () {

                    const token = await firebase.auth().currentUser.getIdToken(true);

                    const res = await fetch(`${apiBaseUrl}/process_view/${currentProcessId || storedProcessId}`, {
                        headers: {
                            'Authorization': token
                        }
                    })
                    if (res.ok) {
                        const processDetails = await res.json()
                        setProcessDetails(processDetails)
                        setStage(processDetails.process.pipline)
                    } else {
                        throw res
                    }

                })()
            }
        } catch (e) {
            setError(true)
        }


    }, [currentProcessId, userId])

    if (error) {
        return <Page500View />
    }

    if (!processDetails || !stage) {
        return <LoadingScreen />
    }

    // Idea: Details and Progress, next step move to pipeline, side thing with alignment with company objectives, initial assessment criteria
    // Pipeline: all tabs, next step take automation assessment, process operating metrics
    // Development:
    // Production:


    return (
        <Page title="Process Details" className={classes.root}>
            <Container maxWidth="xl">
                <TabContext value={value}>
                    <Box sx={{ pb: 5 }} className={classes.topArea}>
                        {stage !== 'Idea'
                            && <TabList onChange={handleChange}>
                                {notIdeaTabs.map(tab => (
                                    <Tab
                                        key={tab.value}
                                        label={tab.label}
                                        value={tab.value}
                                    />
                                ))}
                            </TabList>}
                        {stage === 'Idea'
                            && <TabList onChange={handleChange}>
                                {ideaTabs.map(tab => (
                                    <Tab
                                        key={tab.value}
                                        label={tab.label}
                                        value={tab.value}
                                    />
                                ))}
                            </TabList>}
                        <ButtonGroup>
                            <Tooltip title="Update Process Details" arrow placement='top'>
                                <Button variant="contained" color='secondary' component={RouterLink} to={PATH_APP.processes.update}>
                                    <EditIcon />
                                    {/* Update Process */}
                                </Button>
                            </Tooltip>
                            <Tooltip title="Update Automation Assessment" arrow placement='top'>
                                <Button variant="contained" color='inherit' component={RouterLink} to={PATH_APP.processes.automationAssessment}>
                                    {/* Update Automation Assessment */}
                                    <AssessmentIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Update Costs" arrow placement='top'>
                                <Button variant="contained" color='warning' component={RouterLink} to={PATH_APP.processes.costAssessment}>
                                    {/* Update Costs */}
                                    <AttachMoneyIcon />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </Box>
                    <TabPanel value={'1'}>
                        <Details
                            processDetails={processDetails}
                            setProcessDetails={setProcessDetails}
                            stage={stage}
                            setStage={setStage}
                        />
                    </TabPanel>
                    <TabPanel value={'2'}>
                        <AutomationPotential processDetails={processDetails} />
                    </TabPanel>
                    <TabPanel value={'3'}>
                        <CostsComparison processDetails={processDetails} />
                    </TabPanel>
                    <TabPanel value={'4'}>
                        <BreakEven processDetails={processDetails} />
                    </TabPanel>
                    <TabPanel value={'5'}>
                        <Progress processDetails={processDetails} />
                    </TabPanel>
                </TabContext>
            </Container>
        </Page>
    );
}
