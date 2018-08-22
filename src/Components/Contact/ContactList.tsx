import React, { Component } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import ContactItemAtom from '../../Atom/ContactItemAtom';
import SubHeaderAtom from '../../Atom/SubHeaderAtom';
import EmptyList from '../EmptyList';

interface IProps {
  items: any[];
  onPress: (customer?: any) => void;
  screenType: string;
}

interface IState {}

class ContactList extends Component<IProps, IState> {
  renderItem = ({ item }: any) => {
    let latestAmount = item.status === 'balance' ? item.balance : item.debt;
    return (
      <ContactItemAtom
        key={item.id}
        image={item.image}
        contactName={item.contactName}
        amount={item.amount}
        latestAmount={latestAmount}
        realStyle={item.status}
        onPress={() => this.props.onPress(item)}
      />
    );
  };

  render() {
    return (
      <View style={styles.customerListContainer}>
        <SubHeaderAtom
          total={this.props.items.length}
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
            data={this.props.items}
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
