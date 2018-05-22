import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';

import CustomerListAtom from '../Atom/CustomerListAtom';
import SubHeaderAtom from '../Atom/SubHeaderAtom';
import styles from '../Style/exportStyles';
import { customerList } from '../config/data';

interface IProps {
    items: any[];
}

interface IState {

}

class CustomerList extends Component<IProps, IState> {
  // onPress = () => {}

  renderItem = ({item}: any) => {
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
            keyExtractor={item => item.key}
          />
        </ScrollView>
      </View>
    )
  }
}

export default CustomerList
