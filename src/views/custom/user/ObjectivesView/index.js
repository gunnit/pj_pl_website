import 'firebase/auth';
import firebase from 'firebase/app';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Box,
    Card,
    Slider,
    CardContent,
    Divider,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import { apiBaseUrl } from 'config';
import Context from 'context/Context';
import { LoadingButton } from '@material-ui/lab';
import LoadingScreen from 'components/LoadingScreen';
import Page500View from 'views/errors/Page500View';
import { useSnackbar } from 'notistack';



// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {},
    saveButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    slider: {
        colorPrimary: theme.palette.warning.main
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        // backgroundColor: theme.palette.warning.main,
        width: '95%',
        margin: 'auto',
    }
}));

// ----------------------------------------------------------------------
function valuetext(value) {
    return `$${value}°C`;
}


export default function ObjectivesView() {
    const classes = useStyles()

    const [sliderValues, setSliderValues] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(false)

    const { enqueueSnackbar } = useSnackbar();


    const { userId } = useContext(Context)

    useEffect(() => {
        try {

            if (userId) {
                (async function () {

                    const token = await firebase.auth().currentUser.getIdToken(true);

                    const res = await fetch(`${apiBaseUrl}/company_objectives/${userId}`, {
                        headers: {
                            'Authorization': token
                        }
                    })

                    if (!res.ok) {
                        throw res
                    }

                    const sliderValues = await res.json()

                    for (const slider in sliderValues) {
                        sliderValues[slider] = parseInt(sliderValues[slider])
                    }

                    setSliderValues(sliderValues)

                })()


            }



        } catch (e) {
            setError(true)
        }

    }, [userId])


    const handleSave = async () => {
        setPending(true)

        try {

            const token = await firebase.auth().currentUser.getIdToken(true);

            const res = await fetch(`${apiBaseUrl}/company_objectives/${userId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...sliderValues,
                }),
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": token
                }
            })

            if (!res.ok) {
                throw res
            }

            setPending(false)
            enqueueSnackbar('Saved!', { variant: 'success' })

        } catch (e) {
            setError(true)
        }


    }

    if (error) {
        return <Page500View />
    }

    if (!sliderValues) {
        return <LoadingScreen />
    }



    return (
        <Page title="Automation Objectives">
            <Container>
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4" gutterBottom>Objectives</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Your company objectives are measurable and effectively describe the actions required to accomplish a task                    </Typography>
                </Box>
                <Card>
                    <CardContent>
                        <Typography variant='h4' gutterBottom>Execution</Typography>

                        <Typography gutterBottom>Direct Cost Reduction</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.cost_reduction)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, cost_reduction: value }))}
                        />
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            The desired goal from automation is to reduce costs with automation
                </Typography>

                        <Divider className={classes.divider} />

                        <Typography gutterBottom>Reduce Process Duration</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.reduce_process_duration)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, reduce_process_duration: value }))}
                        />
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            The end to end time for processes needs to improve
                </Typography>

                        <Divider className={classes.divider} />


                        <Typography gutterBottom>Improve Accuracy</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.improve_accuracy)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, improve_accuracy: value }))}
                        />
                        <Typography gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            The quality of data generated by processes needs to improve
                </Typography>

                        <Divider className={classes.divider} />


                        <Typography variant='h4' gutterBottom>Strategy</Typography>

                        <Typography gutterBottom>Improve Audit Trail</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.enable_audit_trail)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, enable_audit_trail: value }))}
                        />
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            Process steps need to be recorded and available for audit purposes
                </Typography>

                        <Divider className={classes.divider} />


                        <Typography gutterBottom>Enable Scalability of Automation</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.enable_scalability)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, enable_scalability: value }))}
                        />
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            Scaling automation within the different business departments in the company
                </Typography>

                        <Divider className={classes.divider} />


                        <Typography variant='h4' gutterBottom>Risk</Typography>

                        <Typography gutterBottom>Security</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.improve_security)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, improve_security: value }))}
                        />
                        <Typography gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            Process security from physical and cyber threats is a priority
                </Typography>

                        <Divider className={classes.divider} />


                        <Typography gutterBottom>Improve Consistency</Typography>
                        <Slider
                            className={classes.slider}
                            defaultValue={parseInt(sliderValues.improve_consistency)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, improve_consistency: value }))}
                        />
                        <Typography gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            Processes overall need to perform better and be more stable
                </Typography>

                        <Divider className={classes.divider} />

                        <Typography gutterBottom>Improve Reliability</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.improve_reliability)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, improve_reliability: value }))}
                        />
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            The processes have to produce consistent results
                </Typography>
                        <Divider className={classes.divider} />



                        <Typography variant='h4' gutterBottom>Customer</Typography>

                        <Typography gutterBottom>Client Satisfaction</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.client_satisfaction)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, client_satisfaction: value }))}
                        />
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            Processes need to improve to improve client satisfaction
                </Typography>
                        <Divider className={classes.divider} />

                        <Typography variant='h4' gutterBottom>People</Typography>

                        <Typography gutterBottom>Increase Retention</Typography>
                        <Slider
                            defaultValue={parseInt(sliderValues.increase_retention)}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            onChangeCommitted={(e, value) => setSliderValues(sliderValues => ({ ...sliderValues, increase_retention: value }))}
                        />
                        <Typography gutterBottom
                            variant="subtitle2"
                            color="textSecondary">
                            By removing repetitive tasks employees will be able to perform more value adding tasks
                        </Typography>

                        <div className={classes.saveButtonContainer}>
                            <LoadingButton
                                pending={pending}
                                variant="contained"
                                onClick={handleSave}
                                pendingPosition="center"
                            >
                                Save
                      </LoadingButton>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </Page>
    );
}