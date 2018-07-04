import React, { Component } from 'react'
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import CustomerListAtom from '../Atom/CustomerListAtom'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import { customerList } from '../config/data'
import EmptyList from './EmptyList'

interface IProps {
  items: any[]
  onPress: () => void
}

interface IState {}

class CustomerList extends Component<IProps, IState> {
  // onPress = () => {}

  renderItem = ({ item }: any) => {
    let latestAmount =
      item.status === 'paid'
        ? item.debt
        : item.status === 'balance'
          ? item.balance
          : item.debt
    let realStyle
    if (item.status === 'paid') {
      realStyle = 'paid'
    } else if (item.status === 'balance') {
      realStyle = 'balance'
    } else {
      realStyle = 'debt'
    }
    return (
      <CustomerListAtom
        items={item}
        latestAmount={latestAmount}
        realStyle={realStyle}
        onPress={this.props.onPress}
      />
    )
  }

  render() {
    return (
      <View style={styles.customerListContainer}>
        <SubHeaderAtom
          total="250"
          list={[
            'Highest Purchase',
            'Lowest Purchase',
            'Resent Purchase',
            'Frequent Purchase',
            'Earliest Payment',
            'Latest Payment',
            'Customer Rating'
          ]}
        />
        <ScrollView>
          <FlatList
            data={customerList}
            renderItem={this.renderItem}
            // keyExtractor={item => item.key}
            ListEmptyComponent={
              <EmptyList type={{ Text: 'customer', verifyMainList: 'main' }} />
            }
          />
        </ScrollView>
      </View>
    )
  }
}

export default CustomerList

const styles = StyleSheet.create({
  customerListContainer: {
    // backgroundColor: '#FFF',
    flex: 1,
    width: '100%'
  }
})
