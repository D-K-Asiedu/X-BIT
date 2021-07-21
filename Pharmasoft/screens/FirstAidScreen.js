import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import FirstAidCard from '../components/FirstAidCard'
import { Feather, Ionicons } from '@expo/vector-icons'
import NavBar from '../components/NavBar';
import firstAidData from '../data/firstAidData';
import { StatusBar } from 'expo-status-bar'

const FirstAidScreen = ({ navigation }) => {
  const [firstAid, setFirstAid] = useState([])
  const [searchActive, setSearchActive] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setFirstAid(firstAidData)
  }, [])

  const SearchHeader = () => {
    return (
      <View style={{ ...globalStyles.header, ...styles.header }}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={25} color="#ffffff" onPress={() => {
            setSearchText('')
            setSearchActive(false)
            }} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search first aid ..."
          autoFocus={true}
          underlineColorAndroid="transparent"
          onChangeText = {text => setSearchText(text) }
          defaultValue={searchText}
        />
      </View>
    )
  }

  const DefaultHeader = () => {
    return (
      <View style={globalStyles.header}>
        <TouchableOpacity>
          <Feather name="menu" size={30} color='white' />
        </TouchableOpacity>
        <Text style={globalStyles.h2}>First aid guide</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color='white' onPress={() => setSearchActive(true)} />
        </TouchableOpacity>
      </View>
    )
  }

  const searchItem = () => {
    setFirstAid(firstAidData.filter((item) => (
      item.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1
    )))
  }

  useEffect(() => {
    searchItem()
  }, [searchText])


  return (
    <View style={globalStyles.container}>
      {searchActive ? <SearchHeader /> : <DefaultHeader />}

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
          keyExtractor={firstAid => firstAid.id.toString()}
        />
        {firstAid.length == 0 && <Text style={styles.errText}>No results</Text>}
      </View>

      <NavBar active='first-aid' />
      <StatusBar style="light" backgroundColor="transparent" />
    </View>
  )
};

export default FirstAidScreen

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginHorizontal: 20,
  },
  errText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColours.lightGrey,
  }
})