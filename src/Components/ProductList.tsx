import React, { PureComponent } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import ProductListAtom from '../Atom/ProductListAtom';
import SubHeaderAtom from '../Atom/SubHeaderAtom';
// import styles from '../Style/ProductAndCustomerList';
// import styles_screen from './../Style/Screen';

interface IProps {
  navigation: any
  items: any
}

interface IState {}

class ProductList extends PureComponent<IProps, IState> {
  onPress = () => {
    this.props.navigation.navigate('ProductDetails')
  }

  renderItem = ({ item }: any) => {
    return <ProductListAtom onPress={this.onPress} items={item} />
  }

  render() {
    return (
      <View>
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
            data={this.props.items}
            renderItem={this.renderItem}
            keyExtractor={(item: any) => item.key}
          />
        </ScrollView>
      </View>
    )
  }
}

export default ProductList
