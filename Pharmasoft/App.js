import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './routes/MainStack'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './routes/AuthContext';
import { ThemeProvider } from './styles/ThemeContext';


export default function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainStack />
          <StatusBar style="inverted" translucent={true} />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
