import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { MotionContainer, varBounce, varBounceIn } from 'components/Animate';
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

export default function NoProcesses({ primaryText, secondaryText }) {
    const classes = useStyles();

    return (
        <Container>
            <MotionContainer initial="initial" open>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                    <motion.div variants={varBounce}>
                        <Typography variant="h3" gutterBottom>
                            {primaryText}
                        </Typography>
                    </motion.div>
                    <Typography color="textSecondary">
                        {secondaryText}
                    </Typography>
                    <Box
                        component={motion.img}
                        variants={varBounceIn}
                        alt="Inser a process"
                        src="/static/images/illustrations/illustration_maintenance.svg"
                        sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
                    />
                    <Button
                        to={PATH_APP.processes.new}
                        size="large"
                        variant="contained"
                        component={RouterLink}
                    >
                        New Process
                    </Button>
                </Box>
            </MotionContainer>
        </Container>
    );
}
