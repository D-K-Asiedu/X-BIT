import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import { globalColours, images } from '../styles/global'
import { Entypo } from '@expo/vector-icons';
import { useColor } from '../styles/ThemeContext';

const FirstAidCard = ({id, title, description, bgColor, image, viewDetails}) => {
    const colors = useColor()

    const styles = StyleSheet.create({
        card:{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 7,
            padding: 15,
            backgroundColor: colors.secBgColor,
            borderRadius: 20,
            elevation: 2,
        },
        title:{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.tetColor1,
            marginBottom: 5,
        },
        description:{
            fontSize: 14,
            color: colors.secTextColor,
        },
        textBox:{
            flex: 1,
        },
        iconBox:{
            width: 20,
        },
        imgBox:{
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            height: 70,
            borderRadius: 20,
            marginRight: 15,
            backgroundColor: bgColor,
        },    
        img:{
            width: 50,
            height: 50,
        },
    })

    return (
            <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.5}
            onPress={viewDetails}
            >
                <View style={styles.imgBox}>
                    <Image source={images.firstAid[image]} style={styles.img} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.title}>{title}</Text>
                    {/* <Text style={styles.description}>{description || 'Lorem ipsum dolor random gibberish here'}</Text> */}
                </View>
                <View style={styles.iconBox}>
                    <Entypo name="chevron-right" size={18} color={colors.tetColor2} />
                </View>
            </TouchableOpacity>
    )
}

export default FirstAidCard