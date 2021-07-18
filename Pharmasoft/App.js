import React from 'react';
import { View, Text } from 'react-native';
import FirstAidDetailsScreen from './screens/FirstAidDetailsScreen';
import FirstAidScreen from './screens/FirstAidScreen';
import FIrstAidNav from './routes/FirstAidStack';


export default function App() {
  return (
    <FIrstAidNav />
    // <FirstAidScreen firstAid={firstAid} />
    // <FirstAidDetailsScreen firstAid={firstAid[4]} />
  );
}