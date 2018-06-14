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

// import ListItemAtom from './../Atom/ListItemAtom'
// import { userData } from './../config/default'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

export default class SideBar extends PureComponent<IProps> {
  handleNavigation = (location: string, data: any = undefined) => {
    this.props.navigation.navigate(location, { data })
  }

  render() {
    return (
      <SafeAreaView
        style={styles.sidebarContainer}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={styles.itemsContainer}>
          <ScrollView>
            <TouchableOpacity style={styles.header}>
              <Icon name="cross" type="Entypo" style={styles.cross} />
              <Text style={styles.texts}>BAYONE ATTRACTIONS</Text>
            </TouchableOpacity>

            <View>
              <View style={styles.listHeader}>
                <Text style={styles.title}>COMPANY</Text>
              </View>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Home')
                }}
              >
                <Text style={styles.category}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('ViewBusiness')
                }}
              >
                <Text style={styles.category}>Products & Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Employees')
                }}
              >
                <Text style={styles.category}>Employees</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.listHeader}>
                <Text style={styles.title}>CONTACT</Text>
              </View>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('CustomerDetails')
                }}
              >
                <Text style={styles.category}>Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Vendor')
                }}
              >
                <Text style={styles.category}>Vendor</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.listHeader}>
                <Text style={styles.title}>ORDER</Text>
              </View>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Purchase')
                }}
              >
                <Text style={styles.category}>Purchase</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Sales')
                }}
              >
                <Text style={styles.category}>Sales</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.listHeader}>
                <Text style={styles.title}>TRANSACTIONS</Text>
              </View>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Bank')
                }}
              >
                <Text style={styles.category}>Bank</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Income')
                }}
              >
                <Text style={styles.category}>Income</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Expenses')
                }}
              >
                <Text style={styles.category}>Expenses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Invoice')
                }}
              >
                <Text style={styles.category}>Invoices</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Receipts')
                }}
              >
                <Text style={styles.category}>Receipts</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.listHeader}>
                <Text style={styles.title}>ACCOUNTING</Text>
              </View>
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => {
                  this.props.navigation.navigate('Inventory')
                }}
              >
                <Text style={styles.category}>Inventory</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginLeft: '3%'
  },
  listHeader: {
    backgroundColor: color.inactive
  },
  texts: {
    color: color.modal,
    alignSelf: 'center'
  },
  title: {
    marginLeft: '10%',
    color: color.subHeader,
    marginVertical: '2%'
  },
  categoryWrapper: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  category: {
    marginLeft: '10%',
    backgroundColor: 'transparent',
    color: color.modal,
    marginVertical: '5%'
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
  sidebarItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 16
  },
  sidebarContainer: {
    height: Dimensions.get('window').height - 16,
    backgroundColor: color.primary
  },
  itemsContainer: {
    flex: 4
  }
})
