import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FirstAidDetailsScreen from '../screens/FirstAidDetailsScreen'
import MainDrawer from './MainDrawer';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/*auth.isLoggedIn || auth.isSkipped*/ true ?
        <>
          <Stack.Screen name="MainDrawer" component={MainDrawer} />
          <Stack.Screen name="FirstAidDetails" component={FirstAidDetailsScreen} />
        </> :
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>

      }

    </Stack.Navigator>

  );
}

export default MainStack;