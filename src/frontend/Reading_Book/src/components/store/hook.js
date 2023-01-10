



import React, { useContext } from 'react'
import Context from './Context'

export const useStore = () => {
    const [state, update] = useContext(Context)
    return (
        [state, update]
    )
}
