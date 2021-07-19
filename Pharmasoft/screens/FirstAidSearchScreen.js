import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/global'
import { Ionicons } from '@expo/vector-icons'
import firstAidData from '../data/firstAidData';


const FirstAidSearchScreen = ({navigation}) => {

    return (
        <View style={globalStyles.container}>
            <View style={{ ...globalStyles.header, ...styles.header }}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={25} color="#ffffff" onPress = {()=>navigation.goBack()}/>
                </TouchableOpacity>
                <TextInput 
                    style={styles.searchBar} 
                    placeholder="Search here ..." 
                    autoFocus={true}
                />
                <TouchableOpacity>
                    <Ionicons name="search" size={20} color='white' onPress={() => {console.log('search')}} />
                </TouchableOpacity>
            </View>

            <View style={globalStyles.content}>

            </View>
        </View>
    )
}

export default FirstAidSearchScreen

const styles = StyleSheet.create({
    header:{
        
    },
    searchBar:{
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        marginHorizontal: 20,
    }
})
