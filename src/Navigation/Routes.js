import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Icon } from 'native-base'

import HomeScreen from './../Screen/HomeScreen'
import AboutScreen from './../Screen/AboutScreen'
import Sidebar from './Sidebar'
import styles from './../Style/Layout'
import { color } from './../Style/Color'

const DrawerStack = DrawerNavigator(
    {
        Home: {
            screen: StackNavigator(
                {
                    Home: {
                        screen: HomeScreen,
                        navigationOptions: ({ navigation }) => (
                            {
                                title: 'Home',
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
                },
                {
                    initialRouteName: 'Home'
                }
            )
        },
        About: {
            screen: StackNavigator(
                {
                    About: {
                        screen: AboutScreen,
                        navigationOptions: ({ navigation }) => (
                            {
                                title: 'About',
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
                },
                {
                    initialRouteName: 'About'
                }
            )
        }
    },
  {
    initialRouteName: 'Home',
    // contentComponent: props => <Sidebar {...props}/>,
    contentOptions: {
        activeTintColor: color.secondary,
        activeBackgroundColor : color.primary,
        inactiveTintColor: color.primary
      }
  }
)

export default DrawerStack
