import React, { useState, useContext } from 'react'


const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()

export const useAuth = () => useContext(AuthContext)
export const useUpdateAuth = () => useContext(AuthUpdateContext)

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [skipped, setSkipped] = useState(false)

    const toggleAuth = (value) => {
        switch (value) {
            case 'skip':
                setSkipped(true)
                break;

            case 'login':
                setLoggedIn(true)
                break;

            case 'logout':
                setSkipped(false)
                setLoggedIn(false)
                break;


            default:
                break;
        }
    }

    return(
        <AuthUpdateContext.Provider value = {toggleAuth} >
        <AuthContext.Provider value={{
            isLoggedIn: loggedIn,
            isSkipped: skipped
        }}>
            {children}      
        </AuthContext.Provider>
        </AuthUpdateContext.Provider>
    )
}
