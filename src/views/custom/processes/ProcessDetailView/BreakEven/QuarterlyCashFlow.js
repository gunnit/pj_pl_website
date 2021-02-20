import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    Card,
    CardHeader,
    CardContent,
} from '@material-ui/core';

// ----------------------------------------------------------------------


const COLUMNS = [
    // { id: 'name', label: 'Name', minWidth: 170 },
    // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    // {
    //   id: 'population',
    //   label: 'Population',
    //   minWidth: 170,
    //   align: 'right',
    //   format: value => value.toLocaleString('en-US')
    // },
    // {
    //   id: 'size',
    //   label: 'Size\u00a0(km\u00b2)',
    //   minWidth: 170,
    //   align: 'right',
    //   format: value => value.toLocaleString('en-US')
    // },
    // {
    //   id: 'density',
    //   label: 'Density',
    //   minWidth: 170,
    //   align: 'right',
    //   format: value => value.toFixed(2)
    // }
    { id: 'q1', label: 'Q1', minWidth: 50 },
    { id: 'q2', label: 'Q2', minWidth: 50 },
    { id: 'q3', label: 'Q3', minWidth: 50 },
    { id: 'q4', label: 'Q4', minWidth: 50 },
    { id: 'q12', label: 'Q1', minWidth: 50 },
    { id: 'q22', label: 'Q2', minWidth: 50 },
    { id: 'q32', label: 'Q3', minWidth: 50 },
    { id: 'q42', label: 'Q4', minWidth: 50 },
];

const useStyles = makeStyles(theme => ({
    root: {},
    tableHead: {
        background: theme.palette.background.paper
    }
}));

// ----------------------------------------------------------------------

export default function QuarterlyCashFlow({ data: {
    q1_savings_y1,
    q1_savings_y2,
    q1_with_auto_y1,
    q1_with_auto_y2,
    q1_with_no_auto_y1,
    q1_with_no_auto_y2,
    q2_savings_y1,
    q2_savings_y2,
    q2_with_auto_y1,
    q2_with_auto_y2,
    q2_with_no_auto_y1,
    q2_with_no_auto_y2,
    q3_savings_y1,
    q3_savings_y2,
    q3_with_auto_y1,
    q3_with_auto_y2,
    q3_with_no_auto_y1,
    q3_with_no_auto_y2,
    q4_savings_y1,
    q4_savings_y2,
    q4_with_auto_y1,
    q4_with_auto_y2,
    q4_with_no_auto_y1,
    q4_with_no_auto_y2,
} }) {
    const classes = useStyles();



    const costWithoutAutomationRow = [
        q1_with_no_auto_y1,
        q2_with_no_auto_y1,
        q3_with_no_auto_y1,
        q4_with_no_auto_y1,
        q1_with_no_auto_y2,
        q2_with_no_auto_y2,
        q3_with_no_auto_y2,
        q4_with_no_auto_y2,
    ]

    const costWithAutomationRow = [
        q1_with_auto_y1,
        q2_with_auto_y1,
        q3_with_auto_y1,
        q4_with_auto_y1,
        q1_with_auto_y2,
        q2_with_auto_y2,
        q3_with_auto_y2,
        q4_with_auto_y2,
    ]

    const savingsRow = [
        q1_savings_y1,
        q2_savings_y1,
        q3_savings_y1,
        q4_savings_y1,
        q1_savings_y2,
        q2_savings_y2,
        q3_savings_y2,
        q4_savings_y2,
    ]

    const rows = [
        { cells: costWithoutAutomationRow },
        { cells: costWithAutomationRow },
        { cells: savingsRow },
    ]


    return (
        <Card>
            <CardHeader title="Quarterly Cash Flow" />
            <CardContent>
                <div className={classes.root}>
                    <TableContainer component={Box} sx={{ minWidth: 800, maxHeight: 400 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        colSpan={1}
                                        classes={{ head: classes.tableHead }}
                                    />
                                    <TableCell
                                        align="right"
                                        colSpan={1}
                                        classes={{ head: classes.tableHead }}
                                    >
                                        Year 1
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        colSpan={3}
                                        classes={{ head: classes.tableHead }}
                                    />
                                    <TableCell
                                        align="right"
                                        colSpan={1}
                                        classes={{ head: classes.tableHead }}
                                    >
                                        Year 2
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        colSpan={3}
                                        classes={{ head: classes.tableHead }}
                                    />
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        // align='right'
                                        style={{ top: 56, minWidth: 50 }}
                                    />
                                    {COLUMNS.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ top: 56, minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rows.map((row, i) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {i === 0
                                                && <TableCell align='left'>
                                                    Cost Without Automation
                                                </TableCell>}
                                            {i === 1
                                                && <TableCell align='left'>
                                                    Cost With Automation
                                                   </TableCell>}
                                            {i === 2
                                                && <TableCell align='left'>
                                                    Savings
                                                   </TableCell>}
                                            {row.cells.map(cell => {
                                                return (
                                                    <TableCell key={cell}
                                                    // align={column.align}
                                                    >
                                                        {/* {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value} */}
                                                        {cell}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </div>
            </CardContent>
        </Card>

    );
}
