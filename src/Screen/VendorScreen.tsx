import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import FabAtom from './../Atom/FabAtom'
import CustomerList from '../Components/CustomerList'
import { color } from '../Style/Color'
import { customerList } from '../config/data'

interface IProps {
  navigation: any
}

interface IState {}

class VendorScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    const { params } = navigation.state
    let right = <Icon name={'ios-search'} style={styles.headerIcon} />
    let left = params &&
      params.items &&
      params.items.length > 0 && (
        <Icon
          name={'menu'}
          onPress={() => navigation.navigate('DrawerToggle')}
          style={styles.headerIcon}
        />
      )
    return {
      title: 'Vendor',
      headerRight: right,
      headerLeft: left
    }
  }
  onPress = () => {
    this.props.navigation.navigate('VendorDetails')
  }

  render() {
    // const { params } = this.props.navigation.state
    // const items = params.data.customers
    const items = this.props.navigation.getParam(customerList)

    return (
      <View style={styles.centerContainer}>
        <CustomerList
          items={items}
          onPress={this.onPress}
          screenType="vendor"
        />
        <FabAtom
          routeName={'NewVendor'}
          name={'md-person-add'}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

export default VendorScreen

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
