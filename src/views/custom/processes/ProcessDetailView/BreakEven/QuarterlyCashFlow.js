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

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const GROUPING_TABLE = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767)
];

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

export default function QuarterlyCashFlow() {
    const classes = useStyles();

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
                                        align="right"
                                        colSpan={4}
                                        classes={{ head: classes.tableHead }}
                                    >
                                        Year 1
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        colSpan={4}
                                        classes={{ head: classes.tableHead }}
                                    >
                                        Year 2
                                    </TableCell>
                                </TableRow>
                                <TableRow>
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
                                {GROUPING_TABLE.map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {COLUMNS.map(column => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
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
