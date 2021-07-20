import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import ProfileInfo from '../components/ProfileInfo';
import { AntDesign } from '@expo/vector-icons';
import Divider from '../components/Divider';

const UserProfileScreen = () => {
    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <AntDesign name="arrowleft" size={30} color="white" />
                <Text style={styles.pageTitle}>Profile</Text>
                <Text></Text>
            </View>

            {/* Content */}
            <View style={styles.content}>

                {/* Profile Picture */}
                <View style={styles.profilePicView}>
                    <Image source={require("../assets/userprofile.png")} style={styles.profilePic}/>
                    <Text style={styles.name}>Kwaku Safo Dankwa</Text>
                </View>

                {/* Profile Info */}
                <View style={styles.profiles}>
                    <ProfileInfo icon={"email"} title={"Email"} profile={"coloneldankwa@gmail.com"}/>
                    <Divider />
                    <ProfileInfo icon={"phone"} title={"Contact"} profile={"+233203589545"} />
                    <Divider />
                    <ProfileInfo icon={"date"} title={"Date of Birth"} profile={"19th January 2000"} />
                    <Divider />
                    <ProfileInfo icon={"allergies"} title={"Allergies"} profile={"Strong scents"} />
                    <Divider />
                </View>

            </View>
        </View>
    )
}


export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1ba665',
        paddingTop: 30,
    },

    header: {
        padding: 20,
        backgroundColor: '#1ba665',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },

    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    content: {
        backgroundColor: 'white',
        flex: 1,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        padding: 20
    },

    profilePicView: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },

    profilePic: {
        height: 90,
        width: 90,
        borderRadius: 90/2
    },

    name: {
        fontSize: 25,
        letterSpacing:1,
        marginTop: 20
    },

    profiles: {
        marginTop: 30,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'white'
    },

})
