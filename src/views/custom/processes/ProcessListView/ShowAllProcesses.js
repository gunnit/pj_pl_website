import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';
import { fShortenNumber } from 'utils/formatNumber';
import bugFilled from '@iconify-icons/ant-design/bug-filled';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        padding: theme.spacing(5, 0),
        color: theme.palette.primary.darker,
        backgroundColor: theme.palette.primary.lighter,
        // minWidth: 240
        width: '100%',
        '&:hover': {
            cursor: 'default'
        }
    },
    icon: {
        margin: 'auto',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        width: theme.spacing(8),
        height: theme.spacing(8),
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
        color: theme.palette.primary.dark,
        backgroundImage: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.dark,
            0
        )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`
    }
}));


// ----------------------------------------------------------------------


export default function Production({ setPipelineFilter, className, ...other }) {
    const classes = useStyles();
    const total = 234;

    return (
        <Card className={clsx(classes.root, className)} {...other} onClick={() => setPipelineFilter('')}>
            <div className={classes.icon}>
                <Icon icon={bugFilled} width={24} height={24} />
            </div>
            <Typography variant="h3">{fShortenNumber(total)}</Typography>
            <Box sx={{ opacity: 0.72, typography: 'subtitle2' }}>Show All</Box>
        </Card>
    );
}