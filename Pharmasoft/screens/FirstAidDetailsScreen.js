import React, {useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { globalStyles } from '../styles/global'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import FirstAidSteps from '../components/FirstAidSteps';

const FirstAidDetailsScreen = ({firstAid}) => {
    const [activeStep, setActiveStep] = useState(firstAid.steps[0])
    const [stepDetails, setStepDetails] = useState(activeStep.filter((step) => (activeStep.indexOf(step) != 0)))

    return (
        <View style={{...globalStyles.container, ...styles.container}}>
            <View style={{...globalStyles.header, ...styles.header}}>
                <View>
                    <Ionicons name="arrow-back" size={30} color="#ffffff" />
                </View>
                <Text style={globalStyles.h2}>{firstAid.title}</Text>
                <View>
                    <MaterialIcons name="add-call" size={30} color="#ffffff" />
                </View>
            </View>

            <View style={{...globalStyles.content, ...styles.content}}>
                <View style={styles.title}>
                    <Text style={globalStyles.h3}>{activeStep[0]}</Text>
                    {firstAid.steps.length > 1 && <Entypo name="chevron-down" size={20} color="#f77612" />}
                </View>
                <View style={styles.steps}>
                    {/* <FirstAidSteps index={1} emText='Title.' details=' Text here' /> */}
                    <FlatList 
                        data={stepDetails}
                        renderItem = {({item}) => (
                            <FirstAidSteps index={item[0]} emText={item[1]} details={item[2]} />
                        )}
                        keyExtractor = {stepDetails => stepDetails[0]}
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
