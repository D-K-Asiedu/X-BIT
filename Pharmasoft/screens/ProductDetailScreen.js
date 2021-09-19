import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'
import Button from '../components/Button'

const ProductDetailScreen = ({ navigation }) => {
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
        content: {
            backgroundColor: colors.secBgColor,
            paddingHorizontal: 0,
            paddingTop: 0,
            borderTopStartRadius: 0,
            borderTopEndRadius: 0,
        },
        imageBox: {
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secBgColor,
            paddingBottom: 70,
        },
        textBox:{
            paddingTop: 20,
            paddingBottom: 5,
        },
        title:{
            color: colors.tetColor2,
        },
        desc:{
            fontSize: 16,
            color: colors.mainTextColor,
        },
        footer:{
            width: '90%',
            position: 'absolute',
            bottom: 20,
            right: '5%',
        }
    })


    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.secBgColor }}>
            <View style={{ ...globalStyles.header, backgroundColor: colors.secBgColor, }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color={colors.constant} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate('MainDrawer')}>
                    <FontAwesome5 name="cart-plus" size={22} color="#ffffff" />
                </TouchableOpacity> */}
            </View>


            <View style={{ ...globalStyles.content, ...styles.content }}>
                <View style={styles.imageBox}>
                    <Image style={{ width: 150, height: 150, }} source={require('../assets/home-images/medicine.png')} />
                </View>
                <View style={{...globalStyles.content, ...styles.textBox}}>
                    <ScrollView>
                        <Text style={{...globalStyles.h2, ...styles.title}}>Medicine</Text>
                        <Text style={styles.desc}>Lorem ipsum medicine description and other thing we would like to say ok</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.footer}>
                <Button
                  title="ADD TO CART"
                  color='#ffffff'
                  bgColor={colors.constant}
                  textStyle={{
                      fontSize: 16
                  }}
                //   style={{ marginTop: 15, }}
                //   onPress={props.handleSubmit}
                />
            </View>


        </View>
    )
}

export default ProductDetailScreen
