import React, {useState} from 'react';
import { View, Text } from 'react-native';
import FirstAidDetailsScreen from './screens/FirstAidDetailsScreen';


export default function App() {
  const [firstAid, setfirstAid] = useState([
    {
      id: 1,
      title: 'Resuscitation',
      color: '#ffaadd',
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
      color: '#ffaaaa',
      description: '',
      steps: []
    },
    {
      id: 3,
      title: 'Choking',
      color: '#aaffaa',
      description: '',
      steps: []
    },
    {
      id: 4,
      title: 'Asthma',
      color: '#aaaaff',
      description: '',
      steps: []
    },
    {
      id: 5,
      title: 'Burns',
      color: '#ddffaa',
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
      color: '#ffaaff',
      description: '',
      steps: []
    },
    {
      id: 7,
      title: 'Sprains',
      color: '#ffffaa',
      description: '',
      steps: []
    }
  ])

  return (
    <FirstAidDetailsScreen firstAid={firstAid[4]} />
  );
}