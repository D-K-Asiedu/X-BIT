import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './routes/MainStack'
import { StatusBar } from 'expo-status-bar'


export default function App(props) {
  return (
    <NavigationContainer>
      <MainStack />
      <StatusBar style="inverted" translucent={true} />
    </NavigationContainer>
  );
}
