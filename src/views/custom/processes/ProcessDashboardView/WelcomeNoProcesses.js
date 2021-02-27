import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Card, CardContent, ButtonGroup } from '@material-ui/core';
import { PATH_APP } from 'routes/paths'


// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        backgroundColor: theme.palette.primary.lighter,
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    },
    content: {
        [theme.breakpoints.up('md')]: {
            padding: 0,
            paddingLeft: theme.spacing(5)
        }
    }
}));

// ----------------------------------------------------------------------



export default function WelcomeNoProcesses({ displayName, className, ...other }) {
    const classes = useStyles();

    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <CardContent className={classes.content}>
                <Box component="h4" sx={{ pb: 1, typography: 'h4', color: 'grey.800', mr: 1 }}>
                    Welcome, {!displayName ? '...' : displayName}. Your dashboard is almost ready!
                 </Box>

                <Box
                    component="p"
                    sx={{ typography: 'body2', color: 'grey.800', pb: { xs: 3, xl: 5 } }}
                >
                    It might look a bit empty right now, but not for long!
                    Let's get started by creating a process. To get the best experience, you should first configure your profile. It's going to be productive and fun!
                </Box>

                <ButtonGroup variant='contained'>
                    <Button variant="contained" to={PATH_APP.processes.new} component={RouterLink}>
                        Create New Process
                    </Button>
                    <Button color='warning' variant="contained" to={PATH_APP.user.objectives} component={RouterLink}>
                        Set Company Goals
                    </Button>
                </ButtonGroup>
            </CardContent>

            <Box
                component="img"
                alt="welcome"
                src="/static/images/illustrations/illustration_seo.svg"
                sx={{
                    p: 2,
                    height: 280,
                    margin: { xs: 'auto', md: 'inherit' }
                }}
            />
        </Card >
    );
}