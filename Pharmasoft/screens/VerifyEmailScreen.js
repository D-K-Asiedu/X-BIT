import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'
import { globalStyles, globalColours } from '../styles/global'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Formik } from 'formik'
import Button from '../components/Button'
import { useAuth, useUpdateAuth } from '../routes/AuthContext'
import Loading from '../components/Loading'
import PopupMessage from '../functions/PopupMessage'
import { showMessage } from 'react-native-flash-message'

const VerifyEmailScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)

    const colors = useColor()
    const user = route.params
    const server = useAuth().server
    const authenticate = useUpdateAuth()

    // Verify email
    const verifyEmail = async (code) => {
        setIsLoading(true)
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
            console.log(await verifyDetails);

            const message = await verifyDetails.msg
            const verified = await verifyDetails.verified

            PopupMessage(
                `Verification ${verified ? '': 'not '}successful`,
                message,
                verified ? 'success' : 'danger',
                1500,
                {},
                {},
                {}
            )
            
            verified && await login(user)
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

    // login
    const login = async (data) => {
        setIsLoading(true)
        const res = await fetch(`${server}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
    
        try {
          const userLogin = await res.json()
          console.log(userLogin);
          const loggedIn = await userLogin["login"]
    
    
          // Login succesful alert
          showMessage({
            message: loggedIn ? "Login successful" : "Login Failed",
            description: data.msg || userLogin["msg"],
            type: loggedIn ? "success" : "danger",
            floating: true,
            icon: 'auto',
            duration: 2000,
            position: {
              top: 30,
            },
            titleStyle: {
              fontSize: 16,
            },
            style: {
              borderWidth: 1,
              borderColor: '#ffffff33'
            }
          });
    
          loggedIn && authenticate('login')
          loggedIn && authenticate('user')
    
        } catch (e) {
          console.log(e);
    
          // Login unsuccessful alert
          showMessage({
            message: "Login failed",
            description: "Invalid username or password",
            type: "danger",
            floating: true,
            icon: 'auto',
            duration: 1500,
            position: {
              top: 30,
            },
            titleStyle: {
              fontSize: 16,
            },
            style: {
            }
          });
    
        }
        setIsLoading(false)
    
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
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Verify email</Text>
            </View>

            <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>

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


            </View>

            <Loading loading={isLoading} setLoading={() => setIsLoading(false)} />
        </View>

    )
}

export default VerifyEmailScreen