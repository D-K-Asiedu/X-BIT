import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import FirstAidCard from '../components/FirstAidCard'
import {Feather, Ionicons} from '@expo/vector-icons'
import NavBar from '../components/NavBar';
// import firstAidData from '../data/firstAidData';

const FirstAidScreen = ({navigation}) => {
    const [firstAid, setFirstAid] = useState(
[        {
            id: 1,
            title: 'Resuscitation',
            image: 'heart',
            description: '',
            steps: [
              ['Steps',
                [1,'Title 1. ','Text 1'],
                [2,'Title 2. ','Text 2']
              ]
            ]
          },
          {
            id: 2,
            title: 'Bleeding',
            image: 'blood',
            description: '',
            steps: []
          },
          {
            id: 3,
            title: 'Choking',
            image: 'choke',
            description: '',
            steps: []
          },
          {
            id: 4,
            title: 'Asthma',
            image: 'lung',
            description: '',
            steps: []
          },
          {
            id: 5,
            title: 'Burns',
            image: 'fire',
            description: '',
            steps: [
              ['Major burns',
                [1,'Title 1','Text 1'],
                [2,'Title 2','Text 2']
              ],
              ['Minor burns',
                [1,'Title 1','Text 1'],
                [2,'Title 2','Text 2']
            ]
            ]
          },
          {
            id: 6,
            title: 'Poisoning',
            image: 'poison',
            description: '',
            steps: []
          },
          {
            id: 7,
            title: 'Sprains',
            image: '',
            description: '',
            steps: []
          }      
]    )

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <TouchableOpacity>
                    <Feather name="menu" size={30} color='white' />
                </TouchableOpacity>
                <Text style={globalStyles.h2}>First aid guide</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color='white' />
                </TouchableOpacity>
            </View>

            <View style={globalStyles.content}>
                <FlatList
                    data = {firstAid}
                    renderItem = {({item}) => (
                        <FirstAidCard 
                        id={item.id} 
                        title={item.title} 
                        bgColor={globalColours.firstAid[item.image]} 
                        image={item.image} 
                        description = {item.description}
                        viewDetails = {()=>{
                            navigation.navigate('FirstAidDetails', item)
                        }}
                         />
                    )}
                    keyExtractor = {firstAid => firstAid.id}
                />
            </View>

            {/* <TouchableOpacity onPress={()=>{
                navigation.navigate('FirstAidDetails')
            }}>
                <Text>Press here</Text>
            </TouchableOpacity> */}

            <NavBar active = 'first-aid' />
        </View>
    )
};

export default FirstAidScreen

const styles = StyleSheet.create({
})