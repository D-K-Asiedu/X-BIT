import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { globalStyles, globalColours } from '../styles/global'
import FirstAidCard from '../components/FirstAidCard'
import { Feather, Ionicons } from '@expo/vector-icons'
import NavBar from '../components/NavBar';
import firstAidData from '../data/firstAidData';
import { useTheme } from '../styles/ThemeContext'

const FirstAidScreen = ({ navigation }) => {
  const [firstAid, setFirstAid] = useState([])
  const [searchActive, setSearchActive] = useState(false)
  const [searchText, setSearchText] = useState('')
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


  useEffect(() => {
    setFirstAid(firstAidData)
  }, [])

  const SearchHeader = ({navigation}) => {
    return (
      <View style={{ ...globalStyles.header, backgroundColor: mainColor }}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={25} color="#ffffff" onPress={() => {
            setSearchText('')
            setSearchActive(false)
            }} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search first aid ..."
          // autoFocus={true}
          // underlineColorAndroid="transparent"
          // autoCompleteType="off"
          onChangeText = {text => setSearchText(text) }
          // defaultValue={searchText}
          // maxLength={20}
        />
      </View>
    )
  }

  const DefaultHeader = () => {
    return (
      <View style={{...globalStyles.header, backgroundColor: mainColor}}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
        >
          <Feather name="menu" size={30} color='white' />
        </TouchableOpacity>
        <Text style={globalStyles.h2}>First aid guide</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color='white' onPress={() => setSearchActive(true)} />
        </TouchableOpacity>
      </View>
    )
  }

  // const searchItem = () => {
  //   setFirstAid(firstAidData.filter((item) => (
  //     item.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1
  //   )))
  // }

  // useEffect(() => {
  //   searchItem()
  // }, [searchText])


  return (
    <View style={{...globalStyles.container, backgroundColor: mainColor}}>
      {searchActive ? <SearchHeader /> : <DefaultHeader />}

      <View style={globalStyles.content}>
      {firstAid.length == 0 && searchActive && <Text style={styles.errText}>No results</Text>}
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
      </View>

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
    fontStyle: 'italic',
    color: globalColours.greyBlue,
    textAlign: 'center',
    marginTop: 20,
  }
})