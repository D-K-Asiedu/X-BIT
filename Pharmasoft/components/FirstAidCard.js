import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalColours } from '../styles/global'
import { Entypo } from '@expo/vector-icons';


const FirstAidCard = ({title, description, color}) => {
    const imgBox = {
        width: 70,
        height: 70,
        borderRadius: 20,
        marginRight: 15,
        backgroundColor: color,
    }

    return (
        <View style={styles.card}>
            <View style={imgBox}></View>
            <View style={styles.textBox}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description || 'Lorem ipsum dolor random gibberish here'}</Text>
            </View>
            <View style={styles.iconBox}>
                <Entypo name="chevron-right" size={18} color={globalColours.greyBlue} />
            </View>
        </View>
    )
}

export default FirstAidCard



const styles = StyleSheet.create({
    card:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    imgBox:{
        width: 70,
        height: 70,
        borderRadius: 20,
        marginRight: 15,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: globalColours.darkBlue,
        marginBottom: 5,
    },
    description:{
        fontSize: 14,
        color: globalColours.lightGrey,
    },
    textBox:{
        flex: 1,
    },
    iconBox:{
        width: 20,
    }
})