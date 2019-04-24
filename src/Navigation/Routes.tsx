import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import {
  DrawerNavigator,
  TabBarBottom,
  StackNavigator,
  TabNavigator
} from 'react-navigation'

import { RegularText } from '../Atom/TextAtom'
// import AppSpinner from '../Components/Spinner'

// graphql
import { Query } from 'react-apollo'
import { AuthenticateQueryGQL } from '../graphql/queries/Authenticate'

// Contact Screens
import UpsertContactScreen from '../Screen/Contact/UpsertContactScreen'
import ContactDetailScreen from '../Screen/Contact/ContactDetailScreen'
import CustomerScreen from '../Screen/Contact/CustomerScreen'
import ProspectScreen from '../Screen/Contact/ProspectScreen'
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
import UpsertCoverPhotoScreen from '../Screen/Settings/Webstore/UpsertCoverPhotoScreen'
import UpsertDocumentsScreen from '../Screen/Settings/Webstore/UpsertDocumentsScreen'
import DocumentsScreen from '../Screen/Settings/Webstore/DocumentsScreen'

//Delivery Fee Screens
import CreateDeliveryFeeScreen from '../Screen/Settings/DeliveryFee/CreateDeliveryFeeScreen'
import DeliveryFeeScreen from '../Screen/Settings/DeliveryFee/DeliveryFeeScreen'
import DeliveryDetailsScreen from '../Screen/Settings/DeliveryFee/DeliveryDetailsScreen'

// Business Screens
import BusinessProfileScreen from '../Screen/BusinessProfile/BusinessProfileScreen'
import EditBusinessProfileScreen from '../Screen/BusinessProfile/EditBusinessProfileScreen'

// User Profile Screens
import EditUserProfileScreen from '../Screen/User/EditUserProfileScreen'
import UserProfileScreen from '../Screen/User/UserProfileScreen'
import ProfileSettingsScreen from '../Screen/User/ProfileSettingsScreen'
import ChargeCalculatorScreen from '../Screen/Settings/ChargeCalculatorScreen'

// Order
import OrderStatusScreen from '../Screen/Order/OrderStatusScreen'
import SalesOrderScreen from '../Screen/Order/SalesOrderScreen'
import SalesOrderDetailsScreen from '../Screen/Order/SalesOrderDetailsScreen'
import SalesOrderDailySalesScreen from '../Screen/Order/SalesOrderDailySalesScreen'
import UpsertSalesOrderScreen from '../Screen/Order/UpsertSalesOrderScreen'

// Notification
import NotificationScreen from '../Screen/NotificationScreen'

// Expenses Screens
import ExpensesScreen from '../Screen/Expenses/ExpensesScreen'
import ExpensesDetailsScreen from '../Screen/Expenses/ExpensesDetailsScreen'
import UpsertExpenseScreen from '../Screen/Expenses/UpsertExpenseScreen'

// Special Offer Screens
import SpecialOfferScreen from '../Screen/SpecialOffer/SpecialOfferScreen'
import SpecialOfferDetailsScreen from '../Screen/SpecialOffer/SpecialOfferDetailsScreen'
import UpsertSpecialOfferScreen from '../Screen/SpecialOffer/UpsertSpecialOfferScreen'

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
import BankScreen from '../Screen/Bank/BankScreen'
import BankDetailsScreen from '../Screen/Bank/BankDetailsScreen'
import UpsertBankScreen from '../Screen/Bank/UpsertBankScreen'

import InvoiceDetailsScreen from '../Screen/Invoices/InvoiceDetailsScreen'
import UpsertInvoiceScreen from '../Screen/Invoices/UpsertInvoiceScreen'
import InvoicesScreen from '../Screen/Invoices/InvoicesScreen'
import UpdateInvoiceDueDate from '../Screen/Invoices/UpdateInvoiceDueDate'

import IncomeScreen from '../Screen/IncomeScreen'

import { color } from '../Style/Color'
import Sidebar from './Sidebar'

const contactTab = TabNavigator(
  {
    Customers: {
      screen: CustomerScreen
    },
    Prospects: {
      screen: ProspectScreen
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: true,
      style: {
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingBottom: 20,
        backgroundColor: '#fff'
      },
      activeTintColor: color.button,
      inactiveTintColor: color.textColor,
      labelStyle: {
        fontSize: 15,
        fontFamily: 'AvenirNext-DemiBold'
      }
    },
    tabBarComponent: TabBarBottom
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

    // Notification ROUTES
    Notifications: {
      screen: NotificationScreen
    },

    // Setting ROUTES
    ProfileSettings: {
      screen: ProfileSettingsScreen
    },
    ChargeCalculator: {
      screen: ChargeCalculatorScreen
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

    // Special Offer
    SpecialOffer: SpecialOfferScreen,
    SpecialOfferDetails: SpecialOfferDetailsScreen,
    UpsertSpecialOffer: UpsertSpecialOfferScreen,

    // Webstore settings
    WebstoreOptions: WebstoreOptionsScreen,
    UpsertCoverPhoto: UpsertCoverPhotoScreen,
    UpsertDocuments: UpsertDocumentsScreen,
    Documents: DocumentsScreen,

    // Delivery Fee
    CreateDeliveryFee: CreateDeliveryFeeScreen,
    DeliveryFees: DeliveryFeeScreen,
    DeliveryDetails: DeliveryDetailsScreen,

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
    Contacts: {
      screen: contactTab
    },
    UpsertContact: {
      screen: UpsertContactScreen
    },
    ContactDetails: {
      screen: ContactDetailScreen
    },
    CustomerPaymentActivity
  },
  {
    initialRouteName: 'Home',
    navigationOptions: () => ({
      header: null
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
          if (loading) {
            return <RegularText>{`Loading data here`}</RegularText>
          }
          if (error) {
            return <RegularText>{`Error! ${error.message}`}</RegularText>
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
