import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { globalColours } from '../styles/global'

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
    const placeholder = placeHolder || `Enter your ${title.toLowerCase()}`

    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{title}</Text>
            <TextInput
             placeholder={placeholder}
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

const styles = StyleSheet.create({
    inputField: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#808080',
        paddingLeft: 10,
    },
    input:{
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
    },
    errorMsg:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'tomato',
        paddingLeft: 10,
    }
})
