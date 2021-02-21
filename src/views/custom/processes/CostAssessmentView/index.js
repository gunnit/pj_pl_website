import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import React, { useEffect, useContext } from 'react';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';

export default function CostAssessmentView() {

    const { currentProcessId } = useContext(Context)

    useEffect(() => {

        (async function () {
            const token = await firebase.auth().currentUser.getIdToken(true);

            const res = await fetch(`${apiBaseUrl}/update_assumptions/${currentProcessId}`, {
                headers: {
                    'Authorization': token
                }
            })

            console.log(await res.json())
        })()



    }, [])

    return (
        <h1>CostAssessmentView</h1>
    )
}