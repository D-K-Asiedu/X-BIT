import React from 'react'
import { View } from 'react-native';
import HomeScreen from "../screens/HomeScreen";
import ShopScreen from "../screens/ShopScreen";
import FirstAidStack from "./FirstAidStack";
import NavBar from '../components/NavBar';
import { useState } from 'react';

const PseudoTabNav = () => {
    const [page, setPage] = useState('first-aid')

    // Navigate
    const navigate = (nav) => {
        setPage(nav)
    }

    switch (page) {
        case 'home':
            return (
                <View style={{ flex: 1 }}>
                    <HomeScreen/>
                    <NavBar active='home' navigate={navigate} />
                </View>
            )

        case 'shop':
            return (
                <View style={{ flex: 1 }}>
                    <ShopScreen navigate={navigate} />
                    <NavBar active='shop' navigate={navigate} />
                </View>
            )

        case 'first-aid':
            return (
                <View style={{ flex: 1 }}>
                    <FirstAidStack navigate={navigate} />
                    <NavBar active='first-aid' navigate={navigate} />
                </View>
            )

        default:
            break;
    }
}

export default PseudoTabNav
