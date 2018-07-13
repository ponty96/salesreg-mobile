import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import FabAtom from '../Atom/FabAtom'
import CustomerList from '../Components/CustomerList'
import { color } from '../Style/Color'
import { customerList } from '../config/data'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

class CustomerScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Customer"
          showMenu
          showRight
          firstRightIcon="ios-search"
          rightText=" "
          onMenuPress={() => navigation.navigate('DrawerToggle')}
        />
      )
    }
  }

  onPress = () => {
    this.props.navigation.navigate('CustomerDetails')
  }

  render() {
    const items = this.props.navigation.getParam(customerList)

    return (
      <View style={styles.centerContainer}>
        <CustomerList
          items={items}
          onPress={this.onPress}
          screenType="customer"
        />
        <FabAtom
          routeName={'NewCustomer'}
          name={'md-person-add'}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

export default CustomerScreen

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
