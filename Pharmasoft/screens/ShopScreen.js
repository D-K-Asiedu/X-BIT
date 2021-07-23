import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'

const ShopScreen = () => {
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <TouchableOpacity>
                    <Feather name="menu" size={30} color='white' />
                </TouchableOpacity>
                <Text style={globalStyles.h2}>Shop</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color='white' />
                </TouchableOpacity>
            </View>

            <View style={globalStyles.content}>
                <ErrorPageCard />
            </View>

        </View>
    )
}

export default ShopScreen
