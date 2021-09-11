import React, { useState, useContext, useEffect } from 'react'
import { showMessage, hideMessage } from "react-native-flash-message";


const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()

export const useAuth = () => useContext(AuthContext)
export const useUpdateAuth = () => useContext(AuthUpdateContext)

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [skipped, setSkipped] = useState(false)
    const [user, setUser] = useState({})

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

        try {
            const userLogin = await res.json()
            setLoggedIn(userLogin["login"])

            // Login succesful alert
            showMessage({
                message: "Login successful",
                type: "success",
                floating: true,
                icon: 'auto',
                duration: 1500,
                position: {
                    top: 30,
                },
                titleStyle: {
                    fontSize: 16,
                },
                style: {

                }
            });

        } catch (e) {
            console.log(e);

            // Login unsuccessful alert
            !loggedIn && showMessage({
                message: "Login failed",
                description: "Invalid username or password",
                type: "danger",
                floating: true,
                icon: 'auto',
                duration: 1500,
                position: {
                    top: 30,
                },
                titleStyle: {
                    fontSize: 16,
                },
                style: {

                }
            });

        }


        loggedIn && console.log(await fetchUser())
        loggedIn && setUser(await fetchUser())
    }

    // Register account

    // Logout
    const logout = async () => {
        // const res = await fetch('http://100.119.8.18:5000/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         },
        //     body: JSON.stringify(data),
        // })

        setSkipped(false)
        setLoggedIn(false)
    }

    const toggleAuth = (value, data) => {
        switch (value) {
            case 'skip':
                setSkipped(true)
                break;

            case 'login':
                login(data)
                break;

            case 'logout':
                logout()
                break;


            default:
                break;
        }
    }

    return(
        <AuthUpdateContext.Provider value = {toggleAuth} >
        <AuthContext.Provider value={{
            isLoggedIn: loggedIn,
            isSkipped: skipped,
            user: user,
        }}>
            {children}      
        </AuthContext.Provider>
        </AuthUpdateContext.Provider>
    )
}
