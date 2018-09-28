import React from 'react'
import { Text, View } from 'react-native'
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation'
import Header from '../Components/Header/BaseHeader'
// import AppSpinner from '../Components/Spinner'

// graphql
import { Query } from 'react-apollo'
import { AuthenticateQueryGQL } from '../graphql/queries/Authenticate'

// Customer Screens
import UpsertCustomerScreen from '../Screen/Contact/UpsertCustomerScreen'
import CustomerDetailScreen from '../Screen/Contact/CustomerDetailScreen'
import CustomerScreen from '../Screen/Contact/CustomerScreen'

// Vendor Screens
import UpsertVendorScreen from '../Screen/Contact/UpsertVendorScreen'
import VendorDetailScreen from '../Screen/Contact/VendorDetailScreen'
import VendorScreen from '../Screen/Contact/VendorScreen'

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

//Purchase Order screens
import PurchaseScreen from '../Screen/PurchaseScreen'
import PurchaseDetailsScreen from '../Screen/PurchaseDetailsScreen'

//Sales Order screens
import SalesOrderScreen from '../Screen/SalesOrderScreen'
import SalesOrderDetailsScreen from '../Screen/SalesOrderDetailsScreen'
import SalesOrderDailySalesScreen from '../Screen/SalesOrderDailySalesScreen'

// Expenses Screens
import ExpensesScreen from '../Screen/ExpensesScreen'
import ExpensesDetailsScreen from '../Screen/ExpensesDetailsScreen'
import UpsertExpenseScreen from '../Screen/UpsertExpenseScreen'

// Authentication Screens
import LoginScreen from '../Screen/LoginScreen'
import LandingScreen from '../Screen/Onboarding/Landing'
import ResetScreen from '../Screen/ResetScreen'
import UserOnboardScreen from '../Screen/Onboarding/UserOnboardScreen'
import BusinessOnboardScreen from '../Screen/Onboarding/BusinessOnboardScreen'

// Employee Screens
import EmployeesScreen from '../Screen/EmployeesScreen'
import EmployeeForm from '../Components/EmployeeForm'

// Dashboard Screens
import HomeScreen from '../Screen/HomeScreen'

// Other Component Screens
import BankScreen from '../Screen/BankScreen'
import InventoryScreen from '../Screen/InventoryScreen'
import InvoicesScreen from '../Screen/InvoicesScreen'

import ReceiptsScreen from '../Screen/ReceiptsScreen'
import IncomeScreen from '../Screen/IncomeScreen'

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
        fontFamily: 'Source Sans Pro'
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
    Bank: {
      screen: BankScreen
    },
    Income: {
      screen: IncomeScreen
    },
    Receipts: {
      screen: ReceiptsScreen
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
    ViewBusiness: {
      screen: viewBothStack
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
    EditUserProfile: {
      screen: EditUserProfileScreen
    },
    EditBusinessProfile: {
      screen: EditBusinessProfileScreen
    },
    EditServices: UpsertServiceScreen,
    ShowService: ServiceDetailsScreen,

    // Expenses
    Expenses: ExpensesScreen,
    UpsertExpense: UpsertExpenseScreen,
    ExpensesDetails: ExpensesDetailsScreen,

    // Purchase
    Purchase: PurchaseScreen,
    PurchaseDetails: PurchaseDetailsScreen,

    // Sales Order
    SalesDetails: SalesOrderDetailsScreen,
    Sales: SalesOrderScreen,
    SalesOrderDailySales: SalesOrderDailySalesScreen,

    // Contact
    Customers: {
      screen: CustomerScreen
    },
    UpsertCustomer: {
      screen: UpsertCustomerScreen
    },
    CustomerDetails: {
      screen: CustomerDetailScreen
    },
    Vendors: {
      screen: VendorScreen
    },
    UpsertVendor: {
      screen: UpsertVendorScreen
    },
    VendorDetails: {
      screen: VendorDetailScreen
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }: any) => ({
      header: (
        <Header
          title="Products & Services"
          // tslint:disable-next-line:jsx-no-lambda
          onPressLeftIcon={() => {
            navigation.navigate('DrawerToggle')
          }}
          // tslint:disable-next-line:jsx-no-lambda
          onPressRightIcon={() => console.log('Search icon pressed.')}
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
    OnBoarding: LandingScreen,
    Login: LoginScreen,
    Reset: ResetScreen,
    Signup: UserOnboardScreen
  },
  {
    headerMode: 'none'
  }
)

const BusinessOnBoardStack = StackNavigator(
  {
    BusinessOnboard: BusinessOnboardScreen
  },
  {
    headerMode: 'none'
  }
)

interface IProps {
  client: any
}

export default class Routes extends React.Component<IProps> {
  render() {
    const { client } = this.props
    return (
      <Query query={AuthenticateQueryGQL}>
        {({ loading, error, data }) => {
          console.log('data', data)
          console.log('loading', loading)
          if (loading) {
            return <Text>{`Loading data here`}</Text>
          }
          if (error) {
            return <Text>{`Error! ${error.message}`}</Text>
          }
          if (!data.authenticate) {
            return <AuthStack screenProps={{ client }} />
          } else {
            if (data.user && !data.user.company) {
              return <BusinessOnBoardStack screenProps={{ client }} />
            }
            return <DrawerStack screenProps={{ client }} />
          }
        }}
      </Query>
    )
  }
}
