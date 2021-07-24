import React, {useState, useContext} from 'react'

const AuthContext = React.createContext({
    authValue: {isLoggedIn: false, isSkipped: false},
    setAuthValue: () => {},    
})



    // const [auth, setAuth] = useState({ isLoggedIn: false, isSkipped: false })

    // const updateAuth = (authValues) => {
    //     setAuth(prevAuthValue => ({...prevAuthValue, ...authValues}))
    // } 
