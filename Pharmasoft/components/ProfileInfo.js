import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { 
    Entypo, 
    FontAwesome, 
    Fontisto, 
    FontAwesome5, 
    MaterialIcons,
    AntDesign,
} from '@expo/vector-icons';
import { globalColours } from '../styles/global';

const icons = {
    "email": <Entypo name="email" size={15} color={globalColours.lightGrey} />,
    "phone": <FontAwesome name="phone" size={15} color={globalColours.lightGrey} />,
    "date": <Fontisto name="date" size={15} color={globalColours.lightGrey} />,
    "allergies": <FontAwesome5 name="allergies" size={15} color={globalColours.lightGrey} />,
    "name": <AntDesign name="user" size={15} color={globalColours.lightGrey} />,
    "password": <Entypo name="lock" size={15} color={globalColours.lightGrey} />
}

const ProfileInfo = (props) => {
    return (
        <TouchableOpacity style={styles.infoCard} onPress={() => props.editProfile(props.title)}>
            <View>
            <View style={styles.title}>
                {icons[props.icon]}
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
            <Text 
                style={{
                    ...styles.profile,
                     color: !props.profile ? globalColours.mainCol: globalColours.darkGrey
                     }}>
                         {props.profile || `Add ${props.title.toLowerCase()}`}
                        </Text>
            </View>
            <MaterialIcons name={props.profile ? "edit" : "add"} size={24} color={globalColours.mainCol} />
        </TouchableOpacity>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    infoCard:{
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
        color: globalColours.lightGrey
    },

    profile: {
        fontSize: 16,
        letterSpacing: 1,
        color: globalColours.darkGrey,
    }
})
