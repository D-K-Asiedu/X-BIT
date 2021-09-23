import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FirstAidDetailsScreen from '../screens/FirstAidDetailsScreen'
import MainDrawer from './MainDrawer';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen'
import { useAuth } from './AuthContext';

const Stack = createStackNavigator();

function MainStack() {
  // const auth = useContext(AuthContext)
  const auth = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {auth.isLoggedIn || auth.isSkipped?
        <>
          <Stack.Screen name="MainDrawer" component={MainDrawer} />
          <Stack.Screen name="FirstAidDetails" component={FirstAidDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </> :
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
        </>

      }

    </Stack.Navigator>

  );
}

export default MainStack;