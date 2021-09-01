import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { 
    Entypo, 
    FontAwesome, 
    Fontisto, 
    FontAwesome5, 
    MaterialIcons,
    AntDesign,
} from '@expo/vector-icons';
import { globalColours } from '../styles/global';
import { useTheme } from '../styles/ThemeContext';

const icons = {
    "email": <Entypo name="email" size={15} color={globalColours.lightGrey} />,
    "phone": <FontAwesome name="phone" size={15} color={globalColours.lightGrey} />,
    "date": <Fontisto name="date" size={15} color={globalColours.lightGrey} />,
    "allergies": <FontAwesome5 name="allergies" size={15} color={globalColours.lightGrey} />,
    "name": <AntDesign name="user" size={15} color={globalColours.lightGrey} />,
    "password": <Entypo name="lock" size={15} color={globalColours.lightGrey} />
}

const ProfileInfo = (props) => {
    const [mainColor, setMainColour] = useState('')

    const theme = useTheme()
  
    useEffect(() => {
      switch (theme.colortheme) {
        case 'green':
          setMainColour(globalColours.mainCol)
          break;
        case 'blue':
          setMainColour(globalColours.mainCol2)
          break;
        case 'pink':
          setMainColour(globalColours.mainCol3)
          break;
    
      
        default:
          break;
      }
    }, [theme.colortheme])
  

    return (
        <TouchableOpacity style={styles.infoCard} onPress={() => props.editProfile(props.title)}>
            <View>
                <View style={styles.title}>
                    {icons[props.icon]}
                    <Text style={styles.titleText}>{props.title}</Text>
                </View>
                {Array.isArray(props.profile)?
                    <View style={styles.array}>
                        {/* <Text style={styles.textBox}>Fuck off</Text>
                        <Text style={styles.textBox}>Fuck off</Text>
                        <Text style={styles.textBox}>Fuck off</Text>
                        <Text style={styles.textBox}>Fuck off</Text>
                        <Text style={styles.textBox}>Fuck off</Text>
                        <Text style={styles.textBox}>Fuck off</Text>
                        <Text style={styles.textBox}>Fuck off</Text>
                        <Text style={styles.textBox}>Fuck off</Text> */}
                        <FlatList
                            data={props.profile} 
                            horizontal = {true}
                            renderItem = {({item}) => (
                                <Text style={styles.textBox}>{item}</Text>
                            )}
                            keyExtractor = {() => (Math.random() * 1000).toString()}
                            />
                        {props.profile.length == 0 && <Text style={{...styles.profile, color: mainColor}}>Add alleries</Text>}
                    </View>
                    :
                    <Text
                    style={{
                        ...styles.profile,
                        color: !props.profile ? mainColor : globalColours.darkGrey
                    }}>
                    {props.profile || `Add ${props.title.toLowerCase()}`}
                </Text>
                }
            </View>
            <MaterialIcons name={props.profile.length != 0 ? "edit" : "add"} size={24} color={mainColor} />
        </TouchableOpacity>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    infoCard:{
        borderBottomWidth: 1,
        borderColor: '#d4d4d4',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },

    titleText: {
        fontSize: 14,
        letterSpacing: 1,
        marginLeft: 10,
        color: globalColours.lightGrey
    },

    profile: {
        fontSize: 16,
        letterSpacing: 1,
        color: globalColours.darkGrey,
    },
    array:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textBox:{
        paddingHorizontal: 7,
        paddingVertical: 5,
        margin: 2,
        borderRadius: 10,
        backgroundColor: '#00000033',
        fontSize: 16,
    }
})
