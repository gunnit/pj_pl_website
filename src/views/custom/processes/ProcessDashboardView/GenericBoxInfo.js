import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';
import { fNumber } from 'utils/formatNumber';
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
    },
    estimatedSavings: {
        marginBottom: theme.spacing(1)
    },
    icon: {
        width: 120,
        height: 120,
        opacity: 0.6,
        position: 'absolute',
        right: theme.spacing(3),
        // color: theme.palette.common.white
    },
    bottomPart: {
        fontSize: 16
    }
}));

// ----------------------------------------------------------------------




function GenericBoxInfo({
    className,
    numberOfItems,
    infoType,
    mainNumber,
    secondaryNumber,
    iconColor,
    icon,
    ...other
}) {
    const classes = useStyles();


    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom className={classes.bottomPart}>
                    {infoType}
                </Typography>
                <Typography variant="h3">
                    {/* This is to put the negative sign outside of the dollar sign if the number is negative */}
                    {mainNumber >= 0 ? `$${fNumber(mainNumber)}` : `-$${fNumber(-mainNumber)}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    &nbsp;estimated savings
                </Typography>

                <div className={classes.trending}>
                    {/* <div
                        className={clsx(classes.trendingIcon, {
                            [classes.isTrendingDown]: secondaryNumber < 0
                        })}
                    >
                        <Icon
                            width={16}
                            height={16}
                            icon={secondaryNumber >= 0 ? trendingUpFill : trendingDownFill}
                        />
                    </div> */}
                    <Typography variant="subtitle2" component="span" className={classes.bottomPart}>
                        &nbsp;{secondaryNumber}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="span" className={classes.bottomPart}>
                        &nbsp;processes
                    </Typography>
                </div>
            </Box>

            <Icon icon={icon} className={classes.icon} color={iconColor} />
        </Card>
    );
}

export default GenericBoxInfo;
