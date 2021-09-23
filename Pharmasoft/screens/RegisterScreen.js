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
import { useTheme, useColor } from '../styles/ThemeContext';
import { useAuth } from '../routes/AuthContext';
import Loading from '../components/Loading';
import PopupMessage from '../functions/PopupMessage';
import Info from '../functions/Info';


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
  const [isLoading, setIsLoading] = useState(false)
  // const [mainColor, setMainColour] = useState('')

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

  // Register account
  const server = useAuth().server

  const registerAccount = async (user) => {
    const res = await fetch(`${server}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    try{
      const accReg = await res.json()
      console.log(accReg);
      await accReg.registration && authenticate('login', {email:user.email, password:user.password, msg: 'Account has been registered'}) && setTimeout(()=>{setIsLoading(false)}, 1)
      
      !accReg.registration && PopupMessage(
        'Registration failed',
        await accReg.msg,
        'danger',
        1500,
        {},
        {},
        {}
    )
    !accReg.registration && setIsLoading(false)
    } catch(e){
      console.log(e);  
    }

  }


  useEffect(() => {
    let isMounted = true
    isMounted && Keyboard.addListener('keyboardDidShow', () => setImgDisplay(false))
    isMounted && Keyboard.addListener('keyboardDidHide', () => setImgDisplay(true))

    return () => isMounted = false
  }, [])

  return (
    <View style={{...globalStyles.container, backgroundColor:colors.mainColor}}>


      <View style={loginRegStyles.imgBox}>
         {imgDisplay && !listDisplay && <Image source={require('../assets/register.png')} style={{...loginRegStyles.image, width: '90%', height: '75%'}} />}
      </View>

      <View style={{...loginRegStyles.content, backgroundColor: colors.mainBgColor}}>
          <Text style={{...loginRegStyles.h2, color: colors.tetColor1}}>Create an account</Text>
        
        <ScrollView style={{...loginRegStyles.contentCard, backgroundColor: colors.secBgColor,}}>
          <Formik
            initialValues={{ name: '', email: '', phone: '', password: '', confirm_password: '' }}
            validationSchema={registerSchema}
            onSubmit={values => {
              setIsLoading(true)
              console.log(values)
              registerAccount(values)
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
                    type='phone-pad'
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
                  bgColor={colors.constant}
                  style={{ marginTop: 15, }}
                  onPress={props.handleSubmit}
                />

              </>
            )}
          </Formik>
          {/* <Button
            title="Register with google"
            color={colors.tetColor1}
            bgColor= {theme.darkmode ? "#69696969" :"#f2f2f2"} 
            border1= {theme.darkmode ? "#f2f2f2" :"#c4c4c4"}
            image="google"
            style={{marginTop: 15,}}
           /> */}
          
          <View style={loginRegStyles.bottomBox}>
            <Text style={{...loginRegStyles.bottomText, color: colors.mainTextColor}}>Already have an account, </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{...loginRegStyles.bottomLink, color: colors.constant}}>Login</Text>
            </TouchableOpacity>
          </View>
          {!imgDisplay && <View style={{height: 100}}></View>}
        </ScrollView>
      </View>

      <TouchableOpacity 
          style={loginRegStyles.skipBtn}
          onPress={() => {
            authenticate('skip')
            Info('Skipped registration', 'Some features will not be available')
          }}
          >
            <Text style={loginRegStyles.skipText}> {"Skip>>"} </Text>
        </TouchableOpacity>

      <Loading loading={isLoading} setLoading={setIsLoading} />
      <StatusBar style="light" translucent={true} />
    </View>

  );
}

const styles = StyleSheet.create({
});
