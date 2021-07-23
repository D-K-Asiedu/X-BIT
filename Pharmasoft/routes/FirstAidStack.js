import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FirstAidScreen from '../screens/FirstAidScreen';
import FirstAidDetailsScreen from '../screens/FirstAidDetailsScreen'


const Stack = createStackNavigator();

function FirstAidStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="FirstAid" component={FirstAidScreen} />
      <Stack.Screen name="FirstAidDetails" component={FirstAidDetailsScreen} />
    </Stack.Navigator>
  );
}

export default FirstAidStack;














// import {createStackNavigator} from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation';
// import FirstAidScreen from '../screens/FirstAidScreen';
// import FirstAidDetailsScreen from '../screens/FirstAidDetailsScreen';

// const screens = {
//     FirstAid: {
//         screen: FirstAidScreen,
//         navigationOptions:{
//             headerShown: false,
//         }
//     },
//     FirstAidDetails: {
//         screen: FirstAidDetailsScreen,
//         navigationOptions:{
//             headerShown: false,
//         }
//     },
// }

// // export default FirstAidStack = createStackNavigator(screens);

// const FirstAidStack = createStackNavigator(screens);
// export default createAppContainer(FirstAidStack);