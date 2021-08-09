import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalColours } from '../styles/global'
import { useColor } from '../styles/ThemeContext'

const FirstAidSteps = ({index, stepText, color}) => {
    const colors = useColor()

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
            color: colors.tetTextColor,
            marginTop: 10,
        },
        emText:{
            fontWeight: 'bold',
            color: colors.tetColor1,
        }
    })
    
    return (
        <View style={styles.stepsCard}>
            <Text style={{...styles.stepNum, backgroundColor: color}}>Step {index}</Text>
            {/* <View style={styles.image}></View> */}
            <Text style={styles.text}><Text style={styles.emText}>{Array.isArray(stepText) && stepText[0]}</Text>{Array.isArray(stepText)? stepText[1]: stepText}</Text>
        </View>
    )
}

export default FirstAidSteps