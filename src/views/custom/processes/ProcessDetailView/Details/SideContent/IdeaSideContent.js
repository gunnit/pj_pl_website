import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Card, Typography, Container, Grid, Button, Dialog, DialogTitle,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import 'firebase/auth';
import firebase from 'firebase/app';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));


export default function IdeaSideContent({ processDetails, setStage }) {

    const classes = useStyles()

    const { currentProcessId, setProcessCounts } = useContext(Context)


    const [openDialog, setOpenDialog] = useState(false)


    const moveStage = async (currentStage, futureStage) => {
        try {


            let storedProcessId;
            if (!currentProcessId) {
                storedProcessId = localStorage.getItem('currentProcessId')
            }
            const token = await firebase.auth().currentUser.getIdToken(true);

            // currentProcessId will be the ID of the process that was clicked on
            await fetch(`${apiBaseUrl}/change_status/${currentProcessId || storedProcessId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    pipeline_status: futureStage
                }),
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": token
                }
            })

            // Change navbar numbers
            setProcessCounts(previous => ({
                ...previous,
                [currentStage]: previous[currentStage] - 1,
                [futureStage]: previous[futureStage] + 1
            }))


            // // Redirect to process detail page
            // history.push(PATH_APP.processes.details)
            setOpenDialog(false)
            setStage('Pipeline')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Grid item xs={12} md={12} lg={12}>
                <Card className={classes.root}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            Next step:
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Based on the initial assessment this process should be moved to the Pipeline stage and be considered for a detailed assessment and ROI analysis.
                        </Typography>
                    </Box>
                    <Box
                        component="img"
                        alt="Move to pipeline"
                        src={'/static/images/process/undraw_maker_launch_crhe.svg'}
                        sx={{
                            p: 2,
                            height: 205,
                            margin: { xs: 'auto', md: 'inherit' }
                        }}
                    />
                    <Button variant='contained' color='secondary' onClick={() => setOpenDialog(true)}>Move to Pipeline</Button>
                </Card>
            </Grid>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                {openDialog &&
                    <>
                        <DialogTitle id="simple-dialog-title">Move {processDetails.process.process_name} into Pipeline phase?</DialogTitle>
                        <Button onClick={() => moveStage('Idea', 'Pipeline')}>Yes</Button>
                        <Button color='error' onClick={() => setOpenDialog(false)}>Cancel</Button>
                    </>}
            </Dialog>
        </>
    )


}