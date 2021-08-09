import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalColours } from '../styles/global';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer'
import {
    SimpleLineIcons,
    Ionicons, 
    AntDesign, 
    FontAwesome, 
    Fontisto 
} from '@expo/vector-icons';
import { Linking } from 'react-native';
import { useUpdateAuth, useAuth } from '../routes/AuthContext';
import { useColor, useTheme } from '../styles/ThemeContext';


const DrawerContent = ({navigation}) => {
    const tempLogin = useAuth().isLoggedIn
    const [isLoggedIn, setLoggedIn] = useState(true)
    const authenticate = useUpdateAuth()

    const colors = useColor()
    const theme = useTheme()

    // useEffect(() => {
    //     setLoggedIn(tempLogin)
    // }, [tempLogin])

    const styles = StyleSheet.create({
        drawer: {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: colors.secBgColor,
        },
        section:{
            paddingBottom: 10,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme.darkmode? '#a4a4a4':'#d4d4d4',
        },
        sectionTitle:{
            fontSize: 16,
            color: colors.secTextColor,
            paddingLeft: 20,
            marginBottom: 10,
        },
        avatar:{
            paddingBottom: 20, 
            flexDirection: 'row',
            alignItems: 'center',
        },
        avatarImg:{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: theme.darkmode? '#333333': '#d4d4d4',
            marginHorizontal: 10,
        },
        loginText:{
            flex: 1,
            fontSize: 16,
            color: colors.secTextColor,
        },
        loginEm:{
            fontSize: 18,
            fontWeight: 'bold',
            color: globalColours.mainCol,
        },    
        name:{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.tetColor1,
        },
        email:{
            fontSize: 12,
            color: colors.tetColor2,
        }
    })
    

    return (
        <View style={styles.drawer}>
            <DrawerContentScrollView>
                <View style={{...styles.section, ...styles.avatar}}>
                    {isLoggedIn ?
                        <>
                            <Image source={require('../assets/user.jpeg')} style={styles.avatarImg} /> 
                            <View>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.email}>example@xbit.com</Text>
                            </View>
                        </>:
                        <>
                            <Image source={require('../assets/no-user.jpg')} style={styles.avatarImg} />
                            <Text style={styles.loginText}>
                                <Text style={styles.loginEm} onPress={() => authenticate('logout')}>Login</Text> to access all features of the app
                            </Text>
                        </>
                    }
                    
                </View>
                <View style={styles.section}>
                    <DrawerItem
                        icon={() => (<Ionicons name="ios-home-outline" size={24} color={colors.secTextColor} />)}
                        label="Home"
                        labelStyle={{color: colors.mainTextColor}}
                        onPress={() => navigation.navigate('MainTab', {screen: 'Home'})}
                    />
                    <DrawerItem
                        icon={() => (<AntDesign name="user" size={24} color={colors.secTextColor} />)}
                        label="Profile"
                        labelStyle={{color: colors.mainTextColor}}
                        onPress={() => isLoggedIn ? navigation.navigate('Profile') : authenticate('logout')}
                    />
                    <DrawerItem
                        icon={() => (<Ionicons name="ios-settings-outline" size={24} color={colors.secTextColor} />)}
                        label="Settings"
                        labelStyle={{color: colors.mainTextColor}}
                        onPress={() => navigation.navigate('Settings')}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Emergency contacts</Text>
                    <DrawerItem
                        icon={() => (<FontAwesome name="ambulance" size={24} color="red" />)}
                        label="Ambulance"
                        labelStyle={{color: colors.mainTextColor}}
                        onPress = {() => Linking.openURL('tel:911')}
                    />
                    <DrawerItem
                        icon={() => (<Fontisto name="doctor" size={24} color='#1da665' />)}
                        label="Medical personel"
                        labelStyle={{color: colors.mainTextColor}}
                    />
                </View>
            </DrawerContentScrollView>
            {isLoggedIn && <DrawerItem
                icon={() => (<SimpleLineIcons name="logout" size={24} color={colors.secTextColor} />)}
                label="Logout"
                labelStyle={{color: colors.mainTextColor}}
                onPress={() => authenticate('logout')}
            />}
        </View>
    )
}

export default DrawerContent