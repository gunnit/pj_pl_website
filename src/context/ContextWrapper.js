import React, { useState } from 'react';
import Context from './Context';

export default function ContextWrapper({ children }) {

    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState(null)
    const [currentProcessId, setCurrentProcessId] = useState(null)
    const [processCounts, setProcessCounts] = useState({})
    const [token, setToken] = useState(null)
    const [currentTaxonomy, setCurrentTaxonomy] = useState(null)
    const [taxonomyGroupId, setTaxonomyGroupId] = useState(null)
    // const [access, setAccess] = useState(null)

    return (
        <Context.Provider value={{
            userEmail, setUserEmail,
            userId, setUserId,
            currentProcessId, setCurrentProcessId,
            processCounts, setProcessCounts,
            token, setToken,
            currentTaxonomy, setCurrentTaxonomy,
            taxonomyGroupId, setTaxonomyGroupId,
            // access, setAccess,
        }}>
            {children}
        </Context.Provider>
    )
}