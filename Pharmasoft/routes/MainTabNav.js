import React, {useState, useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen'
import ShopScreen from '../screens/ShopScreen'
// import FirstAidStack from './FirstAidStack';
import FirstAidScreen from "../screens/FirstAidScreen";
import { globalColours } from "../styles/global";
import { Ionicons, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { useTheme, useColor } from "../styles/ThemeContext";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    // const [mainColor, setMainColour] = useState('')

    const theme = useTheme()
    const colors = useColor()
  
    // useEffect(() => {
    //   switch (theme.colortheme) {
    //     case 'green':
    //       setMainColour(globalColours.mainCol)
    //       break;
    //     case 'blue':
    //       setMainColour(globalColours.mainCol2)
    //       break;
    //     case 'pink':
    //       setMainColour(globalColours.mainCol3)
    //       break;
    
      
    //     default:
    //       break;
    //   }
    // }, [theme.colortheme])


    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: colors.constant,
                inactiveTintColor: globalColours.lightGrey,
                labelPosition: 'beside-icon',
                keyboardHidesTabBar: true,
                unmountOnBlur: true,
                style: {
                    backgroundColor: theme.darkmode ? colors.secBgColor: '#ffffff',
                    borderTopColor: theme.darkmode? globalColours.lightGrey: '#e8e8e8',
                },
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
            <Tab.Screen name="First-aid" component={FirstAidScreen} />
        </Tab.Navigator>
    )
}

export default Tabs