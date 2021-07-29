import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import { Ionicons } from '@expo/vector-icons'

const Section = ({title, options, state, setState}) => (
    <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList 
            data={options}
            renderItem={({item}) => (
                <Selection 
                    title={item} 
                    active={item.toLowerCase() == state}
                    setActive = {setState} 
                />
            )}
            keyExtractor={() => (Math.random()*1000).toString()}
        />
    </View>
)

const Selection = ({title, active, setActive}) => {
    return(
        <TouchableOpacity 
            style={styles.selection}
            onPress = {() => setActive(title.toLowerCase())}
        >
            <Text style={styles.title}>{title}</Text>
            <Radio active={active} />
        </TouchableOpacity>
    )
}

const Radio =  ({active, size, color}) => {
    return(
        <View style={{
            width: size || 20,
            height: size || 20,
            borderRadius: size/2 || 10,
            borderWidth: 2,
            borderColor: color || globalColours.mainCol,
            padding: 3,
            justifyContent: 'center',
        }}>
            <View style={{
                flex: 1,
                borderRadius: size/2 || 10,
                backgroundColor: active && (color || globalColours.mainCol),
            }}>

            </View>
        </View>
    )
}

const SettingsScreen = ({navigation}) => {
    const [darkMode, setDarkMode] = useState('off')
    const [darkTheme, setDarkTheme] = useState('dim')
    const [colorTheme, setColorTheme] = useState('green')

    return (
        <View style={{...globalStyles.container}}>
            <View style={{...globalStyles.header, ...styles.header}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{...globalStyles.h2, ...styles.h2}}>Settings</Text>
            </View>

            <View style={{...globalStyles.content, paddingHorizontal: 0, paddingTop: 0}}>
                <Section 
                    title="Dark mode" 
                    options={['Off', 'On', 'System']} 
                    state={darkMode}
                    setState={setDarkMode} 
                />
                <Section 
                    title="Dark theme" 
                    options={['Dim', 'Lights out']} 
                    state={darkTheme} 
                    setState={setDarkTheme} 
                />
                <Section 
                    title="Color theme" 
                    options={['Green', 'Blue', 'Pink']} 
                    state={colorTheme} 
                    setState={setColorTheme} 
                />
            </View>

        </View>
)}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
        borderBottomColor: '#d4d4d4',
        borderBottomWidth: 1,
    },
    h2:{
        marginLeft: 30,
    },
    selection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#d4d4d4'
    },
    sectionTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        color: globalColours.lightGrey,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#d4d4d4',
        backgroundColor: '#e8e8e8',
    },
    title:{
        fontSize: 18,
        color: globalColours.darkGrey,
    },
    status:{
        fontSize: 14,
        fontWeight: 'bold',
        color: globalColours.lightGrey,
    }
})

export default SettingsScreen
