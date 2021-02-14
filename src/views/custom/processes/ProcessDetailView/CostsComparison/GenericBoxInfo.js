import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
}));

// ----------------------------------------------------------------------

GenericBoxInfo.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    imagePath: PropTypes.string,
    clickPath: PropTypes.string,
};


function GenericBoxInfo({ className, title, description, imagePath, clickPath, ...other }) {
    const classes = useStyles();


    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {description}
                </Typography>
            </Box>
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
        </Card>
    );
}

export default GenericBoxInfo;
