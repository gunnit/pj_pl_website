import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Grid } from '@material-ui/core';
import roundVerifiedUser from '@iconify-icons/ic/round-verified-user';
import clockFill from '@iconify-icons/eva/clock-fill';
import roundVerified from '@iconify-icons/ic/round-verified';
import BasicTable from './BasicTable';


const PRODUCT_DESCRIPTION = [
    {
        title: 'Type of Business Process',
        description: 'Development',
        icon: roundVerified
    },
    {
        title: 'Business Criticality',
        description: 'Moderate',
        icon: clockFill
    },
    {
        title: 'Nature of Process',
        description: 'Entirely repetitive',
        icon: roundVerifiedUser
    }
];

const BOTTOM = [
    {
        title: 'Date Created',
        description: 'Wed, Feb 10 2021 - 21:55:48',
        icon: roundVerified
    },
    {
        title: 'Test Environment Available',
        description: 'Not sure',
        icon: clockFill
    },
    {
        title: 'Documentation Available',
        description: 'No',
        icon: roundVerifiedUser
    }
];

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
    divider: {
        padding: theme.spacing(2),
    },
    icon: {
        margin: 'auto',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        width: theme.spacing(8),
        justifyContent: 'center',
        height: theme.spacing(8),
        marginBottom: theme.spacing(3),
        color: '#919EAB',
        backgroundColor: `${alpha('#919EAB', 0.08)}`
    },
}));

// ----------------------------------------------------------------------



export default function ProcessDescription({ className, ...other }) {
    const classes = useStyles();


    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Grid container>
                <Grid item lg={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" gutterBottom color='textSecondary'>
                            Process Description
                </Typography>
                        <Typography variant="body1" gutterBottom>
                            Overview overview overview
                </Typography>
                        <Typography variant="body1" gutterBottom>
                            Description Description Description Description Description Description Description Description Description Description Description
                </Typography>
                        {/* <Divider className={classes.divider} /> */}
                    </Box>
                </Grid>

                {PRODUCT_DESCRIPTION.map(item => (
                    <Grid item xs={12} md={4} key={item.title}>
                        <Box
                            sx={{
                                my: 5,
                                mx: 'auto',
                                maxWidth: 280,
                                textAlign: 'center'
                            }}
                        >
                            <div className={classes.icon}>
                                <Icon icon={item.icon} width={36} height={36} />
                            </div>
                            <Typography variant="subtitle1" gutterBottom color='textSecondary'>
                                {item.title}
                            </Typography>
                            <Typography>
                                {item.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
                {/* <Grid item lg={12}>
                    <Divider className={classes.divider} />
                </Grid> */}
                <Grid item lg={12}>
                    <BasicTable />
                </Grid>

                {BOTTOM.map(item => (
                    <Grid item xs={12} md={4} key={item.title}>
                        <Box
                            sx={{
                                my: 5,
                                mx: 'auto',
                                maxWidth: 280,
                                textAlign: 'center'
                            }}
                        >
                            {/* <div className={classes.icon}>
                                <Icon icon={item.icon} width={36} height={36} />
                            </div> */}
                            <Typography variant="subtitle1" gutterBottom color='textSecondary'>
                                {item.title}
                            </Typography>
                            <Typography>
                                {item.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid >
        </Card >
    );
}
