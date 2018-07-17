import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import FabAtom from '../Atom/FabAtom'
import EmptyList from '../Components/EmptyList'
import SalesOrderList from '../Atom/SalesOrderListAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {
  total: string
}

export default class ProductSalesOrderScreen extends Component<IProps, IState> {
  state = {
    total: '840040'
  }

  handleListPress = () => {
    this.props.navigation.navigate('SalesOrderDetails')
  }

  renderList = ({ item }: any): JSX.Element => {
    return (
      <SalesOrderList
        serialNumber={item.key}
        name={item.name}
        time={item.time}
        num={item.num}
        status={item.status}
        onPress={this.handleListPress}
        redText={item.redText}
      />
    )
  }

  handleArrowPresss = (): void => {
    this.props.navigation.navigate('ViewBusiness')
  }

  render(): JSX.Element {
    const DATA: {
      key: string
      time: string
      name: string
      num: number
      status: string
      redText: boolean
    }[] = [
      {
        key: '0122320',
        time: '3:30pm',
        name: 'Salomy Kayadeja',
        num: 20,
        status: 'Pending',
        redText: false
      },
      {
        key: '0122321',
        time: '3:00pm',
        name: 'Salomy Kayadeja',
        num: 1,
        status: 'Pending',
        redText: false
      },
      {
        key: '0122322',
        time: '2:30pm',
        name: 'Salomy Kayadeja',
        num: 2,
        status: 'Delivered | Recalled',
        redText: true
      },
      {
        key: '0122323',
        time: 'Yesterday',
        name: 'Salomy Kayadeja',
        num: 80,
        status: 'Pending delivery',
        redText: false
      },
      {
        key: '0122324',
        time: '2 days ago',
        name: 'Salomy Kayadeja',
        num: 20,
        status: 'Delivering',
        redText: true
      },
      {
        key: '0122325',
        time: '3 days ago',
        name: 'Salomy Kayadeja',
        num: 25,
        status: 'Delivered',
        redText: false
      }
    ]

    return (
      <View style={styles.container}>
        <SubHeaderAtom
          image={require('../../assets/Icons/subheader-icons/ordre-blue.png')}
          total={this.state.total}
          screen="sales order"
          rightLabel="View products"
          onPressArrow={this.handleArrowPresss}
        />
        <FabAtom name="shopping-cart" type="Entypo" />
        <FlatList
          data={DATA}
          renderItem={this.renderList}
          ListEmptyComponent={
            <EmptyList type={{ Text: 'orders', verifyMainList: 'main' }} />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
