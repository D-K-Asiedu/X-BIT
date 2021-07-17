import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalColours } from '../styles/global'
import { Ionicons, Fontisto, FontAwesome5 } from '@expo/vector-icons';

const NavBar = ({active}) => {
    return (
        <View style={styles.navbar}>
            <View style={styles.pageBtn}>
                <Ionicons name="home" size={active=='home'?38:25} color={active=='home'?globalColours.mainCol:globalColours.lightGrey} />
                {active!='home' && <Text style={styles.miniText}>Home</Text>}
            </View>
            <View style={styles.pageBtn}>
                <Fontisto name="shopping-store" size={active=='shop'?33:20} color={active=='shop'?globalColours.mainCol:globalColours.lightGrey} />
                {active!='shop' && <Text style={styles.miniText}>Shop</Text>}
            </View>
            <View style={styles.pageBtn}>
                <FontAwesome5 name="first-aid" size={active=='first-aid'?35:22} color={active=='first-aid'?globalColours.mainCol:globalColours.lightGrey} />
                {active!='first-aid' && <Text style={styles.miniText}>First aid</Text>}
            </View>

        </View>
    )
}

export default NavBar

const styles = StyleSheet.create({
    navbar:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#ffffff',

        borderTopWidth: 1,
        borderTopColor: 'rgba(99,99,99,0.2)',
    },
    pageBtn:{
        alignItems: 'center',
    },
    miniText:{
        fontSize: 12,
        fontWeight: 'bold',
        color: globalColours.lightGrey,
        textAlign: 'center',
    }
})
