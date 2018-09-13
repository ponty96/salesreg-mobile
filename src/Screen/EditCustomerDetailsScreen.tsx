import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Header from '../Components/Header/BaseHeader'

export default class EditCustomerDetailsScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header title="Customer" onPressLeftIcon={() => navigation.goBack()} />
      )
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Edit customer details screen</Text>
      </View>
    )
  }
}
