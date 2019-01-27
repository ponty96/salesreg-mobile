import React from 'react'
import { Text } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import Header from '../Components/Header/BaseHeader'
// import AppSpinner from '../Components/Spinner'

// graphql
import { Query } from 'react-apollo'
import { AuthenticateQueryGQL } from '../graphql/queries/Authenticate'

// Customer Screens
import UpsertCustomerScreen from '../Screen/Contact/UpsertCustomerScreen'
import CustomerDetailScreen from '../Screen/Contact/CustomerDetailScreen'
import CustomerScreen from '../Screen/Contact/CustomerScreen'
import CustomerPaymentActivity from '../Screen/Contact/CustomerPaymentActivity'

/***
 *
 * STORE SCREENS
 */
// Product Screens
import CreateProductScreen from '../Screen/Store/CreateProductScreen'
import ProductDetailsScreen from '../Screen/Store/ProductDetailsScreen'
import ProductScreen from '../Screen/Store/ProductScreen'
import UpdateProductScreen from '../Screen/Store/UpdateProductScreen'
import UpdateProductGroupOptionsScreen from '../Screen/Store/UpdateProductGroupOptionsScreen'
import AddProductVariantScreen from '../Screen/Store/AddProductVariantScreen'
import UpsertProductRestockScreen from '../Screen/Store/UpsertProductRestockScreen'

// Category Screens
import CategoriesScreen from '../Screen/Settings/Category/CategoriesScreen'
import UpsertCategoryScreen from '../Screen/Settings/Category/UpsertCategoryScreen'

// Options Screens
import OptionsScreen from '../Screen/Settings/Option/OptionsScreen'
import UpsertOptionScreen from '../Screen/Settings/Option/UpsertOptionScreen'

//Webstore Setting Option
import WebstoreOptionsScreen from '../Screen/Settings/Webstore/WebstoreOptionsScreen'
import UpsertCoverPhoto from '../Screen/Settings/Webstore/UpsertCoverPhoto'
import UpsertDocuments from '../Screen/Settings/Webstore/UpsertDocuments'

// Business Screens
import BusinessProfileScreen from '../Screen/BusinessProfileScreen'
import EditBusinessProfileScreen from '../Screen/EditBusinessProfileScreen'

// User Profile Screens
import EditUserProfileScreen from '../Screen/EditUserProfileScreen'
import UserProfileScreen from '../Screen/UserProfileScreen'
import ProfileSettingsScreen from '../Screen/ProfileSettingsScreen'

// Order
import OrderStatusScreen from '../Screen/OrderStatusScreen'

// Sales Order screens
import SalesOrderScreen from '../Screen/SalesOrderScreen'
import SalesOrderDetailsScreen from '../Screen/SalesOrderDetailsScreen'
import SalesOrderDailySalesScreen from '../Screen/SalesOrderDailySalesScreen'
import UpsertSalesOrderScreen from '../Screen/UpsertSalesOrderScreen'

// Expenses Screens
import ExpensesScreen from '../Screen/ExpensesScreen'
import ExpensesDetailsScreen from '../Screen/ExpensesDetailsScreen'
import UpsertExpenseScreen from '../Screen/UpsertExpenseScreen'

// Authentication Screens
import LoginScreen from '../Screen/LoginScreen'
import LandingScreen from '../Screen/Onboarding/Landing'
import UserOnboardScreen from '../Screen/Onboarding/UserOnboardScreen'
import BusinessOnboardScreen from '../Screen/Onboarding/BusinessOnboardScreen'

// Employee Screens
import EmployeesScreen from '../Screen/EmployeesScreen'
import EmployeeForm from '../Components/EmployeeForm'

// Dashboard Screens
import HomeScreen from '../Screen/HomeScreen'

// Other Component Screens
import BankScreen from '../Screen/BankScreen'
import BankDetailsScreen from '../Screen/BankDetailsScreen'
import UpsertBankScreen from '../Screen/UpsertBankScreen'

import InvoiceDetailsScreen from '../Screen/InvoiceDetailsScreen'
import UpsertInvoiceScreen from '../Screen/UpsertInvoiceScreen'
import InvoicesScreen from '../Screen/InvoicesScreen'
import UpdateInvoiceDueDate from '../Screen/UpdateInvoiceDueDate'

import IncomeScreen from '../Screen/IncomeScreen'

import { color } from '../Style/Color'
import Sidebar from './Sidebar'

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

    // Transactions
    Banks: {
      screen: BankScreen
    },
    BankDetails: BankDetailsScreen,
    UpsertBank: UpsertBankScreen,
    Income: {
      screen: IncomeScreen
    },
    InvoiceDetails: {
      screen: InvoiceDetailsScreen
    },
    UpdateInvoiceDueDate: {
      screen: UpdateInvoiceDueDate
    },
    Invoices: {
      screen: InvoicesScreen
    },
    UpsertInvoice: {
      screen: UpsertInvoiceScreen
    },

    // Setting ROUTES
    ProfileSettings: {
      screen: ProfileSettingsScreen
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

    // STORE ROUTES
    Products: {
      screen: ProductScreen
    },
    CreateProduct: {
      screen: CreateProductScreen
    },
    UpdateProduct: UpdateProductScreen,
    UpsertProductRestock: UpsertProductRestockScreen,
    UpdateProductGroupOptions: UpdateProductGroupOptionsScreen,
    AddProductVariant: AddProductVariantScreen,
    ProductDetails: {
      screen: ProductDetailsScreen
    },

    Categories: CategoriesScreen,
    UpsertCategory: UpsertCategoryScreen,

    // Options
    Options: OptionsScreen,
    UpsertOption: UpsertOptionScreen,

    // Webstore settings
    WebstoreOptions: WebstoreOptionsScreen,
    UpsertCoverPhoto: UpsertCoverPhoto,
    UpsertDocuments: UpsertDocuments,

    // Expenses
    Expenses: ExpensesScreen,
    UpsertExpense: UpsertExpenseScreen,
    ExpensesDetails: ExpensesDetailsScreen,

    // Order
    OrderStatusChange: OrderStatusScreen,

    // Sales Order
    SalesDetails: SalesOrderDetailsScreen,
    Sales: SalesOrderScreen,
    SalesOrderDailySales: SalesOrderDailySalesScreen,
    UpsertSales: UpsertSalesOrderScreen,

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
    CustomerPaymentActivity
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }: any) => ({
      header: (
        <Header
          title="Products"
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

interface IState {
  display: boolean
}

export default class Routes extends React.Component<IProps, IState> {
  state = {
    display: false
  }

  componentDidMount() {
    /**
     * We would be simulating a very small timeout
     * This is needed to prevent glitches in the screen when the user opens the app at first
     */
    setTimeout(
      () =>
        this.setState({ display: true }, () => {
          SplashScreen.hide()
        }),
      500
    )
  }

  render() {
    const { client } = this.props,
      { display } = this.state

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
          if (!data.authenticate && display) {
            console.log('Oya ', loading)
            return <AuthStack screenProps={{ client }} />
          } else {
            if (data.user && !data.user.company && display) {
              return <BusinessOnBoardStack screenProps={{ client }} />
            } else if (display) {
              return <DrawerStack screenProps={{ client }} />
            }
            return null
          }
        }}
      </Query>
    )
  }
}
