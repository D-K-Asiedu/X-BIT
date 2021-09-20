import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Keyboard,
  Modal,
  ActivityIndicator
} from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { StatusBar } from 'expo-status-bar';
import { useUpdateAuth } from '../routes/AuthContext';
import { loginRegStyles } from '../styles/loginReg';
import { globalStyles, globalColours } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup'
import { useTheme, useColor } from '../styles/ThemeContext';
import Loading from '../components/Loading';


const loginSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(4)
    .required()
})

export default function LoginScreen({ navigation }) {
  const authenticate = useUpdateAuth()
  const [imgDisplay, setImgDisplay] = useState(true)
  // const [mainColor, setMainColour] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    let isMounted = true
    isMounted && Keyboard.addListener('keyboardDidShow', () => setImgDisplay(false))
    isMounted && Keyboard.addListener('keyboardDidHide', () => setImgDisplay(true))

    return () => isMounted = false
  }, [])

  return (
    <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>

      <View style={loginRegStyles.imgBox}>
        {imgDisplay && <Image source={require('../assets/login.png')} style={loginRegStyles.image} />}
      </View>

      <View style={{ ...loginRegStyles.content, backgroundColor: colors.mainBgColor }}>
        <Text style={{ ...loginRegStyles.h2, color: colors.tetColor1 }}>Log in to your account</Text>

        <View style={{ ...loginRegStyles.contentCard, backgroundColor: colors.secBgColor }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={values => {
              setIsLoading(true)
              // console.log(`loading is ${isLoading}`);
              console.log(values)
              authenticate('login', values)
              setTimeout(()=>{setIsLoading(false)}, 1000)
            }}
          >
            {props => (
              <>
                <InputField
                  title="E-mail"
                  type='email-address'
                  autoCompleteType='email'
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  errorMsg={props.touched.email && props.errors.email}
                  onBlur={props.handleBlur('email')}
                />
                <InputField
                  title="Password"
                  secure
                  autoCompleteType='password'
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  errorMsg={props.touched.password && props.errors.password}
                  onBlur={props.handleBlur('password')}
                />
                <Button
                  title="Login"
                  color='#ffffff'
                  bgColor={colors.constant}
                  style={{ marginTop: 15, }}
                  onPress={props.handleSubmit}
                />
              </>
            )}
          </Formik>

          <Button
            title="Login with google"
            color={colors.tetColor1}
            bgColor={theme.darkmode ? "#69696969" : "#f2f2f2"}
            border1={theme.darkmode ? "#f2f2f2" : "#c4c4c4"}
            image="google"
            style={{ marginTop: 15, }}
          />

          <View style={loginRegStyles.bottomBox}>
            <Text style={{ ...loginRegStyles.bottomText, color: colors.mainTextColor }}>Don't have an account, </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ ...loginRegStyles.bottomLink, color: colors.constant }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={loginRegStyles.skipBtn}
        onPress={() => authenticate('skip')}
      >
        <Text style={loginRegStyles.skipText}> {"Skip>>"} </Text>
      </TouchableOpacity>


      <Loading loading={isLoading} setLoading={setIsLoading} />
      {/* <Modal
        visible={isLoading}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setContactModalOpen(false)}
      >
        <View style={globalStyles.modalBg}>
          <View style={{...globalStyles.modalBox, backgroundColor: colors.secBgColor}}>
            <ActivityIndicator size={50} color={colors.constant} />
          </View>
        </View>
      </Modal> */}

      <StatusBar style="light" translucent={true} />
    </View>

  );
}

const styles = StyleSheet.create({
});
