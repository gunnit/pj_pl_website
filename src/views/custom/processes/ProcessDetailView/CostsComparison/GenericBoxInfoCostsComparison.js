import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { fNumber } from 'utils/formatNumber';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        width: '100%',
        height: '100%'
    },
    trending: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    trendingIcon: {
        width: 24,
        height: 24,
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing(1),
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.16)
    },
    isTrendingDown: {
        color: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.16)
    }
}));

// ----------------------------------------------------------------------

GenericInfoBoxCostsComparison.propTypes = {
    className: PropTypes.string,
    numberOfItems: PropTypes.number,
    infoType: PropTypes.string,
    mainNumber: PropTypes.number,
};


function GenericInfoBoxCostsComparison({ className, numberOfItems, infoType, mainNumber, ...other }) {
    const classes = useStyles();


    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                    {infoType}
                </Typography>
                <Typography variant="h3" gutterBottom>
                    {`$${fNumber(mainNumber)}`}
                </Typography>
                <Typography variant="subtitle2" color='textSecondary' gutterBottom>
                    per year
                </Typography>
            </Box>
        </Card>
    );
}

export default GenericInfoBoxCostsComparison;
