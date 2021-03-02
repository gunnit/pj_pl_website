import { Icon } from '@iconify/react';
import Page from 'components/Page';
import { capitalCase } from 'change-case';
import { PATH_APP } from 'routes/paths';
import ChangePassword from './ChangePassword';
import React, { useState, useEffect } from 'react';
import roundVpnKey from '@iconify-icons/ic/round-vpn-key';
import HeaderDashboard from 'components/HeaderDashboard';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Tab, Box, Tabs } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    tabBar: {
        marginBottom: theme.spacing(5)
    }
}));

// ----------------------------------------------------------------------

function AccountView() {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState('change_password');


    const ACCOUNT_TABS = [
        {
            value: 'change_password',
            icon: <Icon icon={roundVpnKey} width={20} height={20} />,
            component: <ChangePassword />
        }
    ];

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Page title="Account Settings" className={classes.root}>
            <Container>
                <HeaderDashboard
                    heading="Account"
                // links={[
                //     { name: 'Dashboard', href: PATH_APP.root },
                //     { name: 'Management', href: PATH_APP.management.root },
                //     { name: 'User', href: PATH_APP.management.user.root },
                //     { name: 'Account Settings' }
                // ]}
                />

                <Tabs
                    value={currentTab}
                    scrollButtons="auto"
                    variant="scrollable"
                    allowScrollButtonsMobile
                    onChange={handleChangeTab}
                    className={classes.tabBar}
                >
                    {ACCOUNT_TABS.map(tab => (
                        <Tab
                            disableRipple
                            key={tab.value}
                            label={capitalCase(tab.value)}
                            icon={tab.icon}
                            value={tab.value}
                        />
                    ))}
                </Tabs>

                {ACCOUNT_TABS.map(tab => {
                    const isMatched = tab.value === currentTab;
                    return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                })}
            </Container>
        </Page>
    );
}

export default AccountView;
