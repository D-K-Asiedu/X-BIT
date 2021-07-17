import React, {useState} from 'react';
import { View, Text } from 'react-native';
import FirstAidDetailsScreen from './screens/FirstAidDetailsScreen';
import FirstAidScreen from './screens/FirstAidScreen';


export default function App() {
  const [firstAid, setfirstAid] = useState([
    {
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
  ])

  return (
    <FirstAidScreen firstAid={firstAid} />
    // <FirstAidDetailsScreen firstAid={firstAid[4]} />
  );
}