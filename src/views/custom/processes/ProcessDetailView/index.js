import React, { useState } from 'react';
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




// ----------------------------------------------------------------------

const SIMPLE_TAB = [
    { value: '1', icon: <PhoneIcon />, label: 'Details', disabled: false },
    { value: '2', icon: <FavoriteIcon />, label: 'Automation Potential', disabled: false },
    { value: '3', icon: <PersonPinIcon />, label: 'Costs Comparison', disabled: true },
    { value: '4', icon: <PersonPinIcon />, label: 'Break-even', disabled: true },
    { value: '5', icon: <PersonPinIcon />, label: 'Progress', disabled: true }
];


const useStyles = makeStyles(theme => ({
    root: {},
    topArea: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

function ProcessDetailView() {
    const classes = useStyles();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


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
                        {/* <MButton variant='contained'>Update Process</MButton> */}
                        <ButtonGroup variant='contained'>
                            <Button variant="contained" component={RouterLink}>
                                Update Process
                            </Button>
                            <Button color='inherit' variant="contained" component={RouterLink}>
                                Archive Process
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

export default ProcessDetailView;
