import React, {useState, useEffect} from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Image, 
    ScrollView, 
    Modal,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import ProfileInfo from '../components/ProfileInfo'
import { useTheme } from '../styles/ThemeContext'

const ProfileScreen = ({ navigation }) => {
    const [mainColor, setMainColour] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [infoTitle, setInfoTitle] = useState('')
    const [infoValue, setInfoValue] = useState('')
    // const [infoValueRef, setInfoValueRef] = useState('')
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'example@xbit.com',
        'phone number': '+119923456',
        'date of birth': '',
        allergies: ['Peanut butter', 'Milk', 'Water', 'Miiiiiiiiiiilk', 'Kooooooool'],
        password: 'helloworld'
    })

    const theme = useTheme()
  
    useEffect(() => {
      switch (theme.colortheme) {
        case 'green':
          setMainColour(globalColours.mainCol)
          break;
        case 'blue':
          setMainColour(globalColours.mainCol2)
          break;
        case 'pink':
          setMainColour(globalColours.mainCol3)
          break;
    
      
        default:
          break;
      }
    }, [theme.colortheme])


    const editProfile = (val) => {
            setInfoTitle(val.toLowerCase())
            setInfoValue(user[val.toLowerCase()])

            setModalOpen(true)    
    }

    const saveEdit = () => {
        console.log(infoTitle);
        console.log(infoValue);
        
        var tempUser = user
        tempUser[infoTitle] = infoValue
        setUser(prevUser => (
            {...prevUser, tempUser} 
        ))
        setModalOpen(false)
    }


    const editTitle = {
        fontSize: 16,
        color: globalColours.greyBlue,
        fontWeight: 'bold'
    }

    const editInput = {
        paddingHorizontal: 10,
        fontSize: 16,
        color: globalColours.lightGrey,
        borderBottomWidth: 2,
        borderColor: mainColor,
        marginVertical: 30,
        fontSize: 16,
    }

    return (
        <View style={{ ...globalStyles.container, backgroundColor: mainColor }}>
            <View style={{ ...globalStyles.header, ...styles.header, backgroundColor: mainColor, }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color='#ffffff' />
                </TouchableOpacity>
                <Text style={{ ...globalStyles.h2, ...styles.h2 }}>Profile</Text>
            </View>

            <ScrollView style={{ ...globalStyles.content }}>
                <View style={styles.topBox}>
                    <View style={styles.imageBox}>
                        <Image source={require('../assets/user.jpeg')} style={styles.image} />
                        <TouchableOpacity style={{...styles.editBtn, backgroundColor: mainColor}}>
                            <FontAwesome name="camera" size={24} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <ProfileInfo icon="name" title="Name" profile={user.name} editProfile={editProfile} />
                    <ProfileInfo icon="email" title="Email" profile={user.email} editProfile={editProfile} />
                    <ProfileInfo icon="phone" title="Phone number" profile={user['phone number']} editProfile={editProfile} />
                    <ProfileInfo icon="date" title="Date of birth" profile={user['date of birth']} editProfile={editProfile} />
                    <ProfileInfo icon="allergies" title="Allergies" profile={user.allergies} editProfile={editProfile} />
                    <ProfileInfo icon="password" title="Password" profile={user.password} editProfile={editProfile} />
                </View>
            </ScrollView>

            <Modal
                visible={modalOpen}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setModalOpen(false)}
            >
                <View style={styles.modalBg}>
                    <View style={styles.modalBox}>
                        {['name', 'email', 'phone number'].indexOf(infoTitle) != -1 ?
                            <View>
                                <Text style={editTitle}>Enter your {infoTitle}</Text>
                                <TextInput
                                    autoFocus={true}
                                    value={infoValue}
                                    onChangeText={text => setInfoValue(text)}
                                    underlineColorAndroid="transparent"
                                    autoCompleteType="off"
                                    // value='Hello'
                                    style={editInput}

                                />
                            </View>
                            : infoTitle == 'password' ?
                                <View>
                                    <Text style={editTitle}>Enter your old password</Text>
                                    <TextInput
                                        secureTextEntry={true}
                                        autoFocus={true}
                                        underlineColorAndroid="transparent"
                                        autoCompleteType="off"
                                        // value='Hello'
                                        style={editInput}
                                    />

                                    <Text style={editTitle}>Enter a new password</Text>
                                    <TextInput
                                        secureTextEntry={true}
                                        underlineColorAndroid="transparent"
                                        autoCompleteType="off"
                                        onChangeText={text => setInfoValue(text)}
                                        // value='Hello'
                                        style={editInput}
                                    />

                                    <Text style={editTitle}>Confirm your new password</Text>
                                    <TextInput
                                        secureTextEntry={true}
                                        underlineColorAndroid="transparent"
                                        autoCompleteType="off"
                                        // value='Hello'
                                        style={editInput}
                                    />


                                </View>
                            :
                            <View></View>

                        }
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20,}}>
                            <TouchableOpacity onPress={() => setModalOpen(false)}><Text style={styles.linkText}>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity onPress={saveEdit}><Text style={styles.linkText}>Save</Text></TouchableOpacity>                    
                        </View>
                    </View>
                </View>
            </Modal>
                        
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
    },
    modalBg:{
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'flex-end'
    },
    modalBox:{
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: '#ffffff'
    },
    linkText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: globalColours.mainCol,
        marginLeft: 50,
    }
})

export default ProfileScreen
