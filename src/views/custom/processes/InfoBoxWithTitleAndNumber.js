import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import rocketIcon from '@iconify-icons/fxemoji/rocket';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'utils/formatNumber';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';


// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => {
    return {
        root: {
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            padding: theme.spacing(3),
        },
        icon: {
            width: 120,
            height: 120,
            opacity: 0.12,
            position: 'absolute',
            right: theme.spacing(-3),
            color: theme.palette.common.white
        }
    };
});


function Widgets1({ className, mainNumber, infoType, backgroundColor, ...other }) {
    const classes = useStyles();
    const theme = useTheme();


    return (
        <Card className={clsx(classes.root, className)} {...other} style={{ backgroundColor }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                    {infoType}
                </Typography>
                <Typography variant="h3" gutterBottom>
                    {`$${fNumber(0)}`}
                </Typography>
            </Box>

            <Icon icon={rocketIcon} className={classes.icon} />
        </Card>
    );
}

export default Widgets1;
