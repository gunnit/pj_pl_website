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


export default function AutomationScores({ processDetails: { score, details } }) {
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
            subHeading: score.avg_score_bottlenecks,
            text: (
                <>
                    <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                        Multiple Data Sources:
                        <MLabel variant="filled" color={"primary"}>
                            {details.multiple_data_sources}
                        </MLabel>
                    </Typography>
                    <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                        Demand Fluctuation:
                        <MLabel variant="filled" color={"primary"}>
                            {details.demand_fluctuation}
                        </MLabel>
                    </Typography>
                    <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                        Execution Frequency:
                        <Typography variant='subtitle1'>not answered</Typography>
                        <MLabel variant="filled" color={"primary"}>
                            {details.frequency}
                        </MLabel>
                    </Typography>
                    <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                        Real Time:
                        <MLabel variant="filled" color={"primary"}>
                            {details.real_time}
                        </MLabel>
                    </Typography>
                    <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                        Supervisor Number:
                        <MLabel variant="filled" color={"primary"}>
                            {details.supervisor_number}
                        </MLabel>
                    </Typography>
                    <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                        Data Gathering Footprint:
                        <MLabel variant="filled" color={"primary"}>
                            {details.data_gathering_footprint}
                        </MLabel>
                    </Typography>
                    <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                        Time for execution:
                        <MLabel variant="filled" color={"primary"}>
                            {details.time_for_execution}
                        </MLabel>
                    </Typography>
                    <Typography gutterBottom variant='subtitle2' color='textSecondary'>
                        Staff Shuffling Present:
                        <MLabel variant="filled" color={"primary"}>
                            {details.shuffle_staffing}
                        </MLabel>
                    </Typography>
                </>
            ),
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: score.tot_score_dataquality,
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: score.tot_score_datacomplexity,
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: score.tot_score_technology,
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: score.tot_score_transformation,
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: score.tot_score_driversforchange,
            text: ''
        },
        {
            value: `panel0`,
            heading: `Accordion0`,
            subHeading: score.tot_score_scalability,
            text: ''
        },
    ]

    return (
        <Card>
            <CardHeader title="Controlled" />
            <CardContent>
                {accordions.map(item => (
                    <Accordion
                        key={item.value}
                        expanded={expanded === item.value}
                        onChange={handleChange(item.value)}
                    >
                        <AccordionSummary
                            expandIcon={
                                <Icon icon={arrowIosDownwardFill} width={20} height={20} />
                            }
                        >
                            <Typography variant="subtitle1" className={classes.heading}>
                                {item.heading}
                            </Typography>
                            {/* <Typography color="textSecondary" noWrap>
              {item.subHeading}
            </Typography> */}
                            <MLabel>{item.subHeading}</MLabel>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{item.text}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </CardContent>
        </Card>
    );
}