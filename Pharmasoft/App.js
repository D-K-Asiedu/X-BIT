import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen  from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

export default function App(props) {
  const [changeScreen, setchangeScreen] = useState(<LoginScreen onChangeScreen = {(command)=>Screenchanger(command)}/>)
  
  let Screenchanger = (command) =>{
    if (command === 'Register'){
      setchangeScreen( <RegisterScreen onChangeScreen = {(command)=>Screenchanger(command)}/>)
    }else if (command === "Login"){
      setchangeScreen(<LoginScreen onChangeScreen = {(command)=>Screenchanger(command)}/>)
    }
  }
  
  return (
      changeScreen
    
   
  );
}

const styles = StyleSheet.create({
  });
