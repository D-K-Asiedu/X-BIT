import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, FlatList } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'
import Button from '../components/Button'
import CartItem from '../components/CartItem'

const CartScreen = ({ navigation }) => {
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
        header: {
            backgroundColor: colors.mainColor,
            justifyContent: 'flex-start'
        },
        pageTitle: {
            marginLeft: 30,
        },
        cartBox:{
            flex: 1,
        },
        footer:{
            flexDirection: 'row',
            // backgroundColor: 'red',
            paddingVertical: 10,
        }
    })


    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>
            <View style={{ ...globalStyles.header, ...styles.header }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Cart</Text>
            </View>

            <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>
                <View style={styles.cartBox}>
                    <FlatList 
                        data={[1,2,3,4]}
                        renderItem={({item, index}) => (
                            <CartItem/>
                        )}
                        keyExtractor={(item) => item}
                    />
                </View>

                <View style={styles.footer}>
                    <Button
                        title="CLEAR CART"
                        color={colors.constant}
                        bgColor={"transparent"}
                        border1={colors.constant}
                        textStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            flex: 1,
                            marginRight: 10,
                        }}
                        onPress={() => navigation.navigate('MainDrawer')}
                    />
                    <Button
                        title="CHECKOUT"
                        color='#ffffff'
                        bgColor={colors.constant}
                        textStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            flex: 1,
                            marginLeft: 10,
                        }}
                        onPress={() => navigation.navigate('Checkout')}
                    />
                </View>
            </View>

        </View>
    )
}

export default CartScreen
