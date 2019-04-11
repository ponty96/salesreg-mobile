import React, { PureComponent } from 'react'
import {
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Icon } from 'native-base'

import { color } from '../Style/Color'
import Auth from '../services/auth'
import { UserContext } from '../context/UserContext'
import { MediumText } from '../Atom/TextAtom'

interface IProps {
  navigation: any
  onItemPress: any
  items: any
  gettingStartedProgress: any
}

interface IState {
  businessName: string
  activeRoute: string
}

interface Category {
  title: string
  iconName?: string
  iconType?: any
  routeName: string
}

const sideBarItemStyles = StyleSheet.create({
  categoryContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d8d8d8',
    paddingVertical: 6
  },
  hideBorder: {
    borderBottomWidth: 0,
    paddingVertical: 6
  },
  listHeader: {
    backgroundColor: 'transparent',
    marginTop: 16,
    marginBottom: 5
  },
  title: {
    marginLeft: 25,
    color: '#999',
    marginVertical: 2,
    fontSize: 11
  },
  categoryWrapper: {
    borderRadius: 5,
    marginHorizontal: 5,
    paddingLeft: 22,
    paddingVertical: 6
  },
  category: {
    marginLeft: 20,
    backgroundColor: 'transparent',
    color: color.textColor,
    marginTop: 6,
    fontSize: 14,
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
  hideBottomBorder?: boolean
  activeRoute?: string | null
}) => {
  return (
    <View
      style={
        prop.hideBottomBorder
          ? sideBarItemStyles.hideBorder
          : sideBarItemStyles.categoryContainer
      }
    >
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20 }}>
                <Icon
                  name={category.iconName}
                  type={category.iconType}
                  style={[
                    {
                      fontSize: category.iconType == 'EvilIcons' ? 27 : 20,
                      marginLeft: category.iconType == 'EvilIcons' ? -5 : 0,
                      color: color.textColor
                    },
                    prop.activeRoute == category.routeName &&
                      sideBarItemStyles.activeCategory
                  ]}
                />
              </View>
              <MediumText
                style={[
                  sideBarItemStyles.category,
                  prop.activeRoute == category.routeName &&
                    sideBarItemStyles.activeCategory
                ]}
              >
                {category.title}
              </MediumText>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

class SideBar extends PureComponent<IProps, IState> {
  handleNavigation = async (location: string) => {
    this.setState({ activeRoute: location })
    this.props.gettingStartedProgress == 'done'
      ? this.props.navigation.navigate(location)
      : this.showAlert()
  }

  state = {
    businessName: '',
    activeRoute: ''
  }

  showAlert = () => {
    Alert.alert(
      'Sorry!!!',
      `We know you can't wait to begin, but you have to complete the get started section to do so.`,
      [
        {
          text: 'Ok',
          onPress: () => null
        }
      ],
      { cancelable: false }
    )
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
                  iconName: 'home',
                  iconType: 'SimpleLineIcons',
                  routeName: 'Home'
                }
              ]}
            />

            <SidebarItem
              title="STORE"
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
              categories={[
                {
                  title: 'Products',
                  routeName: 'Products',
                  iconName: 'archive',
                  iconType: 'EvilIcons'
                },
                {
                  title: 'Categories',
                  routeName: 'Categories',
                  iconName: 'folder-alt',
                  iconType: 'SimpleLineIcons'
                },
                {
                  title: 'Price Calculator',
                  routeName: 'ChargeCalculator',
                  iconName: 'calculator',
                  iconType: 'SimpleLineIcons'
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
                  routeName: 'Customers',
                  iconName: 'user-o',
                  iconType: 'FontAwesome'
                },
                {
                  title: 'Sales',
                  routeName: 'Sales',
                  iconName: 'cart-outline',
                  iconType: 'MaterialCommunityIcons'
                },
                {
                  title: 'Shipping Zones',
                  routeName: 'DeliveryFees',
                  iconName: 'location-pin',
                  iconType: 'SimpleLineIcons'
                }
              ]}
            />

            <SidebarItem
              title="ORDER"
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
              categories={[
                {
                  title: 'Invoices',
                  routeName: 'Invoices',
                  iconName: 'receipt',
                  iconType: 'MaterialCommunityIcons'
                },
                {
                  title: 'Expenses',
                  routeName: 'Expenses',
                  iconName: 'credit-card',
                  iconType: 'SimpleLineIcons'
                },
                {
                  title: 'Banks',
                  routeName: 'Banks',
                  iconName: 'bank',
                  iconType: 'MaterialCommunityIcons'
                }
              ]}
            />
            {/* <SidebarItem
              title="OFFERS"
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
              categories={[
                {
                  title: 'Special Offers',
                  routeName: 'SpecialOffer',
                  iconName: 'local-offer',
                  iconType: 'MaterialIcons'
                }
              ]}
            /> */}
            <SidebarItem
              title="HELP & SETTINGS"
              hideBottomBorder
              navigate={this.handleNavigation}
              activeRoute={this.state.activeRoute}
              categories={[
                {
                  title: 'Settings',
                  routeName: 'ProfileSettings',
                  iconType: 'SimpleLineIcons',
                  iconName: 'settings'
                },
                {
                  title: 'Help & Feedback',
                  routeName: 'Help',
                  iconType: 'Ionicons',
                  iconName: 'ios-help-circle-outline'
                }
              ]}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const _SideBar = props => (
  <UserContext.Consumer>
    {({ gettingStartedProgress }) => (
      <SideBar {...props} gettingStartedProgress={gettingStartedProgress} />
    )}
  </UserContext.Consumer>
)

export default _SideBar

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
