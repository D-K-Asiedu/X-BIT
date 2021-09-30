import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { globalStyles, globalColors } from '../styles/global'
import { useTheme, useColor } from '../styles/ThemeContext'
import { Ionicons, } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler'
import { useAuth } from '../routes/AuthContext'
import {
    FontAwesome,
    Entypo,
    AntDesign,
    MaterialIcons,
} from '@expo/vector-icons';
import LoadingView from '../components/LoadingView'

const OrderDetailsScreen = ({ navigation }) => {
    const [active, setActive] = useState(true)
    const [transactions, setTransactions] = useState([])
    const [temp, setTemp] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const colors = useColor()
    const theme = useTheme()
    const server = useAuth().server
    const user = useAuth().user
    
    let isMounted = true
    let refreshInterval

    // Load transaction info on page load
    useEffect(() => {
        const tempFunc = async (temp) => {
            await loadTransactions()
        }

        const activeFunc = async (temp) => {
            await reloadTransactions()
        }


        isMounted = true

        isMounted && tempFunc()

        // refreshInterval = setInterval(() => {
        //     activeFunc()
        // }, 5000)

        return () => {
            console.log('unmount');
            setTemp([])
            // clearInterval(refreshInterval)
            isMounted = false
        }
    }, [])

    // Change grouped transactions when active changes
    useEffect(() => {
        const tempValue = groupedTransactions(temp)
        setTransactions(tempValue)
    }, [active])

    // Load transactions
    const loadTransactions = async () => {
        setIsLoading(true)
        setTemp(await fetchTransactions())
        setActive((value) => !value)
        setActive((value) => !value)
        setIsLoading(false)

    }

    // re-Load(update) transactions
    const reloadTransactions = async () => {
        console.log('reloading transactions...');
        const tempOrders = await fetchTransactions()

        if(temp != await tempOrders){
            console.log('updating transactions');
            setTemp()
            setIsLoading(true)
            setActive((value) => !value)
            setActive((value) => !value)
            setIsLoading(false)    
        }
    }


    // Group transactions
    const groupedTransactions = (temp) => {
        var transactions = []
        if (active) {
            transactions = temp.filter((item) => item.completed == 0 && item.canceled == 0)
        }
        else {
            transactions = temp.filter((item) => item.completed == 1 || item.canceled == 1)
        }
        const getIds = () => {
            const ids = []
            transactions.forEach(item => {
                const id = item.cart_id
                // console.log(id, ids.indexOf(id));
                ids.indexOf(id) == -1 && ids.push(id)
            });

            return ids
        }

        const transactionIds = getIds()
        const groupedByIds = []

        transactionIds.forEach((id) => {
            const group = transactions.filter((item) => item.cart_id == id)
            groupedByIds.push(group)
        })

        return groupedByIds
    }

    // Fetch transactions
    const fetchTransactions = async () => {
        const data = { "customer_id": user.id }

        const res = await fetch(`${server}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try {
            const transactions = await res.json()
            console.log(transactions);
            return transactions
        }
        catch (e) {
            console.log(e)
            return []
        }

    }

    // Tab box
    const TabBox = ({ title, active, navigate }) => {
        const boxStyle = {
            borderBottomWidth: active ? 5 : 0,
            borderColor: colors.constant,
        }

        return (
            <TouchableOpacity
                style={{ ...styles.tabBox, ...boxStyle }}
                activeOpacity={active ? 1 : 0.2}
                onPress={() => {
                    !active && navigate()
                }}
            >
                <Text style={styles.tabText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    // OrderCard
    const OrderCard = ({ card }) => {
        return (
            <View style={styles.orderCard}>
                <Text style={styles.orderTitle}>Cart ID {card[0].cart_id}</Text>
                <FlatList
                    data={card}
                    renderItem={({ item }) => (
                        <View style={styles.orderDetails}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.orderDetailsText}>Product name: {item.product_name}</Text>
                                <Text style={styles.orderDetailsText}>Quantity purchased: {item.quantity}</Text>
                                <Text style={styles.orderDetailsText}>Total amount: GHC {item['total price']}</Text>
                            </View>
                            <View style={styles.orderStatus}>
                                {item.completed == 1 &&
                                    <>
                                        <FontAwesome name="check-circle" size={20} color="#00dd33aa" />
                                        <Text style={{ color: '#00dd33aa', fontWeight: 'bold' }}>Completed</Text>
                                    </>
                                }
                                {item.canceled == 1 &&
                                    <>
                                        <Entypo name="circle-with-cross" size={20} color="#ff0000aa" />
                                        <Text style={{ color: '#ff0000aa', fontWeight: 'bold' }}>Cancelled</Text>
                                    </>
                                }
                                {(item.canceled == 0 && item.completed == 0) &&
                                    <>
                                        <AntDesign name="exclamationcircle" size={20} color="#ffaa00aa" />
                                        <Text style={{ color: '#ffaa00aa', fontWeight: 'bold' }}>In progress</Text>
                                    </>
                                }
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item['cart_id'].toString() + item['total price'].toString()}
                    listKey={(item) => item['cart_id'].toString() + item['total price'].toString()}
                />

            </View>
        )
    }

    // Styles
    const styles = StyleSheet.create({
        header: {
            backgroundColor: colors.mainColor,
        },
        pageTitle: {
            marginLeft: 30,
            flex: 1,
        },
        content: {
            backgroundColor: colors.mainBgColor,
            paddingHorizontal: 0,
        },
        tabBar: {
            flexDirection: 'row',
        },
        tabBox: {
            flex: 1,
            paddingVertical: 5,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginHorizontal: 20,
        },
        tabText: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.mainTextColor,
            backgroundColor: `#000000${theme.darkmode ? '33' : '11'}`,
            paddingVertical: 15,
            borderRadius: 20,
        },
        orders: {
            flex: 1,
            backgroundColor: colors.mainBgColor,
            paddingHorizontal: 20,
            paddingVertical: 5,
        },
        orderCard: {
            backgroundColor: colors.secBgColor,
            borderRadius: 20,
            marginTop: 20,
            marginBottom: 10,
            padding: 15,
            elevation: 2,
        },
        orderTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.tetColor2,
            borderBottomWidth: 1,
            borderColor: '#999999',
            paddingVertical: 5,
        },
        orderDetails: {
            flexDirection: 'row',
            marginVertical: 10,
        },
        orderDetailsText: {
            fontSize: 14,
            color: colors.tetTextColor,
        },
        orderStatus: {
            flexBasis: '30%',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>
            <View style={{ ...globalStyles.header, ...styles.header }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Orders</Text>
                <TouchableOpacity
                    onPress={() => loadTransactions()}
                >
                    <MaterialIcons name="refresh" size={30} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={{ ...globalStyles.content, ...styles.content }}>
                <View style={styles.tabBar}>
                    <TabBox title="Active" active={active} navigate={() => setActive(true)} />
                    <TabBox title="Ended" active={!active} navigate={() => setActive(false)} />
                </View>
                {!isLoading &&
                    <View style={styles.orders}>

                        {!transactions[0] &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Ionicons name="ios-file-tray-full-outline" size={75} color={colors.tetColor2} />
                                <Text style={{ fontSize: 16, color: colors.tetTextColor }}>{`You have no ${active ? 'active' : 'completed'} orders`}</Text>
                            </View>
                        }

                        {transactions &&
                            <FlatList
                                data={transactions}
                                renderItem={({ item }) => (
                                    <OrderCard card={item} />
                                )}
                                keyExtractor={(item) => (Math.random() * 1000 + 1000).toString()}
                                listKey={(Math.random() * 1000 + 1000).toString()}
                            />
                        }

                    </View>}
                {isLoading && <LoadingView size={50} />}
            </View>

        </View>
    )
}

export default OrderDetailsScreen