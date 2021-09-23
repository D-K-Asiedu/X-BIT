import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'
import { globalStyles, globalColours } from '../styles/global'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as yup from 'yup'
import Button from '../components/Button'



const ForgotPasswordScreen = ({ navigation }) => {

    const colors = useColor()

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
            paddingVertical: 10
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
                {false &&
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
                        }}
                    >
                        {props => (
                            <View style={{ paddingVertical: 50, }}>
                                <Text style={styles.mainText}>Enter your email for verification code</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    autoCompleteType="email"
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

                {false &&
                    <View style={{ paddingVertical: 50, }}>
                        <Text style={styles.mainText}>Enter the verification code sent to your e-mail</Text>
                        <TextInput
                            underlineColorAndroid="transparent"
                            autoCompleteType="off"
                            style={{ ...styles.editInput, marginTop: 5, }}
                            // onChangeText={props.handleChange('email')}
                            // value={props.values.email}
                            // onBlur={props.handleBlur('email')}
                            placeholder={'code'}
                        />

                        <Button
                            title="Next"
                            color='#ffffff'
                            bgColor={colors.constant}
                            style={{ width: 100, alignSelf: 'flex-end', marginTop: 20, }}
                        // onPress={props.handleSubmit}
                        />
                    </View>
                }

                {true &&
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

                            // const update = {
                            //     ...userInfo,
                            //     password: values.new_password,
                            //     column: 'password'
                            // }

                            // console.log(update);
                            // updateUser(update)

                            // setPasswordModalOpen(false)
                            // authenticate('validateOff')
                            // setPassword('')
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
        </View>

    )
}

export default ForgotPasswordScreen