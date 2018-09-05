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
import Icon from '../Atom/Icon'
import { color } from '../Style/Color'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  businessName: string
}

interface Category {
  title: string
  routeName: string
}

const SidebarItem = (prop: {
  title: string
  categories: Category[]
  navigate: any
}) => {
  return (
    <View>
      <View style={sideBarItemStyles.listHeader}>
        <Text
          style={[sideBarItemStyles.title, { fontFamily: 'Source Sans Pro' }]}
        >
          {prop.title}
        </Text>
      </View>
      {prop.categories.map((category: Category, key: number) => {
        return (
          <TouchableOpacity
            style={sideBarItemStyles.categoryWrapper}
            key={key}
            onPress={() => prop.navigate(category.routeName)}
          >
            <Text
              style={[
                sideBarItemStyles.category,
                { fontFamily: 'Source Sans Pro' }
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
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
              <Text style={[styles.texts, { fontFamily: 'Source Sans Pro' }]}>
                {this.state.businessName}
              </Text>
            </TouchableOpacity>
            <SidebarItem
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

            <SidebarItem
              title="CONTACT"
              navigate={navigate}
              categories={[
                {
                  title: 'Customers',
                  routeName: 'Customers'
                },
                {
                  title: 'Vendors',
                  routeName: 'Vendors'
                }
              ]}
            />

            <SidebarItem
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
            <SidebarItem
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
            <SidebarItem
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

const sideBarItemStyles = StyleSheet.create({
  listHeader: {
    backgroundColor: color.dropdown,
    opacity: 0.2
  },
  title: {
    marginLeft: 32,
    color: color.secondary,
    marginVertical: 2,
    fontSize: 14
  },
  categoryWrapper: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    borderBottomWidth: 0.3,
    borderBottomColor: color.listBorderColor
  },
  category: {
    marginLeft: 32,
    backgroundColor: 'transparent',
    color: color.secondary,
    marginVertical: 8,
    fontSize: 14
  }
})
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
