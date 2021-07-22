import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen'
import ShopScreen from '../screens/ShopScreen'
import FirstAidStack from './FirstAidStack';
import FirstAidScreen from "../screens/FirstAidScreen";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Shop" component={ShopScreen} />
            <Tab.Screen name="First-aid" component={FirstAidStack} />
            {/* <Tab.Screen name="First-aid" component={FirstAidScreen} /> */}
        </Tab.Navigator>
    )
}

export default Tabs