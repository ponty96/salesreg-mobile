import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { userData } from '../config/default'
import FabAtom from './../Atom/FabAtom'
import ProductList from '../Components/ProductList'
import { color } from '../Style/Color'
import { productList } from '../config/data'

interface IProps {
  navigation: any
}

interface IState {}

class ProductScreen extends PureComponent<IProps, IState> {
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
      title: 'Products',
      headerRight: right,
      headerLeft: left
    }
  }

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
