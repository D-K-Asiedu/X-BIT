import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const images = {
    "google": require('../assets/google.png')
}

const Button = ({title, color, bgColor, border1, image, style}) => {
    const border = border1 && {borderWidth: 1}

    return (
        <TouchableOpacity style={{...styles.button, backgroundColor: bgColor, borderColor: border1, ...border, ...style }}>
            {image && <Image source={images[image]} style={styles.img} />}
            <Text style={{...styles.text, color: color}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button:{
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    img:{
        width: 25,
        height: 25,
        marginHorizontal: 10,
    },
})
