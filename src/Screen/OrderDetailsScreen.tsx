import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'
import OrderDetails from '../Components/OrderDetails'

interface IProps {
  navigation: any
}

interface IState {}

class OrderDetailsScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Order Details',
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
            navigation.navigate('NewOrder')
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
        <OrderDetails navigation={this.props.navigation} />
      </View>
    )
  }
}

export default OrderDetailsScreen
