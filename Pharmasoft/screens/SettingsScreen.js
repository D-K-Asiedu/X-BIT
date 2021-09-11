import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import { Ionicons } from '@expo/vector-icons'
import { useTheme, useUpdateTheme, useColor } from '../styles/ThemeContext'

const Section = ({title, options, state, setState}) => {  
    const colors = useColor() 
    const theme = useTheme()

    const sectionTitle = {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.secTextColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.darkmode? theme.darktheme == 'dim'? '#a4a4a4': '#999999':'#d4d4d4',
        backgroundColor: theme.darkmode? theme.darktheme == 'dim'? '#666666': '#454545': '#e8e8e8',
    }

    return(
        <View>
            <Text style={sectionTitle}>{title}</Text>
            <FlatList
                data={options}
                renderItem={({ item }) => (
                    <Selection
                        title={item}
                        active={item.toLowerCase() == state}
                        setActive={setState}
                    />
                )}
                keyExtractor={() => (Math.random() * 1000).toString()}
            />
        </View>
    )
}

const Selection = ({title, active, setActive}) => {
    const colors = useColor() 
    const theme = useTheme()

    const selection = {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#d4d4d4'
    }

    const titleStyle = {
        fontSize: 18,
        color: colors.mainTextColor,
    }

    return(
        <TouchableOpacity 
            style={selection}
            onPress = {() => setActive(title.toLowerCase())}
        >
            <Text style={titleStyle}>{title}</Text>
            <Radio active={active} />
        </TouchableOpacity>
    )
}

const Radio =  ({active, size, color}) => {
    // const [mainColor, setMainColour] = useState('')

    const theme = useTheme()
    const colors = useColor()
  
    // useEffect(() => {
    //   switch (theme.colortheme) {
    //     case 'green':
    //       setMainColour(globalColours.mainCol)
    //       break;
    //     case 'blue':
    //       setMainColour(globalColours.mainCol2)
    //       break;
    //     case 'pink':
    //       setMainColour(globalColours.mainCol3)
    //       break;
    
      
    //     default:
    //       break;
    //   }
    // }, [theme.colortheme])  

    return(
        <View style={{
            width: size || 20,
            height: size || 20,
            borderRadius: size/2 || 10,
            borderWidth: 2,
            borderColor: color || colors.constant,
            padding: 3,
            justifyContent: 'center',
        }}>
            <View style={{
                flex: 1,
                borderRadius: size/2 || 10,
                backgroundColor: active && (color || colors.constant),
            }}>

            </View>
        </View>
    )
}

const SettingsScreen = ({navigation}) => {
    const theme = useTheme()
    const colors = useColor()
    const updateTheme = useUpdateTheme()

    const [darkMode, setDarkMode] = useState(theme.darkmodeBuff)
    const [darkTheme, setDarkTheme] = useState(theme.darktheme)
    const [colorTheme, setColorTheme] = useState(theme.colortheme)
    // const [mainColor, setMainColour] = useState('')

  
    // useEffect(() => {
    //   switch (theme.colortheme) {
    //     case 'green':
    //       setMainColour(globalColours.mainCol)
    //       break;
    //     case 'blue':
    //       setMainColour(globalColours.mainCol2)
    //       break;
    //     case 'pink':
    //       setMainColour(globalColours.mainCol3)
    //       break;
    
      
    //     default:
    //       break;
    //   }
    // }, [theme.colortheme])

    const updateColorTheme = (val) => {
        updateTheme('colorTheme', val)
        setColorTheme(val)
    }

    const updateDarkMode = (val) => {
        updateTheme('darkMode', val)
        setDarkMode(val)
    }

    const updateDarkTheme = (val) => {
        updateTheme('darkTheme', val)
        setDarkTheme(val)
    }


    const header = {
        justifyContent: 'flex-start',
        borderBottomColor: theme.darkmode? '#666666':'#d4d4d4',
        borderBottomWidth: 1,
    }
  

    return (
        <View style={{...globalStyles.container, backgroundColor: colors.mainColor}}>
            <View style={{...globalStyles.header, ...header, backgroundColor: colors.mainColor}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{...globalStyles.h2, ...styles.h2}}>Settings</Text>
            </View>

            <View style={{...globalStyles.content, paddingHorizontal: 0, paddingTop: 0, backgroundColor: colors.secBgColor}}>
                <Section 
                    title="Dark mode" 
                    options={['Off', 'On']} 
                    state={darkMode}
                    setState={updateDarkMode} 
                />
                <Section 
                    title="Dark theme" 
                    options={['Dim', 'Lights out']} 
                    state={darkTheme} 
                    setState={updateDarkTheme} 
                />
                <Section 
                    title="Color theme" 
                    options={['Green', 'Blue', 'Pink']} 
                    state={colorTheme} 
                    setState={updateColorTheme} 
                />
            </View>

        </View>
)}

const styles = StyleSheet.create({
    h2:{
        marginLeft: 30,
    },
    status:{
        fontSize: 14,
        fontWeight: 'bold',
        color: globalColours.lightGrey,
    }
})

export default SettingsScreen
