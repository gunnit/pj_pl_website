import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Card,
    Typography,
    Grid,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
} from '@material-ui/core';
import roundVerifiedUser from '@iconify-icons/ic/round-verified-user';
import clockFill from '@iconify-icons/eva/clock-fill';
import roundVerified from '@iconify-icons/ic/round-verified';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import calendarCursor from '@iconify-icons/mdi/calendar-cursor';
import databaseCog from '@iconify-icons/mdi/database-cog';
import fileDocumentMultiple from '@iconify-icons/mdi/file-document-multiple';

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



export default function ProcessDescription({
    overview,
    description,
    process_type,
    process_critical,
    nature_of_process,
    sponsor,
    owner_name,
    owner_email,
    process_SME,
    process_SME_email,
    team,
    date_created,
    test_env_available,
    process_documentation_available,
    className,
    ...other
}) {
    const classes = useStyles();


    const PROCESS_DESCRIPTION = [
        {
            title: 'Type of Business Process',
            description: process_type,
            icon: roundVerified
        },
        {
            title: 'Business Criticality',
            description: process_critical,
            icon: clockFill
        },
        {
            title: 'Nature of Process',
            description: nature_of_process,
            icon: roundVerifiedUser
        }
    ];

    const TABLE_INFO = [
        { title: 'Project Sponsor', info: sponsor },
        { title: 'Process Owner', info: owner_name },
        { title: 'Process Owner Email', info: owner_email },
        { title: 'Process SME', info: process_SME },
        { title: 'Process SME Email', info: process_SME_email },
        { title: 'Assigned Team', info: team }
    ];

    const BOTTOM = [
        {
            title: 'Date Created',
            description: date_created,
            icon: calendarCursor
        },
        {
            title: 'Test Environment Available',
            description: test_env_available,
            icon: databaseCog
        },
        {
            title: 'Documentation Available',
            description: process_documentation_available,
            icon: fileDocumentMultiple
        }
    ];



    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Grid container>
                <Grid item lg={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" gutterBottom color='textSecondary'>
                            Process Description
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {overview}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {description}
                        </Typography>
                    </Box>
                </Grid>

                {PROCESS_DESCRIPTION.map(item => (
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
                    <TableContainer
                        component={Box}
                        // sx={{ minWidth: 800, mt: 3 }}
                        className={classes.root}
                    >
                        <Table>
                            <TableBody>
                                {TABLE_INFO.map(row => (
                                    <TableRow key={row.title} className={classes.hideLastBorder}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant='subtitle2' color='textSecondary'>
                                                <Icon
                                                    icon={moreVerticalFill}
                                                    width={20}
                                                    height={20}
                                                />
                                                {row.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='subtitle2'>
                                                {row.info}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
