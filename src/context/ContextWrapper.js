import React, { useState } from 'react';
import Context from './Context';

export default function ContextWrapper({ children }) {

    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState(null)
    const [currentProcess, setCurrentProcess] = useState(null)

    return (
        <Context.Provider value={{
            userEmail, setUserEmail,
            userId, setUserId,
            currentProcess, setCurrentProcess
        }}>
            {children}
        </Context.Provider>
    )
}