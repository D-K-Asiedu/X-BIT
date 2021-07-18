import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import { globalColours, images } from '../styles/global'
import { Entypo } from '@expo/vector-icons';


const FirstAidCard = ({id, title, description, bgColor, image, viewDetails}) => {
    const imgBox = {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 20,
        marginRight: 15,
        backgroundColor: bgColor,
    }

    return (
            <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.5}
            onPress={viewDetails}
            >
                <View style={imgBox}>
                    <Image source={images.firstAid[image]} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description || 'Lorem ipsum dolor random gibberish here'}</Text>
                </View>
                <View style={styles.iconBox}>
                    <Entypo name="chevron-right" size={18} color={globalColours.greyBlue} />
                </View>
            </TouchableOpacity>
    )
}

export default FirstAidCard



const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 20,
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