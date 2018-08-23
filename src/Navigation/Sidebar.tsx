import React, { PureComponent } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Icon } from 'native-base'
import { color } from '../Style/Color'
import SideBarItemAtom from '../Atom/SideBarItemAtom'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  businessName: string
}

export default class SideBar extends PureComponent<IProps, IState> {
  handleNavigation = (location: string, data: any = undefined) => {
    this.props.navigation.navigate(location, { data })
  }
  state = {
    businessName: ''
  }

  componentWillMount() {
    this.updateBusinessName()
  }

  updateBusinessName = async () => {
    const user = await Auth.getCurrentUser()
    this.setState({
      businessName: JSON.parse(user).company.title
    })
  }
  render() {
    const {
      navigation: { navigate }
    } = this.props
    return (
      <SafeAreaView
        style={styles.sidebarContainer}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={styles.itemsContainer}>
          <ScrollView>
            <TouchableOpacity
              style={styles.header}
              onPress={() => navigate('DrawerToggle')}
            >
              <Icon name="cross" type="Entypo" style={styles.cross} />
              <Text style={[styles.texts, { fontFamily: 'SourceSansPro' }]}>
                {this.state.businessName}
              </Text>
            </TouchableOpacity>
            <SideBarItemAtom
              title="COMPANY"
              navigate={navigate}
              categories={[
                {
                  title: 'Home',
                  routeName: 'Home'
                },
                {
                  title: 'Products & Services',
                  routeName: 'ViewBusiness'
                },
                {
                  title: 'Employees',
                  routeName: 'Employees'
                }
              ]}
            />

            <SideBarItemAtom
              title="CONTACT"
              navigate={navigate}
              categories={[
                {
                  title: 'Customers',
                  routeName: 'Customer'
                },
                {
                  title: 'Vendors',
                  routeName: 'Vendor'
                }
              ]}
            />

            <SideBarItemAtom
              title="ORDER"
              navigate={navigate}
              categories={[
                {
                  title: 'Purchase',
                  routeName: 'Purchase'
                },
                {
                  title: 'Sales',
                  routeName: 'salesOrderTab'
                }
              ]}
            />
            <SideBarItemAtom
              title="TRANSACTIONS"
              navigate={navigate}
              categories={[
                {
                  title: 'Bank',
                  routeName: 'Bank'
                },
                {
                  title: 'Income',
                  routeName: 'Income'
                },
                {
                  title: 'Expenses',
                  routeName: 'Expenses'
                },
                {
                  title: 'Invoices',
                  routeName: 'Invoice'
                },
                {
                  title: 'Receipts',
                  routeName: 'Receipts'
                }
              ]}
            />
            <SideBarItemAtom
              title="HELP & SETTINGS"
              navigate={navigate}
              categories={[
                {
                  title: 'Settings',
                  routeName: 'ProfileSettings'
                },
                {
                  title: 'Help & Feedback',
                  routeName: 'Help'
                }
              ]}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginLeft: '3%',
    alignItems: 'center',
    paddingVertical: 16
  },
  texts: {
    color: color.modal,
    marginLeft: '3%',
    alignSelf: 'center'
  },
  itemText: {
    flex: 1,
    alignContent: 'center',
    paddingLeft: 12,
    color: color.menu
  },
  itemIcon: {
    color: color.menu
  },
  cross: {
    fontSize: 35,
    // backgroundColor: 'transparent',
    color: color.modal
  },
  logoutItem: {
    borderTopWidth: 1,
    borderColor: color.textBorderBottom,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  sidebarContainer: {
    height: Dimensions.get('window').height - 16,
    backgroundColor: color.primary
  },
  itemsContainer: {
    flex: 4
  }
})
