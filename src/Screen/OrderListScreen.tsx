import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import OrderList from '../Components/OrderList'
import { orderList } from '../config/data'
import { color } from '../Style/Color'

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
  }
})