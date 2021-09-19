import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'
import Button from '../components/Button'

const CheckoutScreen = ({ navigation }) => {
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

    const CheckoutCard = () => {
        return(
            <View style={styles.checkoutCard}>
                <Text style={{...styles.checkoutCardText,flexBasis: '60%'}}>Medicine</Text>
                <Text style={{...styles.checkoutCardText,flexBasis: '20%'}}>69</Text>
                <Text style={{...styles.checkoutCardText,flexBasis: '20%'}}>GHC 30.00</Text>
            </View>
        )
    }

    const styles = StyleSheet.create({
        header: {
            backgroundColor: colors.mainColor,
            justifyContent: 'flex-start',
        },
        content: {
            backgroundColor: colors.mainBgColor,
            paddingTop: 10,
        },
        pageTitle: {
            marginLeft: 30,
        },
        mainCard: {
            backgroundColor: colors.secBgColor,
            borderRadius: 20,
            flex: 1,
            padding: 20,
            // marginBottom: 20,

            elevation: 1,
        },
        h3: {
            color: colors.tetColor2,
            paddingLeft: 20,
            paddingVertical: 10
        },
        cardHeader:{
            flexDirection: 'row',
        },
        cardHeaderTitle:{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.tetTextColor,
            borderBottomWidth: 1,
            borderColor: '#c4c4c4dd',
            paddingBottom: 10,
        },
        checkoutCard:{
            paddingVertical: 20,
            // borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#c4c4c4aa',
            flexDirection: 'row',
        },
        checkoutCardText:{
            fontSize: 16,
            color: colors.secTextColor,
        },
        cardFooter:{
            paddingTop: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        footer: {
            paddingHorizontal: '5%',
            paddingVertical: 20,
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
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Checkout</Text>
            </View>

            <View style={{ ...globalStyles.content, ...styles.content }}>
                <Text style={{ ...globalStyles.h3, ...styles.h3 }}>Product summary</Text>
                <View style={styles.mainCard}>
                    <View style={styles.cardHeader}>
                        <Text style={{...styles.cardHeaderTitle,flexBasis: '60%'}}>Product name</Text>
                        <Text style={{...styles.cardHeaderTitle,flexBasis: '20%'}}>Quantity</Text>
                        <Text style={{...styles.cardHeaderTitle,flexBasis: '20%'}}>Amount</Text>
                    </View>
                    <ScrollView>
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
                    </ScrollView>
                    <View style={styles.cardFooter}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: colors.secTextColor
                        }}>Total: </Text>
                        <Text style={{...styles.checkoutCardText, fontSize: 18, color: colors.tetColor2}}>GHC 699.99</Text>
                    </View>

                </View>
                <View style={styles.footer}>
                    <Button
                        title="BUY NOW"
                        color='#ffffff'
                        bgColor={colors.constant}
                        textStyle={{
                            fontSize: 16,
                        }}
                        onPress={() => navigation.navigate('MainDrawer')}
                    //   style={{ marginTop: 15, }}
                    //   onPress={props.handleSubmit}
                    />
                </View>

            </View>

        </View>
    )
}

export default CheckoutScreen
