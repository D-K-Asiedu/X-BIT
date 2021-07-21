import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { globalColours, globalStyles } from '../styles/global'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import FirstAidSteps from '../components/FirstAidSteps';
import { LinearGradient } from 'expo-linear-gradient';
import FirstAidDropDown from '../components/FirstAidDropDown';
import { Linking } from 'react-native';

const FirstAidDetailsScreen = ({navigation}) => {
    const [activeStep, setActiveStep]  = useState(1)
    const [activeBranch, setActiveBranch] = useState({})
    const [stepDetails, setStepDetails] = useState([])
    const [dropDownVisible, setDropDownVisible] = useState(false)

    const phoneNum = "tel:911"

    useEffect(() => {
        switch (activeStep) {
            case 1:
                setActiveBranch({
                    AcTitle: navigation.getParam('steps').title1,
                    AcSteps: navigation.getParam('steps').steps1,
                })
                break;

            case 2:
                setActiveBranch({
                    AcTitle: navigation.getParam('steps').title2,
                    AcSteps: navigation.getParam('steps').steps2,
                })
                break;

            case 3:
                setActiveBranch({
                    AcTitle: navigation.getParam('steps').title3,
                    AcSteps: navigation.getParam('steps').steps3,
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
        if(navigation.getParam('steps').categories > 1){
            setDropDownVisible(true)
        }
    }

    const set = (step) => {
        setActiveStep(step)
        setDropDownVisible(false)
    }

    const mainColor = navigation.getParam('gradient')[0] || globalColours.mainCol

    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={() => setDropDownVisible(false)}>
        <View style={{...globalStyles.container, ...styles.container, backgroundColor:mainColor}}>
            {/* <LinearGradient
                colors={['red','blue']}
                style={styles.backGround} 
            /> */}
            <View style={{...globalStyles.header, ...styles.header, backgroundColor:mainColor}}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={30} color="#ffffff" onPress = {()=>navigation.goBack()}/>
                </TouchableOpacity>
                <Text style={globalStyles.h2}>{navigation.getParam(`title`)}</Text>
                <TouchableOpacity>
                    <MaterialIcons name="add-call" size={30} color="#ffffff" onPress = {() => Linking.openURL(phoneNum)} />
                </TouchableOpacity>
            </View>

            <View style={{...globalStyles.content, ...styles.content}}>
                <TouchableOpacity 
                style={styles.title}
                activeOpacity={navigation.getParam('steps').categories == 1 && 1 }
                onPress={openDropDown}
                >
                    <Text style={globalStyles.h3}>{navigation.getParam('steps').categories > 1? activeBranch.AcTitle: 'Steps'}</Text>
                    {navigation.getParam('steps').categories > 1 && <Entypo name="chevron-down" size={20} color={mainColor} />}
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
                content={[navigation.getParam('steps').title1, navigation.getParam('steps').title2, navigation.getParam('steps').title3]}
                color = {mainColor}
                set = {set}
                />}
        </View>
        </TouchableWithoutFeedback>
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
