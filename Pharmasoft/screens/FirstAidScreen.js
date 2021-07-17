import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import FirstAidCard from '../components/FirstAidCard'
import {Feather, Ionicons} from '@expo/vector-icons'
import NavBar from '../components/NavBar'

const FirstAidScreen = ({firstAid}) => {
    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <View style={styles.iconBox1}>
                    <Feather name="menu" size={30} color='white' />
                </View>
                <Text style={styles.h2}>First aid guide</Text>
                <View style={styles.iconBox2}>
                    <Ionicons name="search" size={24} color='white' />
                </View>
            </View>

            <View style={styles.content}>
                <FlatList
                    data = {firstAid}
                    renderItem = {({item}) => (
                        <FirstAidCard title={item.title} color={item.color} description = {item.description} />
                    )}
                    keyExtractor = {firstAid => firstAid.id}
                />
            </View>

            <NavBar active = 'first-aid' />
        </View>
    )
};

export default FirstAidScreen

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        height: 100,
        backgroundColor: globalColours.mainCol,
        paddingTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    h2:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    content:{
        flex: 1,
        paddingTop: 2,
        paddingHorizontal: 20,
        backgroundColor: '#f2f2f2',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30, 
    },
})