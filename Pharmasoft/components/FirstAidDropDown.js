import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useColor } from '../styles/ThemeContext'
import { Ionicons } from '@expo/vector-icons'

const FirstAidDropDown = ({ content, color, set, close }) => {
    const colors = useColor()

    const styles = StyleSheet.create({
        dropDown: {
            borderRadius: 20,
            padding: 15,
            position: 'absolute',
            left: 125,
            top: 140,
            elevation: 5,
            backgroundColor: colors.secBgColor,
        },
        text: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 16,
            fontWeight: 'bold',
        },
        closeBtn: {
            alignSelf: 'flex-end'
        }
    })

    return (
        <View style={{ ...styles.dropDown, /*borderColor: color*/ }}>
            <TouchableOpacity onPress={close}>
                <Ionicons name='close' size={15} color={color} style={styles.closeBtn} />
            </TouchableOpacity>
            {content[0] && <TouchableOpacity><Text style={{ ...styles.text, color: color }} onPress={() => set(1)}>{content[0]}</Text></TouchableOpacity>}
            {content[1] && <TouchableOpacity><Text style={{ ...styles.text, color: color }} onPress={() => set(2)}>{content[1]}</Text></TouchableOpacity>}
            {content[2] && <TouchableOpacity><Text style={{ ...styles.text, color: color }} onPress={() => set(3)}>{content[2]}</Text></TouchableOpacity>}
        </View>
    )
}

export default FirstAidDropDown