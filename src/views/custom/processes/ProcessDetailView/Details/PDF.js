// import React from 'react';
// import { Document, Page, View, Text } from '@react-pdf/renderer'
// import clsx from 'clsx';
// import { fDate } from 'utils/formatTime';


// export default function PDF({ processDetails: { process, scores } }) {


//     const average_scores_per_subgroup = process.average_scores_per_subgroup


//     const scoresGroupedBySubgroup = {}

//     const subgroupSet = new Set()

//     const subgroupsSortedByQuestionId = []

//     scores.forEach(score => {

//         if (!subgroupSet.has(score.subgroup)) {
//             subgroupSet.add(score.subgroup)
//             subgroupsSortedByQuestionId.push(score.subgroup)
//         }

//         if (scoresGroupedBySubgroup[score.subgroup]) {
//             scoresGroupedBySubgroup[score.subgroup].push(score)
//         } else {
//             scoresGroupedBySubgroup[score.subgroup] = [score]
//         }
//     })


//     return (
//         <Document>
//             <Page>
//                 <View>
//                     <Text>Process Name: {process.process_name}</Text>
//                     <Text>Process Level 2 Name:{process.process_L2_process_name}</Text>
//                     <Text>Process Level 3 Name: {process.process_L3_process_name}</Text>
//                     <Text>Process Type: {process.process_type}</Text>
//                     <Text>Business Unit: {process.business_unit}</Text>
//                     <Text>Process Team: {process.team}</Text>
//                     <Text>Process Sponsor: {process.sponsor}</Text>
//                     <Text>Date Created: {fDate(process.date_created)}</Text>
//                     <Text>Status: {process.status}</Text>
//                     <Text>Overview: {process.overview}</Text>
//                     <Text>Description: {process.sponsor}</Text>
//                     <Text>Documentation Available: {process.process_documentation_available}</Text>
//                     <Text>Process Owner: {process.owner_name} Email: {process.owner_email}</Text>
//                     <Text>Process SME: {process.process_SME} Email: {process.process_SME_email} Tel: {process.process_SME_tel}</Text>
//                     {subgroupsSortedByQuestionId.map(subgroup => {
//                         return (
//                             <>
//                                 <Text>{subgroup}:</Text>
//                                 <Text>{parseFloat(average_scores_per_subgroup[subgroup].average).toFixed(2)}</Text>
//                                 {scoresGroupedBySubgroup[subgroup].map(score => {
//                                     return (
//                                         <>
//                                             <Text>{score.question}</Text>
//                                             <Text>{score.answer_text}</Text>
//                                             <Text>{score.value}</Text>
//                                         </>
//                                     )
//                                 })}
//                             </>
//                         )
//                     })}
//                 </View>
//             </Page>
//         </Document>
//     )
// }

import React from 'react';
import { sum } from 'lodash';
import PropTypes from 'prop-types';
import { fCurrency } from 'utils/formatNumber';
import {
    Page,
    View,
    Text,
    Font,
    Image,
    Document,
    StyleSheet
} from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/fonts/Roboto-Regular.ttf' },
        { src: '/fonts/Roboto-Bold.ttf' }
    ]
});

const styles = StyleSheet.create({
    col4: { width: '25%' },
    col8: { width: '75%' },
    col6: { width: '50%' },
    mb8: { marginBottom: 8 },
    mb40: { marginBottom: 40 },
    overline: {
        fontSize: 8,
        marginBottom: 8,
        fontWeight: 700,
        letterSpacing: 1.2,
        textTransform: 'uppercase'
    },
    h3: { fontSize: 16, fontWeight: 700 },
    h4: { fontSize: 13, fontWeight: 700 },
    body1: { fontSize: 10 },
    subtitle2: { fontSize: 9, fontWeight: 700 },
    alignRight: { textAlign: 'right' },
    page: {
        padding: '40px 24px 0 24px',
        fontSize: 9,
        lineHeight: 1.6,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        textTransform: 'capitalize'
    },
    footer: {
        left: 0,
        right: 0,
        bottom: 0,
        padding: 24,
        margin: 'auto',
        borderTopWidth: 1,
        borderStyle: 'solid',
        position: 'absolute',
        borderColor: '#DFE3E8'
    },
    gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    table: { display: 'flex', width: 'auto' },
    tableHeader: {},
    tableBody: {},
    tableRow: {
        padding: '8px 0',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DFE3E8'
    },
    noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
    tableCell_1: { width: '5%' },
    tableCell_2: { width: '50%', paddingRight: 16 },
    tableCell_3: { width: '15%' }
});

// ----------------------------------------------------------------------


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
            <Page size="A4" style={styles.page}>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <Image source="/static/brand/logo_full.jpg" style={{ height: 32 }} />
                    <View style={{ alignItems: 'right', flexDirection: 'column' }}>
                        <Text style={styles.h3}>{'status'}</Text>
                        <Text>INV-{'id'}</Text>
                    </View>
                </View>

                <Text style={[styles.overline, styles.mb1]}>Automation Potential Scores</Text>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>

                    </View>

                    {subgroupsSortedByQuestionId.map(subgroup => {
                        return (
                            <>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCell_1}>
                                        <Text style={styles.subtitle2} />
                                    </View>
                                    <View style={styles.tableCell_2}>
                                        <Text style={styles.subtitle2}>{subgroup}: {parseFloat(average_scores_per_subgroup[subgroup].average).toFixed(2)}</Text>
                                    </View>
                                    <View style={styles.tableCell_3}>
                                        <Text style={styles.subtitle2}>Answer</Text>
                                    </View>
                                    <View style={styles.tableCell_3}>
                                        <Text style={styles.subtitle2}>Score</Text>
                                    </View>
                                </View>
                                <View style={styles.tableBody}>
                                    {scoresGroupedBySubgroup[subgroup].map(score => {
                                        return (
                                            <>
                                                <View style={styles.tableRow} key={'item.id'}>
                                                    <View style={styles.tableCell_1}>
                                                        {/* <Text>{score.question}</Text> */}
                                                    </View>
                                                    <View style={styles.tableCell_2}>
                                                        <Text>{score.question}</Text>
                                                    </View>
                                                    <View style={styles.tableCell_3}>
                                                        <Text>{score.answer_text}</Text>
                                                    </View>
                                                    <View style={styles.tableCell_3}>
                                                        <Text>{score.value}</Text>
                                                    </View>
                                                </View>
                                            </>
                                        )
                                    })}
                                </View>
                            </>
                        )
                    })}
                </View>
            </Page>
        </Document>
    );
}
