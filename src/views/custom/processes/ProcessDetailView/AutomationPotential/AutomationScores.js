import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardHeader,
    CardContent,
} from '@material-ui/core';
import { MLabel } from '@material-extend';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    heading: {
        flexShrink: 0,
        flexBasis: '33.33%'
    },
    margin: {
        marginBottom: theme.spacing(3)
    },
    accordionText: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        justifyContent: 'space-between',
        alignItems: 'space-between'
    },
    first: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    second: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    third: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    item: {
        marginBottom: theme.spacing(2)
    }
}));

// ----------------------------------------------------------------------


const ACCORDIONS = [...Array(4)].map((accordion, index) => {
    const setIndex = index + 1;
    return {
        value: `panel${setIndex}`,
        heading: `Accordion${setIndex}`,
        subHeading: Math.random() * 10,
        text: 'faker.lorem.lines()'
    };
});

// Need same array of subgroups as assessment (which is based on question ID) to determine order


export default function AutomationScores({ scores, average_scores_per_subgroup }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    // What is the best place to do this? Front end, back end, query? Front end doesn't affect loading time I think

    const scoresGroupedBySubgroup = {}

    // need array of subgroups as well for the order

    const subgroupSet = new Set()

    const subgroupsSortedByQuestionId = []

    scores.forEach(score => {

        if (!subgroupSet.has(score.subgroup)) {
            subgroupSet.add(score.subgroup)
            subgroupsSortedByQuestionId.push(score.subgroup)
        }

        if (scoresGroupedBySubgroup[score.subgroup]) {
            scoresGroupedBySubgroup[score.subgroup].push(score)
        } else {
            scoresGroupedBySubgroup[score.subgroup] = [score]
        }
    })


    // Tried doing this in a useEffect to avoid doing it on every render, and it causes flickering on load


    return (
        <Card>
            <CardContent>
                {subgroupsSortedByQuestionId.map(subgroup => {
                    return (
                        <Accordion
                            key={subgroup}
                            expanded={expanded === subgroup}
                            onChange={handleChange(subgroup)}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <Icon icon={arrowIosDownwardFill} width={20} height={20} />
                                }
                            >
                                <Typography variant="subtitle1" className={classes.heading}>
                                    {subgroup}
                                </Typography>
                                <MLabel>{parseFloat(average_scores_per_subgroup[subgroup].average).toFixed(2)}</MLabel>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.container}>
                                    <div className={classes.first}>
                                        {scoresGroupedBySubgroup[subgroup].map(score => {
                                            // needs the title of the question
                                            return (
                                                <>
                                                    <Typography className={classes.item} variant='subtitle2' color='textSecondary'>{score.question}:</Typography>
                                                    {/* <MLabel>{score.answer_text}</MLabel>
                                            <MLabel>{score.value}</MLabel> */}
                                                </>
                                            )
                                        })}
                                    </div>
                                    <div className={classes.second}>
                                        {scoresGroupedBySubgroup[subgroup].map(score => {
                                            // needs the title of the question
                                            return (
                                                <>
                                                    {/* <Typography variant='subtitle2' color='textSecondary'>{score.question}:</Typography> */}
                                                    <MLabel className={classes.item}>{score.answer_text}</MLabel>
                                                    {/* <MLabel>{score.value}</MLabel> */}
                                                </>
                                            )
                                        })}
                                    </div>
                                    <div className={classes.third}>
                                        {scoresGroupedBySubgroup[subgroup].map(score => {
                                            // needs the title of the question
                                            return (
                                                <>
                                                    {/* <Typography variant='subtitle2' color='textSecondary'>{score.question}:</Typography>
                                            <MLabel>{score.answer_text}</MLabel> */}
                                                    <MLabel className={classes.item}>{score.value}</MLabel>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </CardContent>
        </Card>
    );
}