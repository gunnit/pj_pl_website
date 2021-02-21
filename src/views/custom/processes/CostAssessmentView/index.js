import React, { useEffect, useContext } from 'react';
import Context from 'context/Context';
import { apiBaseUrl } from 'config';

export default function CostAssessmentView() {

    const { currentProcessId } = useContext(Context)

    useEffect(() => {

        (async function () {
            const res = await fetch(`${apiBaseUrl}/update_assumptions/${currentProcessId}`)

            console.log(await res.json())
        })()



    }, [])

    return (
        <h1>CostAssessmentView</h1>
    )
}