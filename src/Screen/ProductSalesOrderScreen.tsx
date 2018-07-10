import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import FabAtom from '../Atom/FabAtom'
import EmptyList from '../Components/EmptyList'
import SalesOrderList from '../Atom/SalesOrderListAtom'

interface IProps {
  navigation: any
}

interface IState {
  total: string
  empty: boolean
}

export default class ProductSalesOrderScreen extends Component<IProps, IState> {
  state = {
    total: '0',
    empty: true
  }

  handleListPress = () => {
    this.props.navigation.navigate('SalesOrderStatus')
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
      />
    )
  }

  handleArrowPresss = (): void => {
    this.setState({ empty: false })
    this.setState({ total: '840040' })
  }

  render(): JSX.Element {
    const DATA: {
      key: string
      time: string
      name: string
      num: number
      status: string
    }[] = [
      {
        key: '0122320',
        time: '3:30pm',
        name: 'Salomy Kayadeja',
        num: 20,
        status: 'Pending'
      },
      {
        key: '0122321',
        time: '3:00pm',
        name: 'Salomy Kayadeja',
        num: 1,
        status: 'Pending'
      },
      {
        key: '0122322',
        time: '2:30pm',
        name: 'Salomy Kayadeja',
        num: 2,
        status: 'Delivered | Recalled'
      },
      {
        key: '0122323',
        time: 'Yesterday',
        name: 'Salomy Kayadeja',
        num: 80,
        status: 'Pending delivery'
      },
      {
        key: '0122324',
        time: '2 days ago',
        name: 'Salomy Kayadeja',
        num: 20,
        status: 'Delivering'
      },
      {
        key: '0122325',
        time: '3 days ago',
        name: 'Salomy Kayadeja',
        num: 25,
        status: 'Delivered'
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
        {this.state.empty ? (
          <EmptyList type={{ verifyMainList: 'main', Text: 'orders' }} />
        ) : (
          <FlatList data={DATA} renderItem={this.renderList} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
