import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Touchable } from 'react-native'
import { globalStyles } from '../styles/global'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import FirstAidSteps from '../components/FirstAidSteps';

const FirstAidDetailsScreen = ({navigation}) => {
    const [activeStep, setActiveStep]  = useState(1)
    const [activeBranch, setActiveBranch] = useState({})
    const [stepDetails, setStepDetails] = useState([])

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
    }, [])

    useEffect(() => {
        setStepDetails(activeBranch.AcSteps)
    }, [activeBranch])

    return (
        <View style={{...globalStyles.container, ...styles.container}}>
            <View style={{...globalStyles.header, ...styles.header}}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={30} color="#ffffff" onPress = {()=>navigation.goBack()}/>
                </TouchableOpacity>
                <Text style={globalStyles.h2}>{navigation.getParam(`title`)}</Text>
                <TouchableOpacity>
                    <MaterialIcons name="add-call" size={30} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={{...globalStyles.content, ...styles.content}}>
                <TouchableOpacity 
                style={styles.title}
                activeOpacity={navigation.getParam('steps').categories == 1 && 1 }
                >
                    <Text style={globalStyles.h3}>{navigation.getParam('steps').categories > 1? activeBranch.AcTitle: 'Steps'}</Text>
                    {navigation.getParam('steps').categories > 1 && <Entypo name="chevron-down" size={20} color="#f77612" />}
                </TouchableOpacity>
                <View style={styles.steps}>
                    <FlatList 
                        data={stepDetails}
                        renderItem = {({item}) => (
                            <FirstAidSteps 
                            index={stepDetails.indexOf(item) + 1} 
                            stepText = {item} 
                            />
                        )}
                        keyExtractor = {stepDetails => Math.random() * 1000}
                    />
                </View>
            </View>
        </View>
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
