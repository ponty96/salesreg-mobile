import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Icon } from 'native-base'

import FabAtom from './../Atom/FabAtom'
import styles from './../Style/Screen'
import ProductList from '../Components/ProductList'

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
      title: 'Kay5iveAttractions',
      headerRight: right,
      headerLeft: left
    }
  }

  render() {
    const { params } = this.props.navigation.state
    const items = params.data.products

    return (
      <View style={styles.container}>
        <ProductList items={items} navigation={this.props.navigation}/>
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
