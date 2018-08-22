import React from 'react'
import { Text, View } from 'react-native'
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation'
import CustomHeader from '../Components/CustomHeader'

// graphql
import { Query } from 'react-apollo'
import { AuthenticateQueryGQL } from '../graphql/queries/Authenticate'

// Customer Screens
import CustomerDetailScreen from '../Screen/CustomerDetailScreen'
import CustomerScreen from '../Screen/CustomerScreen'
import UpsertCustomerScreen from '../Screen/UpsertCustomerScreen'
import EditCustomerDetailsScreen from '../Screen/EditCustomerDetailsScreen'

// Vendor Screens
import NewVendorScreen from '../Screen/NewVendorScreen'
import VendorDetailScreen from '../Screen/VendorDetailsScreen'
import VendorScreen from '../Screen/VendorScreen'

// Product Screens
import UpsertProductScreen from '../Screen/UpsertProductScreen'
import ProductDetailsScreen from '../Screen/ProductDetailsScreen'
import ProductScreen from '../Screen/ProductScreen'

// Service Screens
import UpsertServiceScreen from '../Screen/UpsertServiceScreen'
import ServiceDetailsScreen from '../Screen/ServiceDetailsScreen'
import ServicesScreen from '../Screen/ServicesScreen'

// Business Screens
import BusinessProfileScreen from '../Screen/BusinessProfileScreen'
import EditBusinessProfileScreen from '../Screen/EditBusinessProfileScreen'

// User Profile Screens
import EditUserProfileScreen from '../Screen/EditUserProfileScreen'
import UserProfileScreen from '../Screen/UserProfileScreen'
import ProfileSettingsScreen from '../Screen/ProfileSettingsScreen'

// SalesOrder Screens
import ServicesSalesOrderScreen from '../Screen/ServicesSalesOrderScreen'
import ProductSalesOrderScreen from '../Screen/ServicesSalesOrderScreen'
import ProductSalesRecordScreen from '../Screen/ProductSalesRecordScreen'
import SalesOrderStatusScreen from '../Screen/SalesOrderStatusScreen'
import SalesOrderDetailsScreen from '../Screen/SalesOrderDetailsScreen'
import NewSalesOrderScreen from '../Screen/NewSalesOrderScreen'
import ServiceSalesRecordScreen from '../Screen/ServiceSalesRecordScreen'

// Expenses Screens
import ExpensesScreen from '../Screen/ExpensesScreen'
import ExpensesDetailsScreen from '../Screen/ExpensesDetailsScreen'
import NewExpensesScreen from '../Screen/NewExpensesSceen'

// Authentication Screens
import LoginScreen from '../Screen/LoginScreen'
import SignupScreen from '../Screen/SignupScreen'
import OnBoardingScreen from '../Screen/OnBoardingScreen'

// Employee Screens
import EmployeesScreen from '../Screen/EmployeesScreen'
import EmployeeForm from '../Components/EmployeeForm'

// Dashboard Screens
import HomeScreen from '../Screen/HomeScreen'

// Other Component Screens
import BankScreen from '../Screen/BankScreen'
import InventoryScreen from '../Screen/InventoryScreen'
import InvoicesScreen from '../Screen/InvoicesScreen'
import PurchaseScreen from '../Screen/PurchaseScreen'
import ResetScreen from '../Screen/ResetScreen'
import ReceiptsScreen from '../Screen/ReceiptsScreen'
import IncomeScreen from '../Screen/IncomeScreen'

import MainOrderList from '../Components/MainOrderList'
import OrderListScreen from '../Screen/OrderListScreen'
import NewOrderScreen from '../Screen/NewOrderScreen'
import OrderDetailsScreen from '../Screen/OrderDetailsScreen'

let BOTH = 'both'
let ONE_PRODUCT = 'product'
let OPTION = 'both'
import { color } from '../Style/Color'
import Sidebar from './Sidebar'

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
      activeTintColor: color.check,
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
    Home: {
      screen: HomeScreen
    },
    Employees: {
      screen: EmployeesScreen
    },
    NewEmployee: {
      screen: EmployeeForm
    },
    Vendor: {
      screen: VendorScreen
    },
    Purchase: {
      screen: PurchaseScreen
    },
    ProductSalesRecord: {
      screen: ProductSalesRecordScreen
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
    ProfileSettings: {
      screen: ProfileSettingsScreen
    },
    Customers: {
      screen: CustomerScreen
    },
    UpsertCustomer: {
      screen: UpsertCustomerScreen
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
      screen: UpsertProductScreen
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
    EditServices: UpsertServiceScreen,
    ShowService: ServiceDetailsScreen,
    EditCustomerDetails: EditCustomerDetailsScreen,
    SalesOrderStatus: SalesOrderStatusScreen,
    SalesOrderDetails: SalesOrderDetailsScreen,
    NewSalesOrder: NewSalesOrderScreen,
    ServiceSalesRecord: ServiceSalesRecordScreen,
    ExpensesDetails: ExpensesDetailsScreen,
    NewExpenses: NewExpensesScreen,
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
            showMenu
            showRight
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
          showMenu={true}
          // tslint:disable-next-line:jsx-no-lambda
          onMenuPress={() => {
            navigation.navigate('DrawerToggle')
          }}
          firstRightIcon={'ios-search'}
          navigation={navigation}
          showRight={true}
          // tslint:disable-next-line:jsx-no-lambda
          onPressFirstRightIcon={() => console.log('Search icon pressed.')}
        />
      )
    })
  }
)

const DrawerStack = DrawerNavigator(
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

const AuthStack = StackNavigator(
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

interface IProps {
  client: any
}
export default class Routes extends React.Component<IProps> {
  public render() {
    const { client } = this.props
    return (
      <Query query={AuthenticateQueryGQL}>
        {({ loading, error, data }) => {
          console.log('loading', loading)
          console.log('error', error)
          console.log('data', data)
          if (loading) {
            return <Text>'Loading...'</Text>
          }
          if (error) {
            return <Text>{`Error! ${error.message}`}</Text>
          }

          if (!data.authenticate) {
            return <AuthStack screenProps={{ client }} />
          }
          return <DrawerStack screenProps={{ client }} />
        }}
      </Query>
    )
  }
}
