import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import FirstAidCard from '../components/FirstAidCard'
import { Feather, Ionicons } from '@expo/vector-icons'
import NavBar from '../components/NavBar';
import firstAidData from '../data/firstAidData';

const FirstAidScreen = ({ navigation }) => {
  const [firstAid, setFirstAid] = useState([])

  useEffect(() => {
    setFirstAid(firstAidData)
  }, [])

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
          data={firstAid}
          renderItem={({ item }) => (
            <FirstAidCard
              id={item.id}
              title={item.title}
              bgColor={globalColours.firstAid[item.image]}
              image={item.image}
              description={item.description}
              viewDetails={() => {
                navigation.navigate('FirstAidDetails', item)
              }}
            />
          )}
          keyExtractor={firstAid => firstAid.id}
        />
      </View>

      {/* <TouchableOpacity onPress={()=>{
                navigation.navigate('FirstAidDetails')
            }}>
                <Text>Press here</Text>
            </TouchableOpacity> */}

      <NavBar active='first-aid' />
    </View>
  )
};

export default FirstAidScreen

const styles = StyleSheet.create({
})