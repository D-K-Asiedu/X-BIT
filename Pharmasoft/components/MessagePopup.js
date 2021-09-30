import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    Modal
} from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'
import { Ionicons } from '@expo/vector-icons';

const MessagePopup = ({message, type}) => {
    const colors = useColor()
    const { height, width } = Dimensions.get('window')

    // useEffect(() => {
    //     console.log(height, width);
    // }, [])

    // Styles
    const styles = StyleSheet.create({
        modal: {
            alignItems: 'center',
            position: 'absolute',
            bottom: height/ 20,
            width: '100%'
        },
        modalBox: {
            borderRadius: 20,
            backgroundColor: '#333333aa',
            paddingVertical: 7,
            paddingHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center',
        },
        boxText: {
            fontSize: 16,
            color: '#ffffff',
            // textShadowOffset: {
            //     width: 1,
            //     height: 1
            // },
            // textShadowColor: '#00000099',
            // textShadowRadius: 1,
            marginLeft: 5
        },


    })


    return (
        <View style={styles.modal}>
                <View style={styles.modalBox}>
                    <Ionicons name={type ? "checkmark-circle" : "close-circle"} size={20} color="#ffffff" />
                    <Text style={styles.boxText}>{message || "lorem ipsum"}</Text>
                </View>
        </View>

    )
}

export default MessagePopup