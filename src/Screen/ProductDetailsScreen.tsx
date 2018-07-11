import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'

import ProductDetails from '../Components/ProductDetails'
import { color } from '../Style/Color'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation?: any
}

class ProductDetailsScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Product"
          onBackPress={() => navigation.goBack()}
          showRight
          rightText="Edit"
          firstRightIcon="pencil"
          onPressRightButton={() => navigation.navigate('NewProduct')}
          firstRightIconType="MaterialCommunityIcons"
        />
      )
    }
  }

  render() {
    // do change the list to the appropriate molecule
    return (
      <View style={styles.centerContainer}>
        <ProductDetails navigation={this.props.navigation} />
      </View>
    )
  }
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  headerText: {
    color: color.secondary,
    fontWeight: 'bold',
    paddingRight: 16,
    fontSize: 18
  },
  headerIconLogout: {
    color: color.secondary,
    padding: 8,
    fontSize: 28
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
