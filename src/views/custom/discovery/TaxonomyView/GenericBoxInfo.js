import clsx from 'clsx';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ButtonAnimate } from 'components/Animate';
import { PATH_APP } from 'routes/paths';
import Context from 'context/Context';
// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        textDecoration: 'none',
        height: '100%'
    },
    buttonAnimate: {
        height: '100%',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

// ----------------------------------------------------------------------



function GenericBoxInfo({ className, description, imagePath, ...other }) {
    const classes = useStyles();
    const history = useHistory()

    const { setCurrentTaxonomy } = useContext(Context)

    const handleClick = async () => {
        setCurrentTaxonomy(description)
        localStorage.setItem('currentTaxonomy', description)
        history.push(PATH_APP.discovery.category)
    }

    return (
        <ButtonAnimate className={classes.buttonAnimate} onClick={handleClick}>
            <Card className={clsx(classes.root, className)} {...other}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        {description}
                    </Typography>
                </Box>
                <Box
                    component="img"
                    alt="welcome"
                    src={imagePath}
                    sx={{
                        p: 2,
                        height: 205,
                        margin: { xs: 'auto', md: 'inherit' }
                    }}
                />
            </Card>
        </ButtonAnimate>
    );
}

export default GenericBoxInfo;
