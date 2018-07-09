import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import FabAtom from '../Atom/FabAtom'
import EmptyList from '../Components/EmptyList'

export default class ProductSalesOrderScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SubHeaderAtom
          image={require('../../assets/Icons/subheader-icons/ordre-blue.png')}
          total={0}
          screen="sales order"
          rightLabel="View products"
        />
        <FabAtom name="shopping-cart" type="Entypo" />
        <EmptyList type={{ verifyMainList: 'main', Text: 'orders' }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
