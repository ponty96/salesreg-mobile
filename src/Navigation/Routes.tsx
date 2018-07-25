import React from 'react';
import { Text, View } from 'react-native';
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator
} from 'react-navigation';
// import { Icon } from 'native-base'

// graphql
import { Query } from 'react-apollo';
import { AuthenticateQueryGQL } from '../graphql/queries/Authenticate';

import CustomHeader from '../Components/CustomHeader'
import EmployeeForm from '../Components/EmployeeForm'
import MainOrderList from '../Components/MainOrderList';
import BankScreen from '../Screen/BankScreen'
import BusinessProfileScreen from '../Screen/BusinessProfileScreen';
import CustomerDetailScreen from '../Screen/CustomerDetailScreen';
import CustomerScreen from '../Screen/CustomerScreen'
import EditBusinessProfileScreen from '../Screen/EditBusinessProfileScreen'
import EditServiceScreen from '../Screen/EditServiceScreen'
import EditUserProfileScreen from '../Screen/EditUserProfileScreen'
import EmployeesScreen from '../Screen/EmployeesScreen'
import ExpensesScreen from '../Screen/ExpensesScreen'
import HomeScreen from '../Screen/HomeScreen'
import IncomeScreen from '../Screen/IncomeScreen'
import InventoryScreen from '../Screen/InventoryScreen'
import InvoicesScreen from '../Screen/InvoicesScreen'
import NewVendorScreen from '../Screen/NewVendorScreen'
import OrderListScreen from '../Screen/OrderListScreen';
import ProfileSettingsScreen from '../Screen/ProfileSettingsScreen'
import PurchaseScreen from '../Screen/PurchaseScreen'
import ReceiptsScreen from '../Screen/ReceiptsScreen'
import SalesScreen from '../Screen/SalesScreen'
import ServiceScreen from '../Screen/ServiceScreen'
import UserProfileScreen from '../Screen/UserProfileScreen';
import VendorDetailScreen from '../Screen/VendorDetailsScreen'
import VendorScreen from '../Screen/VendorScreen'
import BusinessDetailsScreen from './../Screen/BusinessDetailsScreen';
import DebtDetailsScreen from './../Screen/DebtDetailsScreen';
import DebtScreen from './../Screen/DebtScreen';
import LoginScreen from './../Screen/LoginScreen';
// import BusinessListScreen from './../Screen/BusinessListScreen';
import NewBusinessScreen from './../Screen/NewBusinessScreen';
import NewCustomerScreen from './../Screen/NewCustomerScreen';
import NewOrderScreen from './../Screen/NewOrderScreen';
import NewProductScreen from './../Screen/NewProductScreen';
import OnBoardingScreen from './../Screen/OnBoardingScreen';
// import OrderScreen from './../Screen/OrderScreen';
import OrderDetailsScreen from './../Screen/OrderDetailsScreen';
import ProductDetailsScreen from './../Screen/ProductDetailsScreen';
import ProductScreen from './../Screen/ProductScreen';
import ResetScreen from './../Screen/ResetScreen';
// import CustomerScreen from './../Screen/CustomerScreen';
// import DebtsScreen from './../Screen/DebtsScreen';
import ServicesScreen from './../Screen/ServicesScreen';
// import SplashScreen from './../Screen/SplashScreen';
import SignupScreen from './../Screen/SignupScreen';
// import styles from './../Style/Layout'
import { color } from './../Style/Color'
import Sidebar from './Sidebar';

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
        const { routeName } = navigation.state;
        let tabColor;
        if (routeName === 'Products') {
          tabColor = focused ? color.secondary : color.secondary;
        } else if (routeName === 'Services') {
          tabColor = focused ? color.secondary : color.secondary;
        }
        return (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: tabColor, fontWeight: 'bold', fontSize: 20 }}>
              {routeName}
            </Text>
          </View>
        );
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
);

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
    NewEmployee: {
      screen: EmployeeForm
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
    ProfileSettings: {
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
          showMenu={true}
          // tslint:disable-next-line:jsx-no-lambda
          onMenuPress={() => {
            navigation.navigate('DrawerToggle');
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
);

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
);

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
);

interface IProps {
  client: any;
}
export default class Routes extends React.Component<IProps> {
  public render() {
    const { client } = this.props;
    return (
      <Query query={AuthenticateQueryGQL}>
        {({ loading, error, data }) => {
          console.log('loading', loading);
          console.log('error', error);
          console.log('data', data);
          if (loading) { return <Text>'Loading...'</Text>; }
          if (error) { return <Text>{`Error! ${error.message}`}</Text>; }

          if (!data.authenticate) { return <AuthStack screenProps={{ client }} />; }
          return <DrawerStack screenProps={{ client }} />;
        }}
      </Query>
    );
  }
}
