import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'

const HomeScreen = ({navigation}) => {
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
  

    return (
        <View style={{...globalStyles.container, backgroundColor: colors.mainColor}}>
            <View style={{...globalStyles.header, backgroundColor: colors.mainColor}}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                >
                    <Feather name="menu" size={30} color='#ffffff' />
                </TouchableOpacity>
                <Text style={globalStyles.h2}>Home</Text>
                <TouchableOpacity>
                    <FontAwesome name="bell" size={20} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={{...globalStyles.content, backgroundColor: colors.mainBgColor}}>
                <ErrorPageCard />
            </View>

        </View>
    )
}

export default HomeScreen
