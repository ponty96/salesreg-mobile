import React from 'react'
import { Text, View } from 'react-native'
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  SwitchNavigator
} from 'react-navigation'

import OnBoardingScreen from './../Screen/OnBoardingScreen'
import SignupScreen from './../Screen/SignupScreen'
import ResetScreen from './../Screen/ResetScreen'
import LoginScreen from './../Screen/LoginScreen'
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
import { color } from './../Style/Color'
import EditUserProfileScreen from '../Screen/EditUserProfileScreen'
import EditBusinessProfileScreen from '../Screen/EditBusinessProfileScreen'
import HomeScreen from '../Screen/HomeScreen'
import EmployeesScreen from '../Screen/EmployeesScreen'
import VendorScreen from '../Screen/VendorScreen'
import PurchaseScreen from '../Screen/PurchaseScreen'
import SalesOrderScreen from '../Screen/SalesOrderScreen'
import BankScreen from '../Screen/BankScreen'
import IncomeScreen from '../Screen/IncomeScreen'
import ExpensesScreen from '../Screen/ExpensesScreen'
import InvoicesScreen from '../Screen/InvoicesScreen'
import ReceiptsScreen from '../Screen/ReceiptsScreen'
import InventoryScreen from '../Screen/InventoryScreen'
import ProfileSettingsScreen from '../Screen/ProfileSettingsScreen'
import EditServiceScreen from '../Screen/EditServiceScreen'
import ServiceScreen from '../Screen/ServiceScreen'
import CustomHeader from '../Components/CustomHeader'
import ProductSalesOrderScreen from '../Screen/ProductSalesOrderScreen'
import ServicesSalesOrderScreen from '../Screen/ServicesSalesOrderScreen'
import EditProductDetailScreen from '../Screen/EditProductDetailScreen'

let BOTH = 'both'
let ONE_PRODUCT = 'product'
let OPTION = 'both'

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

const salesOrderTab = TabNavigator(
  {
    Products: {
      screen: ProductSalesOrderScreen
    },
    Services: {
      screen: ServicesSalesOrderScreen
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
    SalesOrder: {
      screen: SalesOrderScreen
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
    NewCustomer: {
      screen: NewCustomerScreen
    },
    NewOrder: {
      screen: NewOrderScreen
    },
    ViewBusiness: {
      screen:
        OPTION === BOTH
          ? viewBothStack
          : OPTION === ONE_PRODUCT
            ? ProductScreen
            : ServicesScreen
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
    EditUserProfile: {
      screen: EditUserProfileScreen
    },
    EditBusinessProfile: {
      screen: EditBusinessProfileScreen
    },
    EditServices: EditServiceScreen,
    ShowService: ServiceScreen,
    EditProductDetail: EditProductDetailScreen,
    salesOrderTab: {
      screen:
        OPTION === BOTH
          ? salesOrderTab
          : OPTION === ONE_PRODUCT
            ? ProductSalesOrderScreen
            : ServicesSalesOrderScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: (
          <CustomHeader
            title="Sales order"
            menu
            right
            rightText=" "
            firstRightIcon="ios-search"
            onMenuPress={() => navigation.navigate('DrawerToggle')}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }: any) => ({
      header: (
        <CustomHeader
          title="Products & Services"
          menu
          onMenuPress={() => navigation.navigate('DrawerToggle')}
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
