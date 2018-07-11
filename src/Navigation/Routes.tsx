import React from 'react'
import { Text, View } from 'react-native'
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  SwitchNavigator
} from 'react-navigation'
// import { Icon } from 'native-base'

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
import ServicesScreen from './../Screen/ServicesScreen'
import DebtDetailsScreen from './../Screen/DebtDetailsScreen'
import ProductDetailsScreen from './../Screen/ProductDetailsScreen'
import UserProfileScreen from '../Screen/UserProfileScreen'
import BusinessProfileScreen from '../Screen/BusinessProfileScreen'
import OrderListScreen from '../Screen/OrderListScreen'
import SecondSignUpScreen from '../Screen/SecondSignUpScreen'
import CustomerDetailScreen from '../Screen/CustomerDetailScreen'
import MainOrderList from '../Components/MainOrderList'
import Sidebar from './Sidebar'
// import styles from './../Style/Layout'
import { color } from './../Style/Color'
import EditUserProfileScreen from '../Screen/EditUserProfileScreen'
import EditBusinessProfileScreen from '../Screen/EditBusinessProfileScreen'
import HomeScreen from '../Screen/HomeScreen'
import EmployeesScreen from '../Screen/EmployeesScreen'
import VendorScreen from '../Screen/VendorScreen'
import PurchaseScreen from '../Screen/PurchaseScreen'
import SalesScreen from '../Screen/SalesScreen'
import BankScreen from '../Screen/BankScreen'
import IncomeScreen from '../Screen/IncomeScreen'
import ExpensesScreen from '../Screen/ExpensesScreen'
import InvoicesScreen from '../Screen/InvoicesScreen'
import ReceiptsScreen from '../Screen/ReceiptsScreen'
import InventoryScreen from '../Screen/InventoryScreen'
import ProfileSettingsScreen from '../Screen/ProfileSettingsScreen'
import CustomerScreen from '../Screen/CustomerScreen'
import VendorDetailScreen from '../Screen/VendorDetailsScreen'
import NewVendorScreen from '../Screen/NewVendorScreen'
import EditServiceScreen from '../Screen/EditServiceScreen'
import ServiceScreen from '../Screen/ServiceScreen'
import CustomHeader from '../Components/CustomHeader'

const viewBothStack = TabNavigator(
  {
    Products: {
      screen: ProductScreen
    },
    Services: {
      screen: ServicesScreen
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
        backgroundColor: color.check
      },
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 14,
        fontFamily: 'SourceSansPro'
      }
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
    Home: {
      screen: HomeScreen
    },
    Employees: {
      screen: EmployeesScreen
    },
    Vendor: {
      screen: VendorScreen
    },
    Purchase: {
      screen: PurchaseScreen
    },
    Sales: {
      screen: SalesScreen
    },
    Bank: {
      screen: BankScreen
    },
    Income: {
      screen: IncomeScreen
    },
    Receipts: {
      screen: ReceiptsScreen
    },
    Expenses: {
      screen: ExpensesScreen
    },
    Inventory: {
      screen: InventoryScreen
    },
    Invoice: {
      screen: InvoicesScreen
    },
    BusinessDetails: {
      screen: BusinessDetailsScreen
    },
    Settings: {
      screen: SettingsScreen
    },
    Profile: {
      screen: ProfileSettingsScreen
    },
    Debt: {
      screen: DebtScreen
    },
    DebtDetails: {
      screen: DebtDetailsScreen
    },
    Customer: {
      screen: CustomerScreen
    },
    NewCustomer: {
      screen: NewCustomerScreen
    },
    NewVendor: {
      screen: NewVendorScreen
    },
    NewOrder: {
      screen: NewOrderScreen
    },
    ViewBusiness: {
      screen: viewBothStack
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
    BusinessProfile: {
      screen: BusinessProfileScreen
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
    VendorDetails: {
      screen: VendorDetailScreen
    },
    EditUserProfile: {
      screen: EditUserProfileScreen
    },
    EditBusinessProfile: {
      screen: EditBusinessProfileScreen
    },
    EditServices: EditServiceScreen,
    ShowService: ServiceScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }: any) => ({
      header: (
        <CustomHeader
          title="Products & Services"
          menu
          onMenuPress={() => {
            navigation.navigate('DrawerToggle')
          }}
          firstRightIcon={'ios-search'}
          navigation={navigation}
          right
          onPressFirstRightIcon={() => console.log('Search icon pressed.')}
        />
      )
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
    SecondSignUp: SecondSignUpScreen
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
