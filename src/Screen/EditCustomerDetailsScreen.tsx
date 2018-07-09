import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CustomHeader from '../Components/CustomHeader'

export default class EditCustomerDetailsScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader title="Customer" onBackPress={() => navigation.goBack()} />
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
