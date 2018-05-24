import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'
import ProductDetails from '../Components/ProductDetails'

interface IProps {
  navigation?: any
}

interface IState {}

class ProductDetailsScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    const { params } = navigation.state;
    console.log(params);
    return {
      title: 'Product Details',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewProduct')
          }}
        >
          <View style={styles.headerItem}>
            <Icon
              name={'pencil'}
              style={styles.headerIconLogout}
              type={'MaterialCommunityIcons'}
            />
            <Text style={styles.headerText}>Edit</Text>
          </View>
        </TouchableOpacity>
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

export default ProductDetailsScreen;
