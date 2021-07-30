import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme } from '../styles/ThemeContext'

const ShopScreen = ({navigation}) => {
    const [mainColor, setMainColour] = useState('')

    const theme = useTheme()
  
    useEffect(() => {
      switch (theme.colortheme) {
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
    }, [theme.colortheme])


    return (
        <View style={{...globalStyles.container, backgroundColor: mainColor}}>
            <View style={{...globalStyles.header, backgroundColor: mainColor}}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                >
                    <Feather name="menu" size={30} color='white' />
                </TouchableOpacity>
                <Text style={globalStyles.h2}>Shop</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color='white' />
                </TouchableOpacity>
            </View>

            <View style={globalStyles.content}>
                <ErrorPageCard />
            </View>

        </View>
    )
}

export default ShopScreen
