import React, { useState } from 'react'

export const StoreContext = React.createContext(null)
// eslint-disable-next-line
export default ({ children }) => {
    const [ user, setUser ] = useState({})

    const store = {
        user: user,
        setUser: setUser
    }

    return (
        <StoreContext.Provider value={store}>
            { children }
        </StoreContext.Provider>
    )
}
