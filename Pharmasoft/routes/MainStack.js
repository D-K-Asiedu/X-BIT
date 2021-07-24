import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FirstAidDetailsScreen from '../screens/FirstAidDetailsScreen'
import MainDrawer from './MainDrawer';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';


const Stack = createStackNavigator();

function FirstAidStack() {
  const [isSignedIn, setSignedIn] = useState(false)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </>
      <>
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
        <Stack.Screen name="FirstAidDetails" component={FirstAidDetailsScreen} />
      </>
    </Stack.Navigator>
  );
}

export default FirstAidStack;