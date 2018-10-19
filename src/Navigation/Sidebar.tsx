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
  onItemPress: any
  items: any
}

interface IState {
  businessName: string
  activeRoute: string
}

interface Category {
  title: string
  routeName: string
}

const sideBarItemStyles = StyleSheet.create({
  listHeader: {
    backgroundColor: 'transparent',
    marginTop: 16,
    marginBottom: 5
  },
  title: {
    marginLeft: 25,
    color: '#000',
    marginVertical: 2,
    fontSize: 18
  },
  categoryWrapper: {
    borderRadius: 5,
    marginHorizontal: 5,
    paddingVertical: 6
  },
  category: {
    marginLeft: 22,
    backgroundColor: 'transparent',
    color: color.textColor,
    marginVertical: 6,
    fontSize: 16,
    fontFamily: 'AvenirNext-Medium'
  },
  activeCategoryWrapper: {
    backgroundColor: color.button
  },
  activeCategory: {
    color: '#fff'
  }
})

const SidebarItem = (prop: {
  title: string
  categories: Category[]
  navigate: any
  activeRoute?: string | null
}) => {
  return (
    <View>
      <View style={sideBarItemStyles.listHeader}>
        <Text
          style={[
            sideBarItemStyles.title,
            { fontFamily: 'AvenirNext-DemiBold' }
          ]}
        >
          {prop.title}
        </Text>
      </View>
      {prop.categories.map((category: Category, key: number) => {
        return (
          <TouchableOpacity
            style={[
              sideBarItemStyles.categoryWrapper,
              prop.activeRoute == category.routeName &&
                sideBarItemStyles.activeCategoryWrapper
            ]}
            key={key}
            onPress={() => prop.navigate(category.routeName)}
          >
            <Text
              style={[
                sideBarItemStyles.category,
                prop.activeRoute == category.routeName &&
                  sideBarItemStyles.activeCategory
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
  handleNavigation = (location: string) => {
    this.setState({ activeRoute: location })
    this.props.navigation.navigate(location)
  }
  state = {
    businessName: '',
    activeRoute: ''
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
              <Icon name="md-close" type="Ionicons" style={styles.cross} />
              {/* <Text style={[styles.texts, { fontFamily: 'Source Sans Pro' }]}>
                {this.state.businessName}
              </Text> */}
            </TouchableOpacity>
            <SidebarItem
              title="COMPANY"
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
              categories={[
                {
                  title: 'Home',
                  routeName: 'Home'
                }
              ]}
            />

            <SidebarItem
              title="Store"
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
              categories={[
                {
                  title: 'Products & Services',
                  routeName: 'ViewBusiness'
                },
                {
                  title: 'Categories',
                  routeName: 'Categories'
                }
              ]}
            />

            <SidebarItem
              title="CONTACT"
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
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
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
              categories={[
                {
                  title: 'Purchase',
                  routeName: 'Purchase'
                },
                {
                  title: 'Sales',
                  routeName: 'Sales'
                }
              ]}
            />
            <SidebarItem
              title="TRANSACTIONS"
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
              categories={[
                {
                  title: 'Bank',
                  routeName: 'Bank'
                },
                // {
                //   title: 'Income',
                //   routeName: 'Income'
                // },
                {
                  title: 'Expenses',
                  routeName: 'Expenses'
                },
                {
                  title: 'Invoices',
                  routeName: 'Invoice'
                }
                // {
                //   title: 'Receipts',
                //   routeName: 'Receipts'
                // }
              ]}
            />
            <SidebarItem
              title="HELP & SETTINGS"
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
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
    marginLeft: 27,
    alignItems: 'center'
    // paddingVertical: 16
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
    fontSize: 26,
    color: '#000'
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
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 30
  },
  itemsContainer: {
    flex: 4
  }
})
