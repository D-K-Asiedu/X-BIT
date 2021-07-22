import React from 'react';
import FIrstAidNav from './routes/FirstAidStack';
import { NavigationContainer } from '@react-navigation/native';
import AppTabNav from './routes/AppTabNav';
import PseudoTabNav from './routes/PseudoTabNav';


export default function App() {
  return (
    // <PseudoTabNav />
    <FIrstAidNav />
    // <NavigationContainer>
    //   <AppTabNav />
    // </NavigationContainer>
  );
}