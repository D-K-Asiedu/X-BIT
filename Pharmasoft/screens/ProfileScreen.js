import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import ProfileInfo from '../components/ProfileInfo'

const ProfileScreen = ({ navigation }) => {
    const editProfile = (val) => {
        console.log(val);
    }

    return (
        <View style={{ ...globalStyles.container }}>
            <View style={{ ...globalStyles.header, ...styles.header }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color='#ffffff' />
                </TouchableOpacity>
                <Text style={{ ...globalStyles.h2, ...styles.h2 }}>Profile</Text>
            </View>

            <View style={{ ...globalStyles.content }}>
                <View style={styles.topBox}>
                    <View style={styles.imageBox}>
                        <Image source={require('../assets/user.jpeg')} style={styles.image} />
                        <TouchableOpacity style={styles.editBtn}>
                            <FontAwesome name="camera" size={24} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <ProfileInfo icon="name" title="Name" profile="John Doe" editProfile={editProfile} />
                    <ProfileInfo icon="email" title="Email" profile="example@xbit.com" editProfile={editProfile} />
                    <ProfileInfo icon="phone" title="Phone number" profile="+20020012002" editProfile={editProfile} />
                    <ProfileInfo icon="date" title="Date of birth" editProfile={editProfile} />
                    <ProfileInfo icon="allergies" title="Allergies" editProfile={editProfile} />
                    <ProfileInfo icon="password" title="Password" profile="helloHello" editProfile={editProfile} />
                </View>
            </View>
                        
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
    },
    h2: {
        marginLeft: 30,
    },
    topBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: globalColours.lightGrey,
    },
    imageBox:{
        width: 150,
        height: 150,
    },
    editBtn:{
        width: 50,
        height: 50,
        backgroundColor: globalColours.mainCol,
        borderRadius: 25,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 3,
        borderColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ProfileScreen
