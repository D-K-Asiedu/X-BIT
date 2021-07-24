import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import { Ionicons } from '@expo/vector-icons'
import ErrorPageCard from '../components/ErrorPageCard'

const SettingsScreen = ({navigation}) => {
    return (
        <View style={{...globalStyles.container, backgroundColor: '#f2f2f2'}}>
            <View style={{...globalStyles.header, ...styles.header}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color={globalColours.darkBlue} />
                </TouchableOpacity>
                <Text style={{...globalStyles.h2, ...styles.h2}}>Settings</Text>
            </View>

            <View style={globalStyles.content}>
                <ErrorPageCard />
            </View>

        </View>
)}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        borderBottomColor: globalColours.lightGrey,
        borderBottomWidth: 1,
    },
    h2:{
        marginLeft: 30,
        color: globalColours.darkBlue,
    }
})

export default SettingsScreen
