import React from 'react';
import { Text, View } from 'react-native';
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  TabBarBottom,
  SwitchNavigator
} from 'react-navigation';
import { Icon } from 'native-base';

import OnBoardingScreen from './../Screen/OnBoardingScreen';
// import SplashScreen from './../Screen/SplashScreen';
import SignupScreen from './../Screen/SignupScreen';
import ResetScreen from './../Screen/ResetScreen';
import LoginScreen from './../Screen/LoginScreen';
import BusinessListScreen from './../Screen/BusinessListScreen';
import NewBusinessScreen from './../Screen/NewBusinessScreen';
import NewOrderScreen from './../Screen/NewOrderScreen';
import NewProductScreen from './../Screen/NewProductScreen';
import NewCustomerScreen from './../Screen/NewCustomerScreen';
import SettingsScreen from './../Screen/SettingsScreen';
import BusinessDetailsScreen from './../Screen/BusinessDetailsScreen';
import DebtScreen from './../Screen/DebtScreen';
import ProductScreen from './../Screen/ProductScreen';
import OrderScreen from './../Screen/OrderScreen';
import OrderDetailsScreen from './../Screen/OrderDetailsScreen';
import CustomerScreen from './../Screen/CustomerScreen';
import DebtsScreen from './../Screen/DebtsScreen';
import DebtDetailsScreen from './../Screen/DebtDetailsScreen';
import ProductDetailsScreen from './../Screen/ProductDetailsScreen';
import UserProfileScreen from '../Screen/UserProfileScreen';
import Sidebar from './Sidebar';
import styles from './../Style/Layout';
import { color } from './../Style/Color';

const viewBusinessStack = TabNavigator(
  {
    Product: {
      screen: ProductScreen
    },
    Order: {
      screen: OrderScreen
    },
    Customers: {
      screen: CustomerScreen
    },
    Debts: {
      screen: DebtsScreen
    }
  },
  {
    navigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused }: any) => {
        const { routeName } = navigation.state
        let iconName
        let tabColor
        if (routeName === 'Product') {
          iconName = 'basket'
          tabColor = focused ? color.primary : color.inactive
        } else if (routeName === 'Order') {
          iconName = 'cart'
          tabColor = focused ? color.primary : color.inactive
        } else if (routeName === 'Customers') {
          iconName = 'person'
          tabColor = focused ? color.primary : color.inactive
        } else if (routeName === 'Debts') {
          iconName = 'database'
          tabColor = focused ? color.primary : color.inactive
        }
        return (
          <View style={{ alignItems: 'center' }}>
            <Icon
              name={iconName}
              style={{ color: tabColor }}
              type={
                routeName === 'Debts' ? 'MaterialCommunityIcons' : 'Ionicons'
              }
            />
            <Text style={{ color: tabColor }}>{routeName}</Text>
          </View>
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: color.primary,
      inactiveTintColor: color.inactive,
      showLabel: false,
      style: {
        backgroundColor: color.secondary,
        height: 60,
        paddingVertical: 8
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true
  }
)

const businessStack = StackNavigator(
  {
    BusinessList: {
      screen: BusinessListScreen
    },
    NewBusiness: {
      screen: NewBusinessScreen
    },
    ViewBusiness: {
      screen: viewBusinessStack
    },
    BusinessDetails: {
      screen: BusinessDetailsScreen
    },
    Settings: {
      screen: SettingsScreen
    },
    Debt: {
      screen: DebtScreen
    },
    DebtDetails: {
      screen: DebtDetailsScreen
    },
    NewCustomer: {
      screen: NewCustomerScreen
    },
    NewOrder: {
      screen: NewOrderScreen
    },
    OrderDetails: {
      screen: OrderDetailsScreen
    },
    NewProduct: {
      screen: NewProductScreen
    },
    ProductDetails: {
      screen: ProductDetailsScreen
    },
    UserProfile: {
      screen: UserProfileScreen
    }
  },
  {
    initialRouteName: 'BusinessList',
    navigationOptions: ({ navigation }: any) => ({
      title: 'BusinessList',
      headerLeft: (
        <Icon
          name={'menu'}
          onPress={() => navigation.navigate('DrawerToggle')}
          style={styles.menuIcon}
        />
      ),
      headerTintColor: color.secondary,
      headerStyle: {
        backgroundColor: color.header
      }
    })
  }
)

const drawerStack = DrawerNavigator(
  {
    BusinessList: businessStack
  },
  {
    initialRouteName: 'BusinessList',
    contentComponent: (props: any) => <Sidebar {...props} />,
    contentOptions: {
      activeTintColor: color.secondary,
      activeBackgroundColor: color.primary,
      inactiveTintColor: color.primary
    }
  }
)

const authStack = StackNavigator(
  {
    OnBoarding: OnBoardingScreen,
    Login: LoginScreen,
    Reset: ResetScreen,
    Signup: SignupScreen
  },
  {
    headerMode: 'none'
  }
)

const switchStack = SwitchNavigator(
  {
    Auth: authStack,
    App: drawerStack
  },
  {
    initialRouteName: 'Auth'
  }
)

export default switchStack
