import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './routes/MainStack'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './routes/AuthContext';
import { ThemeProvider } from './styles/ThemeContext';
import FlashMessage from "react-native-flash-message";


export default function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainStack />
          <StatusBar style="inverted" translucent={true} />
        </NavigationContainer>
      </ThemeProvider>
      <FlashMessage position="top" />
    </AuthProvider>
  );
}
