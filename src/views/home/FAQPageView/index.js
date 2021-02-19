import React from 'react';
import Page from 'components/Page';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    Typography,
    AccordionDetails,
    AccordionSummary
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
    content: {
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accordionContainer: {
        width: '80%',
    }
}));

const accordions = [...Array(4)].map((accordion, index) => {
    const setIndex = index + 1;
    return {
        value: `panel${setIndex}`,
        heading: `Accordion${setIndex}`,
        subHeading: 'subheading',
        text: 'Accordion placeholder text'
    };
});



export default function FAQPageView() {
    const classes = useStyles();

    return (
        <Page title="ProcessLenz | Home" id="move_top" className={classes.root}>

            <div className={classes.content}>
                {/* <HugePackElements />
                <ListElements /> */}
                <div className={classes.accordionContainer}>
                    {accordions.map((accordion, index) => (
                        <Accordion key={accordion.value}>
                            <AccordionSummary
                                expandIcon={
                                    <Icon icon={arrowIosDownwardFill} width={20} height={20} />
                                }
                            >
                                <Typography variant="subtitle1">{accordion.heading}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{accordion.text}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </Page>
    );
}