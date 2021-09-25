import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import {
    Entypo,
    FontAwesome,
    Fontisto,
    FontAwesome5,
    MaterialIcons,
    AntDesign,
} from '@expo/vector-icons';
import { globalColours } from '../styles/global';
import { useColor, useTheme } from '../styles/ThemeContext';
import LoadingView from './LoadingView';

const icons = {
    "email": <Entypo name="email" size={15} color={globalColours.lightGrey} />,
    "phone": <FontAwesome name="phone" size={15} color={globalColours.lightGrey} />,
    "date": <Fontisto name="date" size={15} color={globalColours.lightGrey} />,
    "allergies": <FontAwesome5 name="allergies" size={15} color={globalColours.lightGrey} />,
    "name": <AntDesign name="user" size={15} color={globalColours.lightGrey} />,
    "password": <Entypo name="lock" size={15} color={globalColours.lightGrey} />
}

const ProfileInfo = (props) => {

    const theme = useTheme()
    const colors = useColor()

    const styles = StyleSheet.create({
        infoCard: {
            borderBottomWidth: 1,
            borderColor: '#d4d4d4',
            paddingVertical: 20,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        title: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5
        },

        titleText: {
            fontSize: 14,
            letterSpacing: 1,
            marginLeft: 10,
            color: colors.secTextColor
        },

        profile: {
            fontSize: 16,
            letterSpacing: 1,
            color: colors.mainTextColor,
        },
        array: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        textBox: {
            paddingHorizontal: 7,
            paddingVertical: 5,
            margin: 2,
            borderRadius: 10,
            backgroundColor: '#00000033',
            color: colors.mainTextColor,
            fontSize: 16,
        }
    })


    return (
        <View style={styles.infoCard}>
            <View>
                <View style={styles.title}>
                    {icons[props.icon]}
                    <Text style={styles.titleText}>{props.title}</Text>
                </View>
                {!props.loading && <Text style={{ ...styles.profile, color: colors.mainTextColor }}>{props.profile}</Text>}
                {props.loading && <LoadingView size={20} />}
            </View>
            {props.editProfile &&
                <TouchableOpacity onPress={props.editProfile}>
                    <MaterialIcons name="edit" size={24} color={colors.constant} />
                </TouchableOpacity>}
        </View>
    )
}

export default ProfileInfo

