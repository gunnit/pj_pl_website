import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Box, Typography } from '@material-ui/core';
import { ButtonAnimate } from 'components/Animate';
import { useHistory } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import Context from 'context/Context';



const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%'
    }
}));

export default function ListCard({ process_element_id, title, body }) {
    const classes = useStyles();
    const history = useHistory();
    const { setTaxonomyGroupId } = useContext(Context)



    const handleClick = async () => {
        setTaxonomyGroupId(process_element_id)
        localStorage.setItem('taxonomyGroupId', process_element_id)
        // history.push(PATH_APP.discovery.group)
    }


    return (
        <ButtonAnimate className={classes.root} onClick={handleClick}>
            <Card className={classes.root}>

                <CardHeader title={title} />

                <CardContent>
                    <Typography>{body}</Typography>
                </CardContent>

            </Card>
        </ButtonAnimate>
    );
}