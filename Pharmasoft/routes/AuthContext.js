import React, { useState, useContext, useEffect } from 'react'
import { showMessage, hideMessage } from "react-native-flash-message";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColor } from '../styles/ThemeContext';


const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()

export const useAuth = () => useContext(AuthContext)
export const useUpdateAuth = () => useContext(AuthUpdateContext)

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [skipped, setSkipped] = useState(false)
    const [validated, setValidated] = useState(false)
    const [user, setUser] = useState({})
    const server = 'http://100.119.11.78:5000/'

    // useEffect(() => {
    //     // If logged in
    //     fetchUser().name && setLoggedIn(true)
    // }, [])

    const colors = useColor()


    // Fetch user
    const fetchUser = async () => {
        const res = await fetch(`${server}/profile`, {
            method: 'GET',
        })
        const data = await res.json()
        return data
    }

    // Login to system
    const login = async (data) => {
        const res = await fetch(`${server}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try {
            const userLogin = await res.json()
            console.log(userLogin);
            setLoggedIn(userLogin["login"])

            // Login succesful alert
            showMessage({
                message: userLogin["login"] ? "Login successful" : "Login Failed",
                description: data.msg || userLogin["msg"],
                type: userLogin["login"] ? "success" : "danger",
                floating: true,
                icon: 'auto',
                duration: 2000,
                position: {
                    top: 30,
                },
                titleStyle: {
                    fontSize: 16,
                },
                style: {
                    borderWidth: 1,
                    borderColor: '#ffffff33'
                }
            });

            // console.log(await fetchUser())
            userLogin["login"] && setUser(await fetchUser())

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
        return false

    }

    // Logout
    const logout = async () => {
        const res = await fetch(`${server}/logout`, {
            method: 'GET',
        })

        setSkipped(false)
        setLoggedIn(false)
    }

    // Validate password
    const validatePassword = async (data) => {
        console.log(data)

        const res = await fetch(`${server}/validate-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        try {
            const pass = await res.json()
            setValidated(pass.validate)
            
            //Stupid fix
            // setTimeout(() => setValidated(false), 1000)

            // Login succesful alert
            !pass.validate && showMessage({
                message: "Invalid password",
                type: "danger",
                floating: true,
                icon: 'auto',
                duration: 2000,
                position: {
                    top: 30,
                },
                titleStyle: {
                    fontSize: 16,
                },
                style: {
                    borderWidth: 1,
                    borderColor: '#ffffff33'
                }
            });

            console.log(await fetchUser())
            setUser(await fetchUser())

        } catch (e) {
            console.log(e);

            // Login unsuccessful alert
            showMessage({
                message: "Validation failed",
                description: "Unknown technical error",
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
    }


    // Update
    const updateUser = async () => {
        setUser(await fetchUser())
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
            case 'validate':
                validatePassword(data)
                break;
            case 'validateOff':
                setValidated(false)
                break;
            case 'user':
                updateUser()
                break;



            default:
                break;
        }
    }


    return (
        <AuthUpdateContext.Provider value={toggleAuth} >
            <AuthContext.Provider value={{
                isLoggedIn: loggedIn,
                isSkipped: skipped,
                user: user,
                server: server,
                validated: validated
            }}>
                {children}
            </AuthContext.Provider>
        </AuthUpdateContext.Provider>
    )
}
