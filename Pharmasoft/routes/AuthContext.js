import React, { useState, useContext, useEffect } from 'react'
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingView from '../components/LoadingView'


const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()

export const useAuth = () => useContext(AuthContext)
export const useUpdateAuth = () => useContext(AuthUpdateContext)

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [skipped, setSkipped] = useState(false)
    const [validated, setValidated] = useState(false)
    const [user, setUser] = useState({})
    const [isLoaded, setIsLoaded] = useState(true)

    const server = 'https://pharmasoftgh.herokuapp.com'

    // Load auth from storage
    useEffect(() => {
        const tempFunc = async () => {
            await loadAuth()
        }

        tempFunc()
    }, [])

    // Save info to storage
    const saveSkipped = async (value) => {
        try{
            const temp = value.toString()
            await AsyncStorage.setItem("skipped", temp)
        }
        catch(e){
            console.log(e);
        }
    }

    const saveLogggedIn = async (value) => {
        try{
            const temp = value.toString()
            console.log(temp);
            await AsyncStorage.setItem("loggedIn", temp)
        }
        catch(e){
            console.log(e);
        }
    }

    const saveUser = async (value) => {
        try{
            await AsyncStorage.setItem("user", JSON.stringify(value))
        }
        catch(e){
            console.log(e);
        }
    }

    // Remove user from storage
    const removeUser = async () => {
        try{
            await AsyncStorage.removeItem("user")
        }
        catch(e){
            console.log(e);
        }
    }

    // Load auth details from storage
    const loadAuth = async() => {
        try{
            const skipped = await AsyncStorage.getItem("skipped")
            const loggedIn = await AsyncStorage.getItem("loggedIn")
            const user = await AsyncStorage.getItem("user")

            console.log(skipped, loggedIn, user)

            if(skipped != null){
                const temp = (skipped === 'true')
                setSkipped(temp)
            }
            if(loggedIn != null){
                const temp = (loggedIn === 'true')
                setLoggedIn(temp)
            }
            if(user != null){
                setUser(JSON.parse(user))
            }

        }
        catch(e){
            console.log(e);
        }

    }




    // Fetch user
    const fetchUser = async () => {
        const res = await fetch(`${server}/profile`, {
            method: 'GET',
        })
        const data = await res.json()
        return data
    }


    // Logout
    const logout = async () => {
        const res = await fetch(`${server}/logout`, {
            method: 'GET',
        })

        saveSkipped(false)
        saveLogggedIn(false)
        removeUser()

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
        const tempUser = await fetchUser()

        saveUser(tempUser)
        setUser(tempUser)
    }


    const toggleAuth = (value, data) => {
        switch (value) {
            case 'skip':
                saveSkipped(true)
                setSkipped(true)
                break;

            case 'login':
                saveLogggedIn(true)
                setLoggedIn(true)
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
                {isLoaded && children}
                {!isLoaded && <LoadingView size={45} color="#1ba665" />}
            </AuthContext.Provider>
        </AuthUpdateContext.Provider>
    )
}
