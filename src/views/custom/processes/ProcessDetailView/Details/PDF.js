import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer'
import clsx from 'clsx';
import { fDate } from 'utils/formatTime';


export default function PDF({ processDetails: { process, scores } }) {


    const average_scores_per_subgroup = process.average_scores_per_subgroup


    const scoresGroupedBySubgroup = {}

    const subgroupSet = new Set()

    const subgroupsSortedByQuestionId = []

    scores.forEach(score => {

        if (!subgroupSet.has(score.subgroup)) {
            subgroupSet.add(score.subgroup)
            subgroupsSortedByQuestionId.push(score.subgroup)
        }

        if (scoresGroupedBySubgroup[score.subgroup]) {
            scoresGroupedBySubgroup[score.subgroup].push(score)
        } else {
            scoresGroupedBySubgroup[score.subgroup] = [score]
        }
    })


    return (
        <Document>
            <Page>
                <View>
                    <Text>Process Name: {process.process_name}</Text>
                    <Text>Process Level 2 Name:{process.process_L2_process_name}</Text>
                    <Text>Process Level 3 Name: {process.process_L3_process_name}</Text>
                    <Text>Process Type: {process.process_type}</Text>
                    <Text>Business Unit: {process.business_unit}</Text>
                    <Text>Process Team: {process.team}</Text>
                    <Text>Process Sponsor: {process.sponsor}</Text>
                    <Text>Date Created: {fDate(process.date_created)}</Text>
                    <Text>Status: {process.status}</Text>
                    <Text>Overview: {process.overview}</Text>
                    <Text>Description: {process.sponsor}</Text>
                    <Text>Documentation Available: {process.process_documentation_available}</Text>
                    <Text>Process Owner: {process.owner_name} Email: {process.owner_email}</Text>
                    <Text>Process SME: {process.process_SME} Email: {process.process_SME_email} Tel: {process.process_SME_tel}</Text>
                    {subgroupsSortedByQuestionId.map(subgroup => {
                        return (
                            <>
                                <Text>{subgroup}:</Text>
                                <Text>{parseFloat(average_scores_per_subgroup[subgroup].average).toFixed(2)}</Text>
                                {scoresGroupedBySubgroup[subgroup].map(score => {
                                    return (
                                        <>
                                            <Text>{score.question}</Text>
                                            <Text>{score.answer_text}</Text>
                                            <Text>{score.value}</Text>
                                        </>
                                    )
                                })}
                            </>
                        )
                    })}
                </View>
            </Page>
        </Document>
    )
}