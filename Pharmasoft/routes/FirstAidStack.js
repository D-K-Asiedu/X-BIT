import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import FirstAidScreen from '../screens/FirstAidScreen';
import FirstAidDetailsScreen from '../screens/FirstAidDetailsScreen';


const screens = {
    FirstAid: {
        screen: FirstAidScreen,
        navigationOptions:{
            headerShown: false,
        }
    },
    FirstAidDetails: {
        screen: FirstAidDetailsScreen,
        navigationOptions:{
            headerShown: false,
        }
    },
}

const FirstAidStack = createStackNavigator(screens);

export default createAppContainer(FirstAidStack);