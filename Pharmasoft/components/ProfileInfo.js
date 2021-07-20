import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Entypo, FontAwesome, Fontisto, FontAwesome5 } from '@expo/vector-icons';

const icons = {
    "email": <Entypo name="email" size={15} color="#808080" />,
    "phone": <FontAwesome name="phone" size={15} color="#808080" />,
    "date": <Fontisto name="date" size={15} color="#808080" />,
    "allergies": <FontAwesome5 name="allergies" size={15} color="#808080" />


}

const ProfileInfo = (props) => {
    return (
        <View>
            <View style={styles.title}>
                {icons[props.icon]}
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
            <Text style={styles.profile}>{props.profile}</Text>
        </View>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3
    },

    titleText: {
        fontSize: 14,
        letterSpacing: 1,
        marginLeft: 8,
        color: '#808080'
    },

    profile: {
        fontSize: 16,
        letterSpacing: 1.5
    }
})
