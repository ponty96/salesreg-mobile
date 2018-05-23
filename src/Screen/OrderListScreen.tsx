import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Icon } from 'native-base'
import OrderList from '../Components/OrderList'
import { orderList } from '../config/data'

import styles from './../Style/Screen'

interface IProps {
  navigation: any
}

interface IState {}

class OrderListScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Order',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.centerContainer}>
        <OrderList items={orderList} navigation={this.props.navigation} />
      </View>
    )
  }
}

export default OrderListScreen
