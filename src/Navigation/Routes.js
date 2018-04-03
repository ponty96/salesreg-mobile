import React from 'react'
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'
import { Icon } from 'native-base'

import BusinessListScreen from './../Screen/BusinessListScreen'
import NewBusinessScreen from './../Screen/NewBusinessScreen'
import ViewBusinessScreen from './../Screen/ViewBusinessScreen'
import SettingsScreen from './../Screen/SettingsScreen'
import BusinessDetailsScreen from './../Screen/BusinessDetailsScreen'
import HomeScreenTabNavigator from './../Screen/HomeTabNavigator'
import DebtScreen from './../Screen/DebtScreen'
import Sidebar from './Sidebar'
import styles from './../Style/Layout'
import { color } from './../Style/Color'

// const ViewBusinessStack = TabNavigator(
//     {
//         Product: {
//             screen: BusinessListScreen
//         },
//         Order: {
//             screen: NewBusinessScreen
//         },
//         Customer: {
//             screen: ViewBusinessScreen
//         },
//         Debts: {
//             screen: ViewBusinessScreen
//         }
//     }
// )

const BusinessStack = StackNavigator(
    {
        BusinessList: {
            screen: HomeScreenTabNavigator
        },
        NewBusiness: {
            screen: NewBusinessScreen
        },
        ViewBusiness: {
            screen: ViewBusinessScreen
        },
        BusinessDetails: {
            screen: BusinessDetailsScreen
        },
        Settings: {
            screen: SettingsScreen
        },
        Debt: {
            screen: DebtScreen
        }
    },
    {
        initialRouteName: 'BusinessList',
        navigationOptions: ({ navigation }) => (
            {
                title: 'BusinessList',
                headerLeft: <Icon
                            name={'menu'}
                            onPress={() => navigation.navigate('DrawerToggle')}
                            style={styles.menuIcon}
                        />,
                headerTintColor: color.secondary,
                headerStyle: {
                    backgroundColor: color.primary
                }
            }
        )
    }
)

const DrawerStack = DrawerNavigator(
    {
        BusinessList: BusinessStack
    },   
    {
        initialRouteName: 'BusinessList',
        contentComponent: props => <Sidebar {...props}/>,
        contentOptions: {
            activeTintColor: color.secondary,
            activeBackgroundColor : color.primary,
            inactiveTintColor: color.primary
        }
    }
)

export default DrawerStack
