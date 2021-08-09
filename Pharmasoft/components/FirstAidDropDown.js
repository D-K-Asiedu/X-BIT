import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useColor } from '../styles/ThemeContext'

const FirstAidDropDown = ({content, color, set}) => {
    const colors = useColor()

    const styles = StyleSheet.create({
        dropDown:{
            borderRadius: 20,
            padding: 15,
            position: 'absolute',
            left: 125,
            top: 140,
            elevation: 5,
            backgroundColor: colors.secBgColor,
            //borderWidth: 1,
        },
        text:{
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: 'bold',
        }
    })

    return (
        <View style={{...styles.dropDown, /*borderColor: color*/}}>
           {content[0] && <TouchableOpacity><Text style={{...styles.text, color: color}} onPress={() => set(1)}>{content[0]}</Text></TouchableOpacity>}
           {content[1] && <TouchableOpacity><Text style={{...styles.text, color: color}} onPress={() => set(2)}>{content[1]}</Text></TouchableOpacity>}
           {content[2] && <TouchableOpacity><Text style={{...styles.text, color: color}} onPress={() => set(3)}>{content[2]}</Text></TouchableOpacity>}
        </View>
    )
}

export default FirstAidDropDown