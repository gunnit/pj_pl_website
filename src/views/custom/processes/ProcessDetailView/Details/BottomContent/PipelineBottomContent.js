import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
} from '@material-ui/core';
// ----------------------------------------------------------------------


const useStyles = makeStyles(theme => ({
    root: {},
    routerLink: {
        textDecoration: 'none'
    },
    icon: {
        height: 24,
        width: 24,
        margin: 10,
        marginLeft: 0
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    divider: {
        margin: theme.spacing(2)
    }
}));

// ----------------------------------------------------------------------

export default function PipelineBottomContent({ processDetails }) {
    const classes = useStyles();

    //     Process Operating Metrics
    //     The process operating metrics show without automation performance.

    //     Suggested process for development	
    //     Number of FTE required to run the process per year	0.00
    //     Total process execution time per year	0(Hours)
    //     Cost per transaction	$0 USD
    //     Process cost per day	$22 USD
    //     Number of transactions per day	0
    //     Execution time per transaction	33(Min)
    //     Hours spent working on process per day	0.00(Hours)

    return (
        <Card>
            <CardHeader
                title={<>
                    <Typography variant='h5' gutterBottom>Process Operating Metrics</Typography>
                    <Typography variant='subtitle1' color='textSecondary'>&nbsp;The process operating metrics show without automation performance.</Typography>
                </>}
            />
            <CardContent>
                <div className={classes.row}>
                    <Typography>Suggested for development?</Typography>
                    <Typography>{processDetails.process.final_process_score}</Typography>
                </div>
                <Divider className={classes.divider} />
                <div className={classes.row}>
                    <Typography>Number of FTE required to run the process per year</Typography>
                    <Typography>{processDetails.assumptions.current_how_many_fte_to_run_process}</Typography>
                </div>
                <Divider className={classes.divider} />

                <div className={classes.row}>
                    <Typography>Total process execution time per year</Typography>
                    <Typography>{processDetails.assumptions.process_time_in_hours} hours</Typography>
                </div>
                <Divider className={classes.divider} />

                <div className={classes.row}>
                    <Typography>Cost per transaction</Typography>
                    <Typography>{processDetails.assumptions.cost_per_transaction_process}</Typography>
                </div>
                <Divider className={classes.divider} />

                <div className={classes.row}>
                    <Typography>Process cost per day</Typography>
                    <Typography>{processDetails.assumptions.current_process_cost_per_day}</Typography>
                </div>
                <Divider className={classes.divider} />

                <div className={classes.row}>
                    <Typography>Number of transactions per day</Typography>
                    <Typography>{processDetails.assumptions.cost_per_transaction_process}</Typography>
                </div>
                <Divider className={classes.divider} />

                <div className={classes.row}>
                    <Typography>Execution time per transaction</Typography>
                    <Typography>{processDetails.assumptions.completion_time} min</Typography>
                </div>
                <Divider className={classes.divider} />

                <div className={classes.row}>
                    <Typography>Hours spent working on process per day</Typography>
                    <Typography>{processDetails.hours_worked_per_day_by_employee.toFixed(2)} hours</Typography>
                </div>
            </CardContent>
        </Card>
    );
}
