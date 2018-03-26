import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Icon } from 'native-base'

import BusinessListScreen from './../Screen/BusinessListScreen'
import NewBusinessScreen from './../Screen/NewBusinessScreen'
import ViewBusinessScreen from './../Screen/ViewBusinessScreen'
import Sidebar from './Sidebar'
import styles from './../Style/Layout'
import { color } from './../Style/Color'

const BusinessStack = StackNavigator(
    {
        BusinessList: {
            screen: BusinessListScreen
        },
        NewBusiness: {
            screen: NewBusinessScreen
        },
        ViewBusiness: {
            screen: ViewBusinessScreen
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
    // contentComponent: props => <Sidebar {...props}/>,
    contentOptions: {
        activeTintColor: color.secondary,
        activeBackgroundColor : color.primary,
        inactiveTintColor: color.primary
      }
  }
)

export default DrawerStack
