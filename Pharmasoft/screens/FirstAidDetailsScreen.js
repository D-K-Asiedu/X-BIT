import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { globalColours, globalStyles } from '../styles/global'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import FirstAidSteps from '../components/FirstAidSteps';
import { LinearGradient } from 'expo-linear-gradient';
import FirstAidDropDown from '../components/FirstAidDropDown';
import { Linking } from 'react-native';

const FirstAidDetailsScreen = ({navigation, route}) => {
    const [activeStep, setActiveStep]  = useState(1)
    const [activeBranch, setActiveBranch] = useState({})
    const [stepDetails, setStepDetails] = useState([])
    const [dropDownVisible, setDropDownVisible] = useState(false)

    const phoneNum = "tel:911"
    const item = route.params

    useEffect(() => {
        switch (activeStep) {
            case 1:
                setActiveBranch({
                    AcTitle: item.steps.title1,
                    AcSteps: item.steps.steps1,
                })
                break;

            case 2:
                setActiveBranch({
                    AcTitle: item.steps.title2,
                    AcSteps: item.steps.steps2,
                })
                break;

            case 3:
                setActiveBranch({
                    AcTitle: item.steps.title3,
                    AcSteps: item.steps.steps3,
                })
                break;
        
            default:
                break;
        }
    }, [activeStep])

    useEffect(() => {
        setStepDetails(activeBranch.AcSteps)
    }, [activeBranch])

    const openDropDown = () => {
        if(item.steps.categories > 1){
            setDropDownVisible(true)
        }
    }

    const set = (step) => {
        setActiveStep(step)
        setDropDownVisible(false)
    }

    const mainColor = item.gradient[0] || globalColours.mainCol

    return (
        <LinearGradient
            colors={item.gradient}
            start={[0,0]}
            end={[1,0]}             
            style={{...globalStyles.container, ...styles.container}}>
            <LinearGradient 
                colors={item.gradient}
                start={[0,0]}
                end={[1,0]} 
                style={{...globalStyles.header, ...styles.header}}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={30} color="#ffffff" onPress = {()=>navigation.goBack()}/>
                </TouchableOpacity>
                <Text style={globalStyles.h2}>{item.title}</Text>
                <TouchableOpacity>
                    <MaterialIcons name="add-call" size={30} color="#ffffff" onPress = {() => Linking.openURL(phoneNum)} />
                </TouchableOpacity>
            </LinearGradient>

            <View style={{...globalStyles.content, ...styles.content}}>
                <TouchableOpacity 
                style={styles.title}
                activeOpacity={item.steps.categories == 1 && 1 }
                onPress={openDropDown}
                >
                    <Text style={globalStyles.h3}>{item.steps.categories > 1? activeBranch.AcTitle: 'Steps'}</Text>
                    {item.steps.categories > 1 && <Entypo name="chevron-down" size={20} color={mainColor} />}
                </TouchableOpacity>
                <View style={styles.steps}>
                    <FlatList 
                        data={stepDetails}
                        renderItem = {({item}) => (
                            <FirstAidSteps 
                            index={stepDetails.indexOf(item) + 1} 
                            stepText = {item}
                            color = {mainColor} 
                            />
                        )}
                        keyExtractor = {stepDetails => (Math.random() * 1000).toString()}
                    />
                </View>
            </View>

            {dropDownVisible && <FirstAidDropDown 
                content={[item.steps.title1, item.steps.title2, item.steps.title3]}
                color = {mainColor}
                set = {set}
                />}
        </LinearGradient>
    )
}

export default FirstAidDetailsScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f77612',
    },
    header:{
        alignItems: 'flex-end', 
        height: 75,
        backgroundColor: '#f77612',
    },
    content:{
        marginTop: 10,
        paddingTop: 25,
        paddingHorizontal: 0,
    },
    title:{
        marginLeft: 25,
        flexDirection: 'row',
    },
    steps:{
        flex: 1,
        paddingHorizontal: 25,
        marginTop: 25,
        backgroundColor: '#ffffff',
    }
})
