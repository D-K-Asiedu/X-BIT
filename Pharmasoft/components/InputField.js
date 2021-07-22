import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const InputField = ({title}) => {
    const placeholder = `Enter your ${title}`

    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{title}</Text>
            <TextInput
             placeholder={placeholder}
             style={styles.input}
             />
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
        borderColor: '#808080',
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
    }
})
