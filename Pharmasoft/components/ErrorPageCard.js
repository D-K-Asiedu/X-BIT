import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { globalColours } from '../styles/global'
import { useColor } from '../styles/ThemeContext'

const ErrorPageCard = () => {
    const colors = useColor()

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
            color: colors.secTextColor,
        },
        secText:{
            textAlign: 'center',
            fontSize: 14,
            color: colors.tetColor2,
        }
    })    

    return (
        <View style={styles.errCard}>
            <Image source={require('../assets/404.png')} style={styles.img} />
            <Text style={styles.mainText}>Oops! Page not available</Text>
            <Text style={styles.secText}>Page will be added in the next update</Text>
        </View>
    )
}

export default ErrorPageCard