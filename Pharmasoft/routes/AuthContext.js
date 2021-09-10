import React, { useState, useContext, useEffect } from 'react'


const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()

export const useAuth = () => useContext(AuthContext)
export const useUpdateAuth = () => useContext(AuthUpdateContext)

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [skipped, setSkipped] = useState(false)
    const [user, setUser] = useState()

    // useEffect(() => {
    //     // If logged in
    //     fetchUser().name && setLoggedIn(true)
    // }, [])



    // Fetch user
    const fetchUser = async () => {
        const res = await fetch('http://100.119.8.18:5000/profile', {
            method: 'GET',
        }) 
        const data = await res.json()
        return data
    }

    // Login to system
    const login = async(data) => {
        const res = await fetch('http://100.119.8.18:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(data),
        })

        try{
            const userLogin = await res.json()
            setLoggedIn(userLogin["login"])
        } catch(e){
            console.log(e);
        }
        loggedIn && setUser(await fetchUser())
    }

    // Register account


    const toggleAuth = (value, data) => {
        switch (value) {
            case 'skip':
                setSkipped(true)
                break;

            case 'login':
                login(data)
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
