import React, { useState, useContext, useEffect } from 'react'
import { globalColours } from './global'


const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()
const ColorContext = React.createContext()

export const useTheme = () => useContext(ThemeContext)
export const useUpdateTheme = () => useContext(ThemeUpdateContext)
export const useColor = () => useContext(ColorContext)

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    const [darkModeBuffer, setDarkModeBuffer] = useState('off')
    const [darkTheme, setDarkTheme] = useState('dim')
    const [colorTheme, setColorTheme] = useState('green')
    const [mainColour, setMainColour] = useState('')

    const toggleDisplay = (mode, value) => {
        switch (mode) {
            case 'darkMode':
                setDarkModeBuffer(value)
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

    useEffect(() => {
        switch (darkModeBuffer) {
            case 'on':
                setDarkMode(true)
                break;

            case 'off':
                setDarkMode(false)
                break;

            case 'system':
                setDarkMode(true)
                break;


            default:
                break;
        }
    }, [darkModeBuffer])

    useEffect(() => {
        switch (colorTheme) {
          case 'green':
            setMainColour(globalColours.mainCol)
            break;
          case 'blue':
            setMainColour(globalColours.mainCol2)
            break;
          case 'pink':
            setMainColour(globalColours.mainCol3)
            break;
      
        
          default:
            break;
        }
      }, [colorTheme])
      

    // COLOURS
    const lightColors = {
        constant: mainColour,
        mainColor: mainColour,
        secColor1: '',
        secColor2: '',
        tetColor1: globalColours.darkBlue,
        tetColor2: globalColours.greyBlue,
        tetColor3: globalColours.yellow,
        mainBgColor: '#f2f2f2',
        secBgColor: '#ffffff',
        mainTextColor: globalColours.darkGrey,
        secTextColor: globalColours.lightGrey,
        tetTextColor: globalColours.grey,
    }

    const dimColors = {
        constant: mainColour,
        mainColor: mainColour,
        secColor1: '',
        secColor2: '',
        tetColor1: '#ffffff',
        tetColor2: '#d4d4d4',
        tetColor3: globalColours.yellow,
        mainBgColor: '#333333',
        secBgColor: '#222222',
        mainTextColor: '#f2f2f2',
        secTextColor: '#ffffff',
        tetTextColor: globalColours.lightGrey,
    }

    const blackColors = {
        constant: mainColour,
        mainColor: '#333333',
        secColor1: '',
        secColor2: '',
        tetColor1: '#ffffff',
        tetColor2: '#d4d4d4',
        tetColor3: globalColours.yellow,
        mainBgColor: '#222222',
        secBgColor: '#000000',
        mainTextColor: '#f2f2f2',
        secTextColor: '#ffffff',
        tetTextColor: globalColours.lightGrey,
    }


    return(
        <ThemeUpdateContext.Provider value={toggleDisplay} >
            <ThemeContext.Provider value={{
                darkmode: darkMode,
                darkmodeBuff: darkModeBuffer,
                darktheme: darkTheme,
                colortheme: colorTheme,
            }}>
                <ColorContext.Provider value={darkMode ? darkTheme == 'dim' ? dimColors: blackColors: lightColors}>
                    {children}
                </ColorContext.Provider>
            </ThemeContext.Provider>
        </ThemeUpdateContext.Provider>
    )
}
