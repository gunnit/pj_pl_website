import React, { useState } from 'react';
import Context from './Context';

export default function ContextWrapper({ children }) {

    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState(null)
    const [currentProcessId, setCurrentProcessId] = useState(null)

    return (
        <Context.Provider value={{
            userEmail, setUserEmail,
            userId, setUserId,
            currentProcessId, setCurrentProcessId
        }}>
            {children}
        </Context.Provider>
    )
}