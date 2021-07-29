import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Divider = () => {
    return (
        <View style={styles.divider}></View>
    )
}

export default Divider

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 30
    },
})
