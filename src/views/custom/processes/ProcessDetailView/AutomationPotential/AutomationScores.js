import { Icon } from '@iconify/react';
import React, { useState } from 'react';
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


export default function AutomationScores({ scores, average_scores_per_subgroup }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // score.avg_score_bottlenecks

    // score.tot_score_dataquality

    // score.tot_score_datacomplexity

    // score.tot_score_technology

    // score.tot_score_transformation

    // score.tot_score_driversforchange

    // score.tot_score_scalability




    const accordions = [
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: 'score.avg_score_bottlenecks',
            text: (
                <>
                    {Object.keys(average_scores_per_subgroup).map(subgroup => {
                        return (
                            <Typography key={subgroup} gutterBottom variant='subtitle2' color='textSecondary'>
                                {subgroup}
                                <MLabel variant="filled" color={"primary"}>
                                    {average_scores_per_subgroup[subgroup]}
                                </MLabel>
                            </Typography>)
                    })}
                </>

            ),
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: 'score.tot_score_dataquality',
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: 'score.tot_score_datacomplexity',
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: 'score.tot_score_technology',
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: 'score.tot_score_transformation',
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: 'score.tot_score_driversforchange',
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: 'score.tot_score_scalability',
            text: ''
        },
    ]

    return (
        <Card>
            <CardHeader title="Controlled" />
            <CardContent>
                {Object.keys(average_scores_per_subgroup).map(subgroup => {
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
                                <Typography>Scores for each subgroup</Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </CardContent>
        </Card>
    );
}