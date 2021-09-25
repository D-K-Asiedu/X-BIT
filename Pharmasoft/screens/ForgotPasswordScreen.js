import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'
import { globalStyles, globalColours } from '../styles/global'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as yup from 'yup'
import Button from '../components/Button'
import { useAuth } from '../routes/AuthContext'
import Loading from '../components/Loading'
import PopupMessage from '../functions/PopupMessage'


const ForgotPasswordScreen = ({ navigation }) => {
    const [emailSent, setEmailSent] = useState(false)
    const [verified, setVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')

    const colors = useColor()
    const server = useAuth().server

    // Send email for code 
    const sendEmail = async (email) => {
        setIsLoading(true)
        const data = { email: email }
        setEmail(email)
        const res = await fetch(`${server}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try {
            const emailSentDetails = await res.json()
            const message = emailSentDetails.msg
            console.log(await emailSentDetails);

            const errMsg = "Account does not exist"
            const sent = message != errMsg

            PopupMessage(
                sent ? 'Email sent' : 'Email not sent',
                message,
                sent ? 'success' : 'danger',
                2000,
                {},
                {},
                {}
            )

            sent && setEmailSent(true)
            setIsLoading(false)
        }
        catch (e) {
            console.log(e);
            PopupMessage(
                'Email not sent',
                'Unknown error',
                'danger',
                1500,
                {},
                {},
                {}
            )
            setIsLoading(false)
        }
    }

    // Verify email
    const verifyEmail = async (code) => {
        setIsLoading(true)
        const data = { action: "verify", email: email, code: parseInt(code) }
        const res = await fetch(`${server}/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try {
            const verifyDetails = await res.json()
            console.log(await verifyDetails);
            const verified = await verifyDetails.verified
            const message = await verifyDetails.msg

            PopupMessage(
                `Verification ${verified ? '': 'not '}successful`,
                message,
                verified ? 'success' : 'danger',
                1500,
                {},
                {},
                {}
            )

            verified && setVerified(true)
        }
        catch (e) {
            console.log(e);
            PopupMessage(
                'Verification failed',
                'Unknown error',
                'danger',
                1500,
                {},
                {},
                {}
            )
            setIsLoading(false)
        }

        setIsLoading(false)
    }

    // Update password
    const updatePassword = async (update) => {
        setIsLoading(true)
        const res = await fetch(`${server}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        })

        try{
            const updateMsg = await res.json()
            console.log(updateMsg);

            const trueMsg = "password changed successfully"
            const message = await updateMsg.msg
            const changed = trueMsg == message

            PopupMessage(
                `Password ${changed ? '': 'couldn\'t be '}changed`,
                message,
                changed ? 'success' : 'danger',
                1500,
                {},
                {},
                {}
            )
    
            changed && navigation.navigate('Login') 
        }
        catch(e){
            console.log(e);
            PopupMessage(
                'Password not changed',
                'Unknown error',
                'danger',
                1500,
                {},
                {},
                {}
            )
            setIsLoading(false)

        }
        setIsLoading(true)
    }
    


    //Styles
    const styles = StyleSheet.create({
        header: {
            backgroundColor: colors.mainColor,
            justifyContent: 'flex-start'
        },
        pageTitle: {
            marginLeft: 30,
        },
        editInput: {
            padding: 10,
            fontSize: 16,
            color: colors.secTextColor,
            backgroundColor: '#d4d4d4aa',
            borderRadius: 10,
        },
        errText: {
            fontSize: 14,
            color: 'red',
            fontWeight: 'bold'
        },
        mainText: {
            ...globalStyles.h3,
            paddingVertical: 10,
            color: colors.tetColor2
        }

    })

    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>
            <View style={{ ...globalStyles.header, ...styles.header }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Forgot password</Text>
            </View>

            <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>
                {!emailSent && !verified &&
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={
                            yup.object({
                                email: yup
                                    .string()
                                    .email()
                                    .required(),
                            })
                        }
                        onSubmit={values => {
                            console.log(values);
                            sendEmail(values.email)
                        }}
                    >
                        {props => (
                            <View style={{ paddingVertical: 50, }}>
                                <Text style={styles.mainText}>Enter your email for verification code</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    style={{ ...styles.editInput, marginTop: 5, backgroundColor: props.touched.email && props.errors.email ? '#ff000033' : '#d4d4d466' }}
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                    placeholder={'email'}
                                />
                                <Text style={{ ...styles.errText, marginBottom: 10 }}>{props.touched.email && props.errors.email}</Text>

                                <Button
                                    title="Next"
                                    color='#ffffff'
                                    bgColor={colors.constant}
                                    style={{ width: 100, alignSelf: 'flex-end' }}
                                    onPress={props.handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>}

                {emailSent && !verified &&
                    <View style={{ paddingVertical: 50, }}>
                        <Text style={styles.mainText}>Enter the verification code sent to your e-mail</Text>
                        <Formik
                            initialValues={{ code: '' }}
                            onSubmit={values => {
                                console.log(values)
                                verifyEmail(values.code)
                            }}
                        >
                            {props => (
                                <>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        autoCompleteType="off"
                                        keyboardType="numeric"
                                        style={{ ...styles.editInput, marginTop: 5, }}
                                        onChangeText={props.handleChange('code')}
                                        value={props.values.code}
                                        onBlur={props.handleBlur('code')}
                                        placeholder={'code'}
                                    />

                                    <Button
                                        title="Verify"
                                        color='#ffffff'
                                        bgColor={colors.constant}
                                        style={{ width: 100, alignSelf: 'flex-end', marginTop: 20, }}
                                        onPress={props.handleSubmit}
                                    />
                                </>
                            )}
                        </Formik>
                    </View>
                }

                {emailSent && verified &&
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
                            console.log(values)

                            const update = {
                                password: values.new_password,
                                email: email
                            }

                            console.log(update);
                            updatePassword(update)

                            setEmail('')
                        }}>
                        {props => (
                            <View style={{ paddingVertical: 50, }}>

                                <Text style={styles.mainText}>Enter a new password</Text>
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

                                <Text style={styles.mainText}>Confirm your new password</Text>
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

                                <Button
                                    title="Change password"
                                    color='#ffffff'
                                    bgColor={colors.constant}
                                    style={{ marginTop: 20, }}
                                    onPress={props.handleSubmit}
                                />

                            </View>
                        )}
                    </Formik>

                }
            </View>

            <Loading loading={isLoading} setLoading={() => setIsLoading(false)} />
        </View>

    )
}

export default ForgotPasswordScreen