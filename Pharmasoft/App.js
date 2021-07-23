import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabNav from './routes/AppTabNav';
import { StatusBar } from 'expo-status-bar'


export default function App() {
  return (
    <NavigationContainer>
      <AppTabNav />
      <StatusBar style="inverted" translucent={true} />
    </NavigationContainer>
  );
}