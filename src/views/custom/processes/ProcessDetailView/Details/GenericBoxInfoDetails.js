import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'utils/formatNumber';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3)
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

GenericBoxInfoDetails.propTypes = {
    className: PropTypes.string,
    numberOfItems: PropTypes.number,
    infoType: PropTypes.string,
    mainNumber: PropTypes.number,
    secondaryText: PropTypes.string,
};


function GenericBoxInfoDetails({ className, numberOfItems, infoType, mainNumber, secondaryText, ...other }) {
    const classes = useStyles();


    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom color='textSecondary'>
                    {/* {numberOfItems !== 1 ? `${numberOfItems} ${infoType}` : `${numberOfItems} ${infoType.slice(0, infoType.length - 1)}`} */}
                    {/* {`${infoType}: ${numberOfItems}`} */}
                    {infoType}
                </Typography>
                <Typography variant="h3" gutterBottom>
                    {/* {mainInfo} */}
                    {fNumber(mainNumber)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="span">
                    {secondaryText}
                </Typography>
            </Box>
        </Card>
    );
}

export default GenericBoxInfoDetails;