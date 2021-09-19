import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'

const CheckoutScreen = ({navigation}) => {
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
        header:{
            backgroundColor: colors.mainColor,
            justifyContent: 'flex-start',
        },
        pageTitle:{
            marginLeft: 30,
        },
        mainCard:{
            
        }
    })


    return (
        <View style={{...globalStyles.container, backgroundColor: colors.mainColor}}>
            <View style={{...globalStyles.header, ...styles.header}}>
            <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="#ffffff"/>
                </TouchableOpacity>
                <Text style={{...globalStyles.h2, ...styles.pageTitle}}>Checkout</Text>
            </View>

            <View style={{...globalStyles.content, backgroundColor: colors.mainBgColor}}>
                <View style={styles.mainCard}>

                </View>
            </View>

        </View>
    )
}

export default CheckoutScreen
