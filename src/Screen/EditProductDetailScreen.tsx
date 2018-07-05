import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CustomHeader from '../Components/CustomHeader'

export default class EditProductDetailScreen extends Component {
  static navigationOptions = ({ navigate }: any) => {
    return {
      header: <CustomHeader title="Product" onBackPress={navigate.goBack()} />
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Edit product details screen</Text>
      </View>
    )
  }
}
