import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalColours } from '../styles/global'

const FirstAidSteps = ({index, emText, details}) => {

    return (
        <View style={styles.stepsCard}>
            <Text style={styles.stepNum}>Step {index}</Text>
            <View style={styles.image}></View>
            <Text style={styles.text}><Text style={styles.emText}>{emText}</Text>{details}</Text>
        </View>
    )
}

export default FirstAidSteps

const styles = StyleSheet.create({
    stepsCard:{
        marginVertical: 25,
    },
    stepNum:{
        backgroundColor: '#f77612',
        width: 75,
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        borderRadius: 5,
    },
    image:{
        width: 360,
        height: 360,
        marginVertical: 10,
    },
    text:{
        fontSize: 16,
        color: globalColours.lightGrey,
    },
    emText:{
        fontWeight: 'bold',
        color: globalColours.darkBlue,
    }
})
