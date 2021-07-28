import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity, 
  View,
  ScrollView,
  Keyboard 
} from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { StatusBar } from 'expo-status-bar';
import { useUpdateAuth } from '../routes/AuthContext';
import { globalColours, globalStyles } from '../styles/global';
import { loginRegStyles } from '../styles/loginReg';
import { Form, Formik } from 'formik';
import * as yup from 'yup'


const registerSchema = yup.object({
  name: yup
    .string()
    .min(3)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  phone: yup
  // Update later motherfucker
    .string()
    .min(10)
    .max(14)
    .required(),
  password: yup
    .string()
    .min(4)
    .required(),
  confirm_password: yup
    .string()
    .min(4, 'confirm password must be at least 4 characters')
    .required('confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export default function RegisterScreen({navigation}) {
  const [listDisplay, setListDisplay] = useState(false)
  const authenticate = useUpdateAuth()
  const [imgDisplay, setImgDisplay] = useState(true)

  useEffect(() => {
    let isMounted = true
    isMounted && Keyboard.addListener('keyboardDidShow', () => setImgDisplay(false))
    isMounted && Keyboard.addListener('keyboardDidHide', () => setImgDisplay(true))

    return () => isMounted = false
  }, [])

  return (
    <View style={globalStyles.container}>


      <View style={loginRegStyles.imgBox}>
         {imgDisplay && !listDisplay && <Image source={require('../assets/register.png')} style={{...loginRegStyles.image, width: 275, height: 255}} />}
      </View>

      <View style={loginRegStyles.content}>
          <Text style={loginRegStyles.h2}>Create an account</Text>
        
        <View style={loginRegStyles.contentCard}>
          <Formik
            initialValues={{ name: '', email: '', phone: '', password: '', confirm_password: '' }}
            validationSchema={registerSchema}
            onSubmit={values => {
              console.log(values)
            }}
          >
            {props => (
              <>
                <InputField 
                  title="Name" 
                  focusHandler={() => setListDisplay(true)}
                  autoCompleteType='name'
                  onChangeText={props.handleChange('name')} 
                  value={props.values.name}
                  errorMsg = {props.touched.name && props.errors.name}
                  onBlur={props.handleBlur('name')} 
                />
                <InputField 
                  title="E-mail" 
                  focusHandler={() => setListDisplay(true)} 
                  type='email-address'
                  autoCompleteType='email'
                  onChangeText={props.handleChange('email')} 
                  value={props.values.email} 
                  errorMsg = {props.touched.email && props.errors.email}
                  onBlur={props.handleBlur('email')}

                />
                {listDisplay && <>
                  <InputField 
                    title="Phone number" 
                    type='numeric'
                    autoCompleteType='tel'
                    onChangeText={props.handleChange('phone')} 
                    value={props.values.phone}
                    errorMsg = {props.touched.phone && props.errors.phone}
                    onBlur={props.handleBlur('phone')}
     
                  />
                  <InputField 
                    title="Password" 
                    secure 
                    onChangeText={props.handleChange('password')} 
                    value={props.values.password}
                    errorMsg = {props.touched.password && props.errors.password}
                    onBlur={props.handleBlur('password')}
    
                  />
                  <InputField 
                    title="Confirm password" 
                    placeHolder="Confirm password" 
                    secure
                    onChangeText={props.handleChange('confirm_password')} 
                    value={props.values.confirm_password}   
                    errorMsg = {props.touched.confirm_password && props.errors.confirm_password}
                    onBlur={props.handleBlur('confirm_password')}
  
                  />
                </>}
                <Button
                  title="Register"
                  color='#ffffff'
                  bgColor="#1ba665"
                  style={{ marginTop: 15, }}
                  onPress={props.handleSubmit}
                />

              </>
            )}
          </Formik>
          <Button
            title="Register with google"
            color='#1a2e35'
            bgColor="#f2f2f2"
            border1="#c4c4c4"
            image="google"
            style={{marginTop: 15,}}
           />
          
          <View style={loginRegStyles.bottomBox}>
            <Text style={loginRegStyles.bottomText}>Already have an account, </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={loginRegStyles.bottomLink}>Login</Text>
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
