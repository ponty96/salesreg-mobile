import React, { PureComponent } from 'react'
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import ProductListAtom from '../Atom/ProductListAtom'
import SubHeaderAtom from '../Atom/SubHeaderAtom'

interface IProps {
  navigation: any
  items: any
}

class ProductList extends PureComponent<IProps> {
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
            'Fastest selling',
            'Slowest selling',
            'Highest profit',
            'Lowest profit'
          ]}
          image={require('../../assets/Icons/subheader-icons/product-blue.png')}
          rightLabel="Sort by"
          screen="products and services"
        />

        <ScrollView style={styles.listMargin}>
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

const styles = StyleSheet.create({
  listMargin: {
    marginBottom: 55
  }
})
