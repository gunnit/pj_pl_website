import React from 'react';
import Accordion from './Accordion';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const ACCORDIONS = [...Array(4)].map((accordion, index) => {
    const setIndex = index + 1;
    return {
        value: `panel${setIndex}`,
        heading: `Accordion${setIndex}`,
        subHeading: Math.random() * 10,
        text: 'placeholder text'
    };
});

const useStyles = makeStyles(theme => ({
    root: {},
    margin: {
        marginBottom: theme.spacing(3)
    }
}));

// ----------------------------------------------------------------------

function AutomationScores() {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Controlled" />
            <CardContent>
                <Accordion accordions={ACCORDIONS} />
            </CardContent>
        </Card>
    );
}

export default AutomationScores;
