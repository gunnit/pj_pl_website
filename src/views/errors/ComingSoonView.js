import React from 'react';
import Page from 'components/Page';
import Logo from 'components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
import { PATH_APP } from 'routes/paths';
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(10)
    },
    header: {
        top: 0,
        left: 0,
        lineHeight: 0,
        width: '100%',
        position: 'absolute',
        padding: theme.spacing(3, 3, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(5, 5, 0)
        }
    }
}));

// ----------------------------------------------------------------------

export default function ComingSoonView() {
    const classes = useStyles();

    return (
        <Page title="ProcessLenz | 500 Internal Server Error" className={classes.root}>
            <header className={classes.header}>
                <RouterLink to="/">
                    <Logo />
                </RouterLink>
            </header>

            <Container component="main">
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                    <Typography variant="h3" gutterBottom>
                        Coming soon!
          </Typography>
                    <Typography color="textSecondary">
                        This feature will be ready soon.
          </Typography>

                    <Box
                        component="img"
                        alt="500"
                        src="/static/images/illustrations/illustration_500.svg"
                        sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
                    />

                    <Button
                        to={PATH_APP.processes.dashboard}
                        size="large"
                        variant="contained"
                        component={RouterLink}
                    >
                        Go to Dashboard
          </Button>
                </Box>
            </Container>
        </Page>
    );
}