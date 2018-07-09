import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import EmptyList from '../Components/EmptyList'
import { color } from '../Style/Color'
import CustomHeader from '../Components/CustomHeader'

export default class ProductSalesRecordScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: <CustomHeader title="Product sales record" />
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <EmptyList
          type={{
            Text:
              'You have no products sold yet. Press the back arrow and start adding orders.'
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
