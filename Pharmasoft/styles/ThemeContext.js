import React, { useState, useContext, useEffect } from 'react'
import { globalColours } from './global'
import { useColorScheme, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'

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
    const [isLoaded, setIsLoaded] = useState(false)

    // Load storage info on startup
    useEffect(() => {
        const tempFunc = async () => {
            await loadSettings()
        }

        tempFunc()
    }, [])

    // Store theme details
    const saveDarkMode = async (value) => {
        try{
            await AsyncStorage.setItem("darkMode", value)
        }
        catch(e){
            console.log(e);
        }
    }

    const saveDarkTheme = async (value) => {
        try{
            await AsyncStorage.setItem("darkTheme", value)
        }
        catch(e){
            console.log(e);
        }
    }

    const saveColorTheme = async (value) => {
        try{
            await AsyncStorage.setItem("colorTheme", value)
        }
        catch(e){
            console.log(e);
        }
    }

    // Load theme details from storage
    const loadSettings = async() => {
        try{
            const darkMode = await AsyncStorage.getItem("darkMode")
            const darkTheme = await AsyncStorage.getItem("darkTheme")
            const colorTheme = await AsyncStorage.getItem("colorTheme")

            if(darkMode != null){
                setDarkModeBuffer(darkMode)
            }
            if(darkTheme != null){
                setDarkTheme(darkTheme)
            }
            if(colorTheme != null){
                setColorTheme(colorTheme)
            }

        }
        catch(e){
            console.log(e);
        }
        finally{
            setTimeout(() => {
                setIsLoaded(true)
            }, 500);
        }

    }



    const toggleDisplay = async (mode, value) => {
        switch (mode) {
            case 'darkMode':
                saveDarkMode(value)
                setDarkModeBuffer(value)
                break;

            case 'darkTheme':
                saveDarkTheme(value)
                setDarkTheme(value)
                break;

            case 'colorTheme':
                saveColorTheme(value)
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
                // console.log(colorScheme == 'dark');
                // setDarkMode(colorScheme == 'dark')
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
                    {isLoaded && children}
                    {!isLoaded && 
                        <View style={{flex:1, backgroundColor: darkMode? '#333333': '#f2f2f2', justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size={45} color={mainColour} />
                        </View>
                    }
                </ColorContext.Provider>
            </ThemeContext.Provider>
        </ThemeUpdateContext.Provider>
    )
}
