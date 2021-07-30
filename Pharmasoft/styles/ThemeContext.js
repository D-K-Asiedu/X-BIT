import React, { useState, useContext } from 'react'


const ThemeContext = React.createContext()
export const ThemeUpdateContext = React.createContext()

export const useTheme = () => useContext(ThemeContext)
export const useUpdateTheme = () => useContext(ThemeUpdateContext)

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState('off')
    const [darkTheme, setDarkTheme] = useState('dim')
    const [colorTheme, setColorTheme] = useState('pink')

    const toggleDisplay = (mode, value) => {
        switch (mode) {
            case 'darkMode':
                setDarkMode(value)
                break;

            case 'darkTheme':
                setDarkTheme(value)
                break;

            case 'colorTheme':
                setColorTheme(value)
                break;


            default:
                break;
        }
    }

    return(
        <ThemeUpdateContext.Provider value = {toggleDisplay} >
        <ThemeContext.Provider value={{
            darkmode: darkMode,
            darktheme: darkTheme,
            colortheme: colorTheme,
        }}>
            {children}      
        </ThemeContext.Provider>
        </ThemeUpdateContext.Provider>
    )
}
