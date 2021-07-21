import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalColours } from '../styles/global'

const ErrorPageCard = () => {
    return (
        <View style={styles.errCard}>
            <Image source={require('../assets/404.png')} style={styles.img} />
            <Text style={styles.mainText}>Oops! Page not available</Text>
            <Text style={styles.secText}>Page will be added in the next update</Text>
        </View>
    )
}

export default ErrorPageCard

const styles = StyleSheet.create({
    errCard:{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        opacity: 0.8,
    },
    img:{
        width: 300,
        height: 160,
    },
    mainText:{
        textAlign: 'center',
        marginTop: 20,
        fontSize: 24,
        color: globalColours.lightGrey,
    },
    secText:{
        textAlign: 'center',
        fontSize: 14,
        color: globalColours.greyBlue,
    }
})
