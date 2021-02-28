import React from 'react';
// import Block from 'components/Block';
// import { PATH_APP } from 'routes/paths';
// import HomeIcon from '@material-ui/icons/Home';
// import GrainIcon from '@material-ui/icons/Grain';
// import WhatshotIcon from '@material-ui/icons/Whatshot';
// import MBreadcrumbs from '@material-extend/MBreadcrumbs';
// import HeaderDashboard from 'components/HeaderDashboard';
import { makeStyles } from '@material-ui/core/styles';
import {
    Link,
    Card,
    Grid,
    Container,
    Typography,
    CardContent,
    Breadcrumbs
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    link: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: theme.spacing(0.5)
    }
}));

// ----------------------------------------------------------------------

export default function BreadcrumbsComponent() {
    const classes = useStyles();

    return (
        <Breadcrumbs>
            <Link color="inherit" href="/">
                Material-UI
                    </Link>
            <Link color="inherit" href="#">
                Core
                    </Link>
            <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>

    );

}