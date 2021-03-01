import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography, Container, Grid, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import IdeaSideContent from './IdeaSideContent';
import PipelineSideContent from './PipelineSideContent';
import DevelopmentSideContent from './DevelopmentSideContent';
import ProductionSideContent from './ProductionSideContent';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));


export default function SideContent({ processDetails, stage }) {

    const classes = useStyles()



    if (stage === 'Idea') {
        return (
            <IdeaSideContent processDetails={processDetails} />
        )
    }

    if (stage === 'Pipeline') {
        return (
            <PipelineSideContent processDetails={processDetails} />
        )
    }
    if (stage === 'Development') {
        return (
            <DevelopmentSideContent processDetails={processDetails} />
        )
    }

    return (
        <ProductionSideContent processDetails={processDetails} />
    )

}