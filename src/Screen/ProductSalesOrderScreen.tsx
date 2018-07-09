import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import FabAtom from '../Atom/FabAtom'
import EmptyList from '../Components/EmptyList'
import SalesOrderList from '../Atom/SalesOrderList'

interface IState {
  total: string
  empty: boolean
}

export default class ProductSalesOrderScreen extends Component<IState> {
  state = {
    total: '0',
    empty: true
  }

  renderList = ({ item }: any) => {
    return (
      <SalesOrderList
        serialNumber={item.key}
        name={item.name}
        time={item.time}
        num={item.num}
        status={item.status}
      />
    )
  }

  handleArrowPresss = () => {
    this.setState({ empty: false })
  }

  render(): JSX.Element {
    const DATA: [
      { key: string; time: string; name: string; num: number; status: string }
    ] = [
      {
        key: '0122323',
        time: '3:30pm',
        name: 'Salomy Kayadeja',
        num: 20,
        status: 'Pending'
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
