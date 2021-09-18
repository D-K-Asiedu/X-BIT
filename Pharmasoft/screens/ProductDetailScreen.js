import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'

const ProductDetailScreen = ({navigation}) => {
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

    //Styles
    const styles = StyleSheet.create({
    })


    return (
        <View style={{...globalStyles.container, backgroundColor: colors.mainColor}}>
            <View style={{...globalStyles.header, backgroundColor: colors.mainColor}}>
            <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="#ffffff"/>
                </TouchableOpacity>
                <Text style={globalStyles.h2}>Product details</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MainDrawer')}>
                    <FontAwesome5 name="cart-plus" size={22} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={{...globalStyles.content, backgroundColor: colors.mainBgColor}}>
            </View>

        </View>
    )
}

export default ProductDetailScreen
