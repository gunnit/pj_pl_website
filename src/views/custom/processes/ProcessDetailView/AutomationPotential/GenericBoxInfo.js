import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, CardHeader } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonAnimate } from 'components/Animate';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        textDecoration: 'none',
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
        <ButtonAnimate>
            <Card className={clsx(classes.root, className)} {...other} component={RouterLink} to={clickPath}>
                {/* <CardHeader title={title} /> */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
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
        </ButtonAnimate>
    );
}

export default GenericBoxInfo;
