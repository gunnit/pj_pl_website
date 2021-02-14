import React, { useState } from 'react';
import Context from './Context';

export default function ContextWrapper({ children }) {

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}