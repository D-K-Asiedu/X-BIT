import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { globalColours } from '../styles/global'
import { useColor, useTheme } from '../styles/ThemeContext'

const InputField = ({
    title, 
    placeHolder, 
    focusHandler, 
    secure, 
    type, 
    onChangeText,
    value,
    autoCompleteType,
    errorMsg,
    onBlur
}) => {
    const colors = useColor()
    const theme = useTheme()
    const placeholder = placeHolder || `Enter your ${title.toLowerCase()}`

    const styles = StyleSheet.create({
        inputField: {
            marginBottom: 15,
        },
        label: {
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.secTextColor,
            paddingLeft: 10,
        },
        input:{
            borderWidth: 1,
            padding: 10,
            fontSize: 16,
            borderRadius: 10,
            color: colors.mainTextColor
        },
        errorMsg:{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'red',
            paddingLeft: 10,
        }
    })    

    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{title}</Text>
            <TextInput
             placeholder={placeholder}
             placeholderTextColor={theme.darkmode ? '#696969': '#a4a4a4'}
             style={{...styles.input, borderColor: errorMsg ? 'red' : globalColours.lightGrey }}
             onFocus={focusHandler}
             secureTextEntry={secure}
             keyboardType={type}
             onChangeText={onChangeText}
             value={value}
             autoCompleteType={autoCompleteType}
             onBlur={onBlur}
             />
             <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
    )
}

export default InputField