import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import FirstAidCard from '../components/FirstAidCard'
import {Feather, Ionicons} from '@expo/vector-icons'
import NavBar from '../components/NavBar'

const FirstAidScreen = ({firstAid}) => {
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <View>
                    <Feather name="menu" size={30} color='white' />
                </View>
                <Text style={globalStyles.h2}>First aid guide</Text>
                <View>
                    <Ionicons name="search" size={24} color='white' />
                </View>
            </View>

            <View style={globalStyles.content}>
                <FlatList
                    data = {firstAid}
                    renderItem = {({item}) => (
                        <FirstAidCard title={item.title} bgColor={globalColours.firstAid[item.image]} image={item.image} description = {item.description} />
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
})