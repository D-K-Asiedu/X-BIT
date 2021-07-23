import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen'
import ShopScreen from '../screens/ShopScreen'
import FirstAidStack from './FirstAidStack';
import { globalColours } from "../styles/global";
import { Ionicons, Fontisto, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: globalColours.mainCol,
                labelPosition: 'beside-icon',
                keyboardHidesTabBar: true,
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    switch (route.name) {
                        case 'Home':
                            return <Ionicons name="home" size={25} color={color} />
                        case 'Shop':
                            return <Fontisto name="shopping-store" size={20} color={color} />
                        case 'First-aid':
                            return <FontAwesome5 name="first-aid" size={22} color={color} />
    
                    
                        default:
                            break;
                    }
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Shop" component={ShopScreen} />
            <Tab.Screen name="First-aid" component={FirstAidStack} />
        </Tab.Navigator>
    )
}

export default Tabs