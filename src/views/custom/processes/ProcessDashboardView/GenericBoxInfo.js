import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ideaIcon from '@iconify-icons/el/idea';
import { fNumber, fPercent } from 'utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';
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
    },
    estimatedSavings: {
        marginBottom: theme.spacing(1)
    },
    icon: {
        width: 120,
        height: 120,
        opacity: 0.12,
        position: 'absolute',
        right: theme.spacing(-3),
        color: theme.palette.common.white
    }
}));

// ----------------------------------------------------------------------




function GenericBoxInfo({ className, numberOfItems, infoType, mainNumber, secondaryNumber, chartColor, ...other }) {
    const classes = useStyles();
    const theme = useTheme();

    const chartData = [{
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19].map(num => {
            return Math.random() * num
        })
    }];


    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                    {infoType}
                </Typography>
                <Typography variant="h3">
                    {`$${fNumber(mainNumber)}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    &nbsp;estimated savings
                </Typography>

                <div className={classes.trending}>
                    <div
                        className={clsx(classes.trendingIcon, {
                            [classes.isTrendingDown]: secondaryNumber < 0
                        })}
                    >
                        <Icon
                            width={16}
                            height={16}
                            icon={secondaryNumber >= 0 ? trendingUpFill : trendingDownFill}
                        />
                    </div>
                    <Typography variant="subtitle2" component="span">
                        {secondaryNumber > 0 && '+'}
                        {secondaryNumber}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="span">
                        &nbsp;number of processes
                    </Typography>
                </div>
            </Box>

            <Icon icon={ideaIcon} className={classes.icon} />
        </Card>
    );
}

export default GenericBoxInfo;
