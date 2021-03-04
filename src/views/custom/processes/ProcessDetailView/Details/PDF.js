import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer'
import clsx from 'clsx';


export default function PDF({ processDetails: { process } }) {


    return (
        <Document>
            <Page>
                <View>
                    <Text>Process Name: {process.process_name}</Text>
                    <Text>Process Level 2 Name:{process.process_L2_process_name}</Text>
                    <Text>Process Level 3 Name: {process.process_L3_process_name}</Text>
                    <Text>Process Type:</Text>
                    <Text>Business Unit:</Text>
                    <Text>Process Team:</Text>
                    <Text>Process Sponsor:</Text>
                    <Text>Date Created:</Text>
                    <Text>Status:</Text>
                    <Text>Overview:</Text>
                    <Text>Description:</Text>
                    <Text>Documentation Available:</Text>
                    <Text>Process Owner:</Text>
                    <Text>Process SME:</Text>
                </View>
            </Page>
        </Document>
    )
}