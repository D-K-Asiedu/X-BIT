import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNav from './MainTabNav';
import SettingsScreen from '../screens/SettingsScreen'
import DrawerContent from '../components/DrawerContent';
import ProfileScreen from '../screens/ProfileScreen'
import OrderDetailsScreen from '../screens/OrderDetailsScreen';


const Drawer = createDrawerNavigator();

export default function MainDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={props =>  <DrawerContent {...props} />}
            screenOptions={{
                unmountOnBlur: true
            }}
        >
            <Drawer.Screen name="MainTab" component={MainTabNav} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="OrderDetails" component={OrderDetailsScreen} />
        </Drawer.Navigator>
    );
}