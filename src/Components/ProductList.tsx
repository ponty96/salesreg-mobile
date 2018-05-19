import React, { PureComponent } from 'react';
import { View, FlatList, ScrollView } from 'react-native';

import ProductListAtom from '../Atom/ProductListAtom';
import SubHeaderAtom from '../Atom/SubHeaderAtom';
import styles from '../Style/ProductAndCustomerList';
import { productList } from '../config/data';

interface IProps {
    navigation: any
}

interface IState {

}

class ProductList extends PureComponent<IProps, IState> {
  onPress = () => {
    alert('Product View Unavailable')
  }

  renderItem = ({ item }: any) => {
    return <ProductListAtom onPress={this.onPress} items={item} />
  }

  render() {
    return (
      <View style={styles.container}>
        <SubHeaderAtom
          list={[
            'Fasting selling',
            'Slowest selling',
            'Highest profit',
            'Lowest profit'
          ]}
        />
        <ScrollView>
          <FlatList
            data={productList}
            renderItem={this.renderItem}
            keyExtractor={item => item.key}
          />
        </ScrollView>
      </View>
    )
  }
}

export default ProductList
