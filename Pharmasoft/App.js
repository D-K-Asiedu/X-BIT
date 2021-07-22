import React from 'react';
import { StyleSheet} from 'react-native';
import LoginScreen  from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainStack from './routes/MainStack';

export default function App(props) {
  return (
      // <RegisterScreen />
      <MainStack />
  );
}

const styles = StyleSheet.create({
});
