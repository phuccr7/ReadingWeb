


import React from 'react'
import Context from './Context'
import { useReducer } from 'react'
import reducer, { initState } from './Reducer'


export default function Provider({ children }) {


    const [state, update] = useReducer(reducer, initState)
    return (
        <div>
            <Context.Provider value={[state, update]}>
                {children}
            </Context.Provider>
        </div>
    )
}



