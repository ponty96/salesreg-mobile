import React, { Component } from 'react'
import { View, StyleSheet, SectionList } from 'react-native'
import EmptyList from '../Components/EmptyList'
import { color } from '../Style/Color'
import Header from '../Components/Header/BaseHeader'
import ProductSalesRecordHeader from '../Components/ProductSalesRecordHeader'
import ProductListAtom from '../Atom/ProductListAtom'
import ListItemAtom from '../Atom/ListItemAtom'

export default class ProductSalesRecordScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Product sales record"
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }

  renderFooter = ({ section }: any): JSX.Element => {
    return (
      <View>
        <ListItemAtom
          label="TOTAL SALES"
          value={'\u20A6 ' + section.totalSales}
          listItemStyle={styles.listItem}
          rightTextStyle={{ fontSize: 16 }}
        />
        <ListItemAtom
          label="PROFIT"
          value={'\u20A6 ' + section.profit}
          listItemStyle={styles.listItem}
          rightTextStyle={{ fontSize: 16 }}
        />
      </View>
    )
  }

  render(): JSX.Element {
    const DATA: {
      image: string
      name: string
      customer: string
      number: string
      price: string
    }[] = [
      {
        image: '',
        name: 'Iman powder',
        customer: 'Salomy',
        number: '1',
        price: '4000.00'
      },
      {
        image: '',
        name: 'Close up',
        customer: 'David',
        number: '1',
        price: '150.00'
      },
      {
        image: '',
        name: 'Hoey soap',
        customer: 'Kayla',
        number: '1',
        price: '600.00'
      },
      {
        image: '',
        name: 'Tresee liquid bath',
        customer: 'Salomy',
        number: '1',
        price: '4000.00'
      },
      {
        image: '',
        name: 'Big comb',
        customer: 'Salomy',
        number: '1',
        price: '50.00'
      }
    ]

    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              date: '21 March 2018',
              data: DATA,
              totalSales: '100,000.00',
              profit: '36,630.00'
            },
            {
              date: '22 March 2018',
              data: DATA,
              totalSales: '100,000.00',
              profit: '36,630.00'
            }
          ]}
          renderItem={({ item }) => (
            <ProductListAtom
              items={item}
              textStyle={{ color: color.principal }}
              topBodyTextStyle={{ fontFamily: 'SourceSansPro-Semibold' }}
              numberTextStyle={styles.numberStyle}
              priceStyle={styles.price}
            />
          )}
          renderSectionHeader={({ section }) => (
            <ProductSalesRecordHeader title={section.date} />
          )}
          renderSectionFooter={this.renderFooter}
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  numberStyle: {
    color: color.principal
  },
  price: {
    color: color.selling,
    fontSize: 14
  },
  listItem: {
    backgroundColor: color.selling
  }
})
