import React, { useState } from 'react';
import Context from './Context';

export default function ContextWrapper({ children }) {

    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState(null)
    const [ideas, setIdeas] = useState(null)

    return (
        <Context.Provider value={{
            userEmail, setUserEmail,
            userId, setUserId,
            ideas, setIdeas,
        }}>
            {children}
        </Context.Provider>
    )
}