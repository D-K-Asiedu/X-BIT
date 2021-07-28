import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { StatusBar } from 'expo-status-bar';
import { useUpdateAuth } from '../routes/AuthContext';
import { loginRegStyles } from '../styles/loginReg';
import { globalStyles, globalColours } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup'


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

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setImgDisplay(false))
    Keyboard.addListener('keyboardDidHide', () => setImgDisplay(true))

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setImgDisplay(false))
      Keyboard.removeListener('keyboardDidHide', () => setImgDisplay(true))
    }
  }, [])

  return (
    <View style={globalStyles.container}>

      <View style={loginRegStyles.imgBox}>
        {imgDisplay && <Image source={require('../assets/login.png')} style={loginRegStyles.image} />}
      </View>

      <View style={loginRegStyles.content}>
        <Text style={loginRegStyles.h2}>Log in to your account</Text>

        <View style={loginRegStyles.contentCard}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={values => {
              console.log(values)

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
                />
                <InputField 
                  title="Password" 
                  secure
                  autoCompleteType='password'
                  onChangeText={props.handleChange('password')}
                  value={props.values.password} 
                  />
                <Button
                  title="Login"
                  color='#ffffff'
                  bgColor={globalColours.mainCol}
                  style={{ marginTop: 15, }}
                  onPress={props.handleSubmit}
                />
              </>
            )}
          </Formik>

          <Button
            title="Login with google"
            color={globalColours.darkBlue}
            bgColor="#f2f2f2"
            border1="#c4c4c4"
            image="google"
            style={{ marginTop: 15, }}
          />

          <View style={loginRegStyles.bottomBox}>
            <Text style={loginRegStyles.bottomText}>Don't have an account, </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={loginRegStyles.bottomLink}>Register</Text>
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

      <StatusBar style="light" translucent={true} />
    </View>

  );
}

const styles = StyleSheet.create({
});
