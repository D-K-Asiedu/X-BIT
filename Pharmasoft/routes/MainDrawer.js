import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNav from './MainTabNav';
import SettingsScreen from '../screens/SettingsScreen'



const Drawer = createDrawerNavigator();

export default function MainDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="MainTab" component={MainTabNav} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
}