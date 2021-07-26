import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './routes/MainStack'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './routes/AuthContext';


export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStack />
        <StatusBar style="inverted" translucent={true} />
      </NavigationContainer>
    </AuthProvider>
  );
}
