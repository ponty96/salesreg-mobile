import React, { PureComponent } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import ProductListAtom from '../Atom/ProductListAtom';
import SubHeaderAtom from '../Atom/SubHeaderAtom';
import EmptyList from './EmptyList';

interface IProps {
  navigation: any;
  items: any;
}

interface IState {}

class ProductList extends PureComponent<IProps, IState> {
  onPress = product => {
    this.props.navigation.navigate('ProductDetails', { product });
  };

  renderItem = ({ item }: any) => {
    const { image, name, number, minimumStockQuantity, id } = item;
    return (
      <ProductListAtom
        key={id}
        onPress={() => this.onPress(item)}
        image={image}
        name={name}
        number={number}
        status={
          parseInt(minimumStockQuantity) >= parseInt(number) ? 'debt' : ''
        }
      />
    );
  };

  render() {
    const { items } = this.props;
    return (
      <View>
        <SubHeaderAtom
          list={[
            'Fastest selling',
            'Slowest selling',
            'Highest profit',
            'Lowest profit'
          ]}
          total={items ? items.length : 0}
        />

        <ScrollView style={styles.listMargin}>
          <FlatList
            data={items}
            renderItem={this.renderItem}
            ListEmptyComponent={
              <EmptyList type={{ Text: 'products', verifyMainList: 'main' }} />
            }
          />
        </ScrollView>
      </View>
    );
  }
}

export default ProductList;

const styles = StyleSheet.create({
  listMargin: {
    marginBottom: 52
  }
});
