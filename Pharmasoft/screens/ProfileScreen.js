import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    TextInput,
    FLatlist,
    TouchableWithoutFeedback
} from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import ProfileInfo from '../components/ProfileInfo'
import { useTheme, useColor } from '../styles/ThemeContext'
import { useUpdateAuth, useAuth, } from '../routes/AuthContext';
import Button from '../components/Button'
import { Formik } from 'formik'
import * as yup from 'yup'


const ProfileScreen = ({ navigation }) => {
    // const [mainColor, setMainColour] = useState('')
    const [contactModalOpen, setContactModalOpen] = useState(false)
    const [passwordModalOpen, setPasswordModalOpen] = useState(false)
    const [infoTitle, setInfoTitle] = useState('')
    const [infoValue, setInfoValue] = useState('')
    const [password, setPassword] = useState('')
    // const [infoValueRef, setInfoValueRef] = useState('')
    // const [user, setUser] = useState({
    //     name: 'John Doe',
    //     email: 'example@xbit.com',
    //     'phone number': '+119923456',
    //     'date of birth': '',
    //     allergies: ['Peanut butter', 'Milk', 'Water', 'Miiiiiiiiiiilk', 'Kooooooool'],
    //     password: 'helloworld'
    // })

    // Update user after editing
    // useEffect(() => {
    //     effect
    // }, [])

    const userInfo = useAuth().user
    const server = useAuth().server
    const validated = useAuth().validated
    const authenticate = useUpdateAuth()

    const theme = useTheme()
    const colors = useColor()

    // useEffect(() => {
    //   switch (theme.colortheme) {
    //     case 'green':
    //       setMainColour(globalColours.mainCol)
    //       break;
    //     case 'blue':
    //       setMainColour(globalColours.mainCol2)
    //       break;
    //     case 'pink':
    //       setMainColour(globalColours.mainCol3)
    //       break;


    //     default:
    //       break;
    //   }
    // }, [theme.colortheme])


    // const editProfile = (val, data) => {
    //         setInfoTitle(val.toLowerCase())
    //         setInfoValue(data)

    //         setModalOpen(true)    
    // }

    // Contact validation
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const editContact = () => {
        setContactModalOpen(true)
    }

    const saveEdit = () => {
        // console.log(infoTitle);
        // console.log(infoValue);

        var tempUser = userInfo
        tempUser[infoTitle] = infoValue
        // setUser(prevUser => (
        //     {...prevUser, tempUser} 
        // ))
        // const res = await fetch(`${server}/login`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         },
        //     body: JSON.stringify(data),
        // })
        user = tempUser
        setModalOpen(false)
    }

    // Update user info
    const updateUser = async (update) => {
        const res = await fetch(`${server}/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(update),
        })  
        
        const updateMsg = await res.json()
        console.log(updateMsg.msg);

        authenticate('user')
    }


    // Styles
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
            borderWidth: 1,
            borderColor: globalColours.lightGrey,
            opacity: 0.5,
        },
        imageBox: {
            width: 150,
            height: 150,
        },
        editBtn: {
            width: 50,
            height: 50,
            backgroundColor: colors.constant,
            borderRadius: 25,
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderWidth: 3,
            borderColor: colors.mainBgColor,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalBg: {
            flex: 1,
            backgroundColor: '#000000aa',
            justifyContent: 'flex-end'
        },
        modalBox: {
            padding: 20,
            backgroundColor: colors.secBgColor,
            margin: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#d4d4d433'
        },
        editTitle: {
            fontSize: 16,
            color: colors.tetColor2,
            fontWeight: 'bold'
        },
        editInput: {
            padding: 10,
            fontSize: 16,
            color: colors.secTextColor,
            marginTop: 20,
            backgroundColor: '#d4d4d4aa',
            borderRadius: 10,
        },
        linkText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.constant,
            marginLeft: 50,
        },
        errText: {
            fontSize: 14,
            color: 'red',
            fontWeight: 'bold'
        }
    })

    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>
            <View style={{ ...globalStyles.header, ...styles.header, backgroundColor: colors.mainColor, }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color='#ffffff' />
                </TouchableOpacity>
                <Text style={{ ...globalStyles.h2, ...styles.h2 }}>Profile</Text>
            </View>

            <ScrollView style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>
                <View style={styles.topBox}>
                    <View style={styles.imageBox}>
                        <Image source={require('../assets/userprofile.png')} style={styles.image} />
                        {/* <TouchableOpacity style={{...styles.editBtn, backgroundColor: colors.constant}}>
                            <FontAwesome name="camera" size={24} color="#ffffff" />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View>
                    <ProfileInfo icon="name" title="Name" profile={userInfo.name} />
                    <ProfileInfo icon="email" title="Email" profile={userInfo.email} />
                    <ProfileInfo icon="phone" title="Phone number" profile={userInfo['contact']} editProfile={editContact} />
                    {/* <ProfileInfo icon="date" title="Date of birth" profile={userInfo['date of birth']} editProfile={editProfile} /> */}
                    {/* <ProfileInfo icon="allergies" title="Allergies" profile={userInfo.allergies} editProfile={editProfile} /> */}
                    {/* <ProfileInfo icon="password" title="Password" profile="**********" editProfile={editProfile} /> */}
                </View>

                <View style={{
                    marginVertical: 50,
                    alignItems: 'flex-end'
                }}>
                    <Button
                        title="CHANGE PASSWORD"
                        color={colors.constant}
                        bgColor={"transparent"}
                        border1={colors.constant}
                        textStyle={{
                            fontSize: 16,
                        }}
                        onPress={() => setPasswordModalOpen(true)}
                    />
                </View>
            </ScrollView>

            <Modal
                visible={contactModalOpen}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setContactModalOpen(false)}>
                <Formik
                    initialValues={{ contact: userInfo['contact'] }}
                    validationSchema={
                        yup.object({
                            contact: yup
                                .string()
                                .matches(phoneRegExp, 'Phone number is not valid')
                                .required('Field cannot be empty')
                        })
                    }
                    onSubmit={values => {
                        const update = {
                            ...userInfo,
                            contact: values.contact,
                            column: 'contact'
                        }

                        console.log(update);
                        updateUser(update)


                        setContactModalOpen(false)
                    }}>
                    {props => (
                        <View style={styles.modalBg}>
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => setContactModalOpen(false)}>
                                <View style={{ flex: 1 }}></View>
                            </TouchableWithoutFeedback>
                            <View style={styles.modalBox}>
                                <Text style={styles.editTitle}>Enter your new phone number</Text>
                                <TextInput
                                    autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    autoCompleteType="off"
                                    keyboardType='phone-pad'
                                    style={{ ...styles.editInput, backgroundColor: props.touched.contact && props.errors.contact ? '#ff000033' : '#d4d4d466' }}
                                    onChangeText={props.handleChange('contact')}
                                    value={props.values.contact}
                                    onBlur={props.handleBlur('contact')}
                                />
                                <Text style={styles.errText}>{props.touched.contact && props.errors.contact}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, }}>
                                    <TouchableOpacity onPress={() => setContactModalOpen(false)}>
                                        <Text style={styles.linkText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={props.handleSubmit}>
                                        <Text style={styles.linkText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    )}
                </Formik>
            </Modal>

            <Modal
                visible={passwordModalOpen}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setPasswordModalOpen(false)}
            >
                <Formik
                    initialValues={{ new_password: '', confirm_password: '' }}
                    validationSchema={
                        yup.object({
                            new_password: yup
                                .string()
                                .min(4, 'New password must be at least 4 characters')
                                .required('New password is required'),
                            confirm_password: yup
                                .string()
                                .min(4, 'confirm password must be at least 4 characters')
                                .required('confirm password is required')
                                .oneOf([yup.ref('new_password'), null], 'New passwords must match'),
                        })
                    }
                    onSubmit={values => {
                        // console.log(values)
                        
                        const update = {
                            ...userInfo,
                            password: values.new_password,
                            column: 'password'
                        }

                        console.log(update);
                        updateUser(update)

                        setPasswordModalOpen(false)
                        authenticate('validateOff')
                        setPassword('')
                    }}>
                    {props => (
                        <View style={styles.modalBg}>
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => setPasswordModalOpen(false)}>
                                <View style={{ flex: 1 }}></View>
                            </TouchableWithoutFeedback>
                            <View style={styles.modalBox}>
                                {/* <Text style={styles.editTitle}>Enter your old password</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    autoCompleteType="off"
                                    style={{ ...styles.editInput, marginTop: 5, backgroundColor: props.touched.old_password && props.errors.old_password ? '#ff000033' : '#d4d4d466' }}
                                    onChangeText={props.handleChange('old_password')}
                                    value={props.values.old_password}
                                    onBlur={props.handleBlur('old_password')}
                                />
                                <Text style={{ ...styles.errText, marginBottom: 10 }}>{props.touched.old_password && props.errors.old_password}</Text> */}

                                {!validated ?
                                    <>
                                        <Text style={styles.editTitle}>Enter your old password</Text>
                                        <TextInput
                                            secureTextEntry={true}
                                            autoFocus={true}
                                            underlineColorAndroid="transparent"
                                            autoCompleteType="off"
                                            style={{ ...styles.editInput, marginTop: 5, marginBottom: 5, backgroundColor: props.touched.old_password && props.errors.old_password ? '#ff000033' : '#d4d4d466' }}
                                            onChangeText={(text) => setPassword(text)}
                                            value={password}
                                        />
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, }}>
                                            <TouchableOpacity onPress={() => setPasswordModalOpen(false)}>
                                                <Text style={styles.linkText}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => authenticate('validate', { password: password })}>
                                                <Text style={styles.linkText}>Confirm</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </>
                                    :
                                    <>
                                        <Text style={styles.editTitle}>Enter a new password</Text>
                                        <TextInput
                                            secureTextEntry={true}
                                            underlineColorAndroid="transparent"
                                            autoCompleteType="off"
                                            onChangeText={text => setInfoValue(text)}
                                            style={{ ...styles.editInput, marginTop: 5, backgroundColor: props.touched.new_password && props.errors.new_password ? '#ff000033' : '#d4d4d466' }}
                                            onChangeText={props.handleChange('new_password')}
                                            value={props.values.new_password}
                                            onBlur={props.handleBlur('new_password')}
                                        />
                                        <Text style={{ ...styles.errText, marginBottom: 10 }}>{props.touched.new_password && props.errors.new_password}</Text>

                                        <Text style={styles.editTitle}>Confirm your new password</Text>
                                        <TextInput
                                            secureTextEntry={true}
                                            underlineColorAndroid="transparent"
                                            autoCompleteType="off"
                                            style={{ ...styles.editInput, marginTop: 5, backgroundColor: props.touched.confirm_password && props.errors.confirm_password ? '#ff000033' : '#d4d4d466' }}
                                            onChangeText={props.handleChange('confirm_password')}
                                            value={props.values.confirm_password}
                                            onBlur={props.handleBlur('confirm_password')}
                                        />
                                        <Text style={{ ...styles.errText, marginBottom: 10 }}>{props.touched.confirm_password && props.errors.confirm_password}</Text>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, }}>
                                            <TouchableOpacity onPress={() => {
                                                setPasswordModalOpen(false)
                                                authenticate('validateOff')
                                                setPassword('')
                                            }}>
                                                <Text style={styles.linkText}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={props.handleSubmit}>
                                                <Text style={styles.linkText}>Save</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>}

                            </View>
                        </View>
                    )}
                </Formik>
            </Modal>

            {/* <Modal
                visible={modalOpen}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setModalOpen(false)}
            >
                <View style={styles.modalBg}>
                    <View style={styles.modalBox}>
                        {['name', 'phone number'].indexOf(infoTitle) != -1 ?
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
                            :infoTitle == 'allergies' ?
                                    <View>
                                        <FLatlist 
                                            data={user.allergies}
                                            renderItem={({ item }) => (
                                                <Text>{item}</Text>
                                            )}
                                            keyExtractor={() => (Math.random() * 1000).toString()}

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
            </Modal> */}

        </View>
    )
}


export default ProfileScreen
