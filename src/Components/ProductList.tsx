import React, { PureComponent } from 'react'
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import ProductListAtom from '../Atom/ProductListAtom'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import EmptyList from './EmptyList'

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
            'Fastest selling',
            'Slowest selling',
            'Highest profit',
            'Lowest profit'
          ]}
        />

        <ScrollView style={styles.listMargin}>
          <FlatList
            data={this.props.items}
            renderItem={this.renderItem}
            ListEmptyComponent={
              <EmptyList type={{ Text: 'products', verifyMainList: 'main' }} />
            }
          />
        </ScrollView>
      </View>
    )
  }
}

export default ProductList

const styles = StyleSheet.create({
  listMargin: {
    marginBottom: 52
  }
})
