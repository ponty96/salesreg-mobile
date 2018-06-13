import React from 'react'
import { Text, View } from 'react-native'
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  SwitchNavigator
} from 'react-navigation'
import { Icon } from 'native-base'

import OnBoardingScreen from './../Screen/OnBoardingScreen'
// import SplashScreen from './../Screen/SplashScreen';
import SignupScreen from './../Screen/SignupScreen'
import ResetScreen from './../Screen/ResetScreen'
import LoginScreen from './../Screen/LoginScreen'
// import BusinessListScreen from './../Screen/BusinessListScreen';
import NewBusinessScreen from './../Screen/NewBusinessScreen'
import NewOrderScreen from './../Screen/NewOrderScreen'
import NewProductScreen from './../Screen/NewProductScreen'
import NewCustomerScreen from './../Screen/NewCustomerScreen'
import SettingsScreen from './../Screen/SettingsScreen'
import BusinessDetailsScreen from './../Screen/BusinessDetailsScreen'
import DebtScreen from './../Screen/DebtScreen'
import ProductScreen from './../Screen/ProductScreen'
// import OrderScreen from './../Screen/OrderScreen';
import OrderDetailsScreen from './../Screen/OrderDetailsScreen'
// import CustomerScreen from './../Screen/CustomerScreen';
// import DebtsScreen from './../Screen/DebtsScreen';
import ServiceScreen from './../Screen/ServiceScreen'
import DebtDetailsScreen from './../Screen/DebtDetailsScreen'
import ProductDetailsScreen from './../Screen/ProductDetailsScreen'
import UserProfileScreen from '../Screen/UserProfileScreen'
import OrderListScreen from '../Screen/OrderListScreen'
import SignUp2Screen from '../Screen/SignUp2Screen'
import CustomerDetailScreen from '../Screen/CustomerDetailScreen'
import MainOrderList from '../Components/MainOrderList'
import Sidebar from './Sidebar'
import styles from './../Style/Layout'
import { color } from './../Style/Color'
import EditUserProfileScreen from '../Screen/EditUserProfileScreen'

let OPTION = 'both'

const viewBothStack = TabNavigator(
  {
    Products: {
      screen: ProductScreen
    },
    Services: {
      screen: ServiceScreen
    }
  },
  {
    navigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused }: any) => {
        const { routeName } = navigation.state
        let tabColor
        if (routeName === 'Products') {
          tabColor = focused ? color.secondary : color.secondary
        } else if (routeName === 'Services') {
          tabColor = focused ? color.secondary : color.secondary
        }
        return (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: tabColor, fontWeight: 'bold', fontSize: 20 }}>
              {routeName}
            </Text>
          </View>
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: color.secondary,
      inactiveTintColor: color.secondary,
      showLabel: true,
      style: {
        backgroundColor: color.primary,
        height: 60,
        paddingVertical: 8
      },
      indicatorStyle: {
        backgroundColor: 'lightblue'
      },
      upperCaseLabel: false
    },
    animationEnabled: false,
    swipeEnabled: true
  }
)

const businessStack = StackNavigator(
  {
    NewBusiness: {
      screen: NewBusinessScreen
    },
    ViewBusiness: {
      screen:
        OPTION === 'both'
          ? viewBothStack
          : OPTION === 'product'
            ? ProductScreen
            : ServiceScreen
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
    },
    OrderList: {
      screen: OrderListScreen
    },
    MainOrder: {
      screen: MainOrderList
    },
    CustomerDetails: {
      screen: CustomerDetailScreen
    },
    EditUserProfile: {
      screen: EditUserProfileScreen
    }
  },
  {
    initialRouteName: 'BusinessList',
    navigationOptions: ({ navigation }: any) => ({
      title: 'Products & Services',
      headerLeft: (
        <Icon
          name={'menu'}
          onPress={() => navigation.navigate('DrawerToggle')}
          style={styles.menuIcon}
        />
      ),
      headerTintColor: color.secondary,
      headerStyle: {
        backgroundColor: color.primary
      }
    })
  }
)

const drawerStack = DrawerNavigator(
  {
    ViewBusiness: businessStack
  },
  {
    initialRouteName: 'ViewBusiness',
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
    Signup: SignupScreen,
    SignUp2: SignUp2Screen
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
