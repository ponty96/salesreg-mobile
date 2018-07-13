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

interface IState {}

class VendorScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Vendor"
          showMenu
          onMenuPress={() => navigation.navigate('DrawerToggle')}
          showRight
          rightText=" "
          firstRightIcon="ios-search"
        />
      )
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
  }
})
