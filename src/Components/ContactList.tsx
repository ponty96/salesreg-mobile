import React, { Component } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import ContactListAtom from '../Atom/ContactListAtom';
import SubHeaderAtom from '../Atom/SubHeaderAtom';
import { customerList } from '../config/data';
import EmptyList from './EmptyList';

interface IProps {
  items: any[];
  onPress: () => void;
  screenType: string;
}

interface IState {}

class ContactList extends Component<IProps, IState> {
  renderItem = ({ item }: any) => {
    let latestAmount =
      item.status === 'paid'
        ? item.debt
        : item.status === 'balance'
          ? item.balance
          : item.debt;
    let realStyle;
    if (item.status === 'paid') {
      realStyle = 'paid';
    } else if (item.status === 'balance') {
      realStyle = 'balance';
    } else {
      realStyle = 'debt';
    }
    return (
      <ContactListAtom
        image={item.image}
        customerName={item.customerName}
        amount={item.amount}
        latestAmount={latestAmount}
        realStyle={realStyle}
        onPress={this.props.onPress}
      />
    );
  };

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
            ListEmptyComponent={
              <EmptyList
                type={{ Text: this.props.screenType, verifyMainList: 'main' }}
              />
            }
          />
        </ScrollView>
      </View>
    );
  }
}

export default ContactList;

const styles = StyleSheet.create({
  customerListContainer: {
    // backgroundColor: '#FFF',
    flex: 1,
    width: '100%'
  }
});
