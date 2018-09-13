import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Header from '../Components/Header/BaseHeader'

export default class EditProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header title="Product" onPressLeftIcon={() => navigation.goBack()} />
      )
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
