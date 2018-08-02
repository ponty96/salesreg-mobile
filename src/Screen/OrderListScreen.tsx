import { Icon } from 'native-base'
import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import OrderList from '../Components/OrderList'
import { orderList } from '../config/data'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

// interface IState {}

class OrderListScreen extends PureComponent<IProps, any> {
  public static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Order',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          // tslint:disable-next-line:jsx-no-lambda
          onPress={() => {
            navigation.goBack()
          }}
        />
      )
    }
  }

  public render() {
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
