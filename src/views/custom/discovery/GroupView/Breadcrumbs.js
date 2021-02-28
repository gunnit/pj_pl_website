import React, { useContext } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import Context from 'context/Context';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        // textDecoration: 'none'
    },
    routerLink: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
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

export default function BreadcrumbsComponent({ process_type, hierarchy_id, previousGroups, setPreviousGroups }) {
    const classes = useStyles();


    const { setTaxonomyGroupId } = useContext(Context)

    const handleClick = (process_element_id, index) => {
        setTaxonomyGroupId(process_element_id)
        setPreviousGroups(previous => previous.slice(0, index))
    }

    return (
        <Breadcrumbs className={classes.root}>

            <RouterLink color="inherit" to={PATH_APP.discovery.category} className={classes.routerLink}>
                {process_type}
            </RouterLink>

            {previousGroups.map(({ process_element_id, hierarchy_id }, i) => {
                return (
                    <Typography color="inherit" onClick={() => handleClick(process_element_id, i)} className={classes.routerLink}>
                        {hierarchy_id}
                    </Typography>
                )
            })}
            <Typography color="textPrimary">{hierarchy_id}</Typography>
        </Breadcrumbs>

    );

}