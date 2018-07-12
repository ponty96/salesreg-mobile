import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { userData } from '../config/default'
import FabAtom from './../Atom/FabAtom'
import ProductList from '../Components/ProductList'
import { color } from '../Style/Color'
import { productList } from '../config/data'

interface IProps {
  navigation: any
}

class ProductScreen extends PureComponent<IProps> {
  render() {
    // const { params } = this.props.navigation.state
    // const items = params.data.products
    const items = this.props.navigation.getParam(
      productList,
      userData.business[0].products
    )

    return (
      <View style={styles.container}>
        <ProductList items={items} navigation={this.props.navigation} />
        <FabAtom
          routeName={'NewProduct'}
          name={'basket-fill'}
          type={'MaterialCommunityIcons'}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

export default ProductScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
