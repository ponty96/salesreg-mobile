import React, { Component } from 'react'
import { View, StyleSheet, SectionList } from 'react-native'
import EmptyList from '../Components/EmptyList'
import { color } from '../Style/Color'
import CustomHeader from '../Components/CustomHeader'

export default class ProductSalesRecordScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Product sales record"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }
  render(): JSX.Element {
    const DATA: {
      productPic: string
      productName: string
      customerName: string
      numberSold: string
      price: string
    }[] = [
      {
        productPic: '',
        productName: 'Iman powder',
        customerName: 'Salomy',
        numberSold: '1',
        price: '4000.00'
      },
      {
        productPic: '',
        productName: 'Close up',
        customerName: 'David',
        numberSold: '1',
        price: '150.00'
      },
      {
        productPic: '',
        productName: 'Hoey soap',
        customerName: 'Kayla',
        numberSold: '1',
        price: '600.00'
      },
      {
        productPic: '',
        productName: 'Tresee liquid bath',
        customerName: 'Salomy',
        numberSold: '1',
        price: '4000.00'
      },
      {
        productPic: '',
        productName: 'Big comb',
        customerName: 'Salomy',
        numberSold: '1',
        price: '50.00'
      }
    ]

    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              title: '21 March 2018',
              data: DATA
            }
          ]}
        />
        <EmptyList
          type={{
            Text:
              'You have no products sold yet. Press the back arrow and start adding orders.'
          }}
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
