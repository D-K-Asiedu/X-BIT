import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'
import { globalStyles, globalColours } from '../styles/global'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as yup from 'yup'
import Button from '../components/Button'
import { useAuth, useUpdateAuth } from '../routes/AuthContext'



const VerifyEmailScreen = ({ navigation, route }) => {

    const colors = useColor()
    const user = route.params
    const server = useAuth().server
    const authenticate = useUpdateAuth()

    // Verify email
    const verifyEmail = async (code) => {
        const data = { action: "activate", email: user.email, code: parseInt(code) }
        const res = await fetch(`${server}/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try {
            const verifyDetails = await res.json()
            console.log(await verifyDetails.msg);
            authenticate('login', { ...user, msg: await verifyDetails.msg })
        }
        catch (e) {
            console.log(e);
        }

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
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Verify email</Text>
            </View>

            <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>

                <View style={{ paddingVertical: 50, }}>
                    <Text style={styles.mainText}>Enter the verification code sent to your e-mail</Text>
                    <Formik
                        initialValues={{ code: '' }}
                        // validationSchema={registerSchema}
                        onSubmit={values => {
                            //   setIsLoading(true)
                            console.log(values)
                            verifyEmail(values.code)
                        }}
                    >
                        {props => (
                            <>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    autoCompleteType="off"
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


            </View>
        </View>

    )
}

export default VerifyEmailScreen