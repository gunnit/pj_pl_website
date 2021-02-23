import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonAnimate } from 'components/Animate';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(3),
        textDecoration: 'none',
        width: '100%',
        height: '100%',
    },
    buttonAnimate: {
        width: '100%',
        height: '100%',
    }
}));

// ----------------------------------------------------------------------


export default function BottomCard({ title, description, imagePath, clickPath, className, ...other }) {
    const classes = useStyles();

    return (
        <ButtonAnimate className={classes.buttonAnimate}>
            <Card className={clsx(classes.root, className)} {...other} component={RouterLink} to={clickPath}>
                <Box
                    component="img"
                    alt="welcome"
                    src={imagePath}
                    sx={{
                        p: 2,
                        height: 205,
                        margin: { xs: 'auto', md: 'inherit' }
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {description}
                    </Typography>
                </Box>
            </Card>
        </ButtonAnimate>
    );
}
