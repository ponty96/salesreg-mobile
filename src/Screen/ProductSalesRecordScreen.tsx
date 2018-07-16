import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import EmptyList from '../Components/EmptyList';
import { color } from '../Style/Color';
import CustomHeader from '../Components/CustomHeader';
import ProductSalesRecordHeader from '../Components/ProductSalesRecordHeader';
import ProductListAtom from '../Atom/ProductListAtom';

export default class ProductSalesRecordScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Product sales record"
          onBackPress={() => navigation.goBack()}
        />
      )
    };
  };

  render(): JSX.Element {
    const DATA: {
      image: string;
      name: string;
      customerName: string;
      number: string;
      price: string;
    }[] = [
      {
        image: '',
        name: 'Iman powder',
        customerName: 'Salomy',
        number: '1',
        price: '4000.00'
      },
      {
        image: '',
        name: 'Close up',
        customerName: 'David',
        number: '1',
        price: '150.00'
      },
      {
        image: '',
        name: 'Hoey soap',
        customerName: 'Kayla',
        number: '1',
        price: '600.00'
      },
      {
        image: '',
        name: 'Tresee liquid bath',
        customerName: 'Salomy',
        number: '1',
        price: '4000.00'
      },
      {
        image: '',
        name: 'Big comb',
        customerName: 'Salomy',
        number: '1',
        price: '50.00'
      }
    ];

    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              date: '21 March 2018',
              data: DATA,
              totalSales: '100,000.00',
              profit: '36,630.00'
            }
          ]}
          renderItem={({ item }) => (
            <ProductListAtom
              items={item}
              textStyle={{ color: color.principal }}
            />
          )}
          renderSectionHeader={({ section }) => (
            <ProductSalesRecordHeader title={section.date} />
          )}
          renderSectionFooter={({ section }) => (
            <Text>{section.totalSales}</Text>
          )}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={
            <EmptyList
              type={{
                Text:
                  'You have no products sold yet. Press the back arrow and start adding orders.'
              }}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
});
