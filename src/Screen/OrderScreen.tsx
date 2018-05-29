import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import FabAtom from './../Atom/FabAtom'
import MainOrderList from '../Components/MainOrderList'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class OrderScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    const { params } = navigation.state
    let right = <Icon name={'ios-search'} style={styles.headerIcon} />
    let left = params &&
      params.items &&
      params.items.length > 0 && (
        <Icon
          name={'menu'}
          onPress={() => navigation.navigate('DrawerToggle')}
          style={styles.headerIcon}
        />
      )
    return {
      title: 'Kay5iveAttractions',
      headerRight: right,
      headerLeft: left
    }
  }
  goThere = () => {
    this.props.navigation.navigate('OrderList')
  }
  details = () => {
    this.props.navigation.navigate('OrderDetails')
  }

  render() {
    // const { params } = this.props.navigation.state
    // const items = params.data.orders

    return (
      <View style={styles.centerContainer}>
        <MainOrderList
          navigation={this.props.navigation}
          onPress={this.goThere}
          onClick={this.details}
        />
        <FabAtom
          routeName={'NewOrder'}
          name={'add-shopping-cart'}
          type={'MaterialIcons'}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

export default OrderScreen

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
