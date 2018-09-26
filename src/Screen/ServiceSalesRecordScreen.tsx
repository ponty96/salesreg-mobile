import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import SalesOrderListAtom from '../Atom/SalesOrderListAtom'
import { color } from '../Style/Color'
import ListItemAtom from '../Atom/ListItemAtom'
import Header from '../Components/Header/BaseHeader'
import EmptyList from '../Components/EmptyList'

export default class ServiceSalesRecordScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Service sales record"
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }

  renderList = ({ item }: any): JSX.Element => {
    return (
      <SalesOrderListAtom
        firstTopText={item.customerName}
        bottomLeftFirstText={item.productName}
        topRightText={item.number}
        bottomRightText={'\u20A6 ' + item.price}
        style={styles.listWrapper}
      />
    )
  }

  render() {
    const DATA: {
      productName: string
      customerName: string
      number: string
      price: string
    }[] = [
      {
        productName: '1 million braids',
        customerName: 'Chito Amanda',
        number: '1',
        price: '2000.00'
      },
      {
        productName: 'Nail fixing',
        customerName: 'Edna Brooks',
        number: '1',
        price: '300.00'
      },
      {
        productName: 'Nail fixing',
        customerName: 'Mummu Ela',
        number: '1',
        price: '300.00'
      },
      {
        productName: 'Bridal Makeup',
        customerName: 'Caroline',
        number: '6',
        price: '60,000.00'
      }
    ]

    return (
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={this.renderList}
          keyExtractor={(item, index) => item.productName + index}
          ListEmptyComponent={
            <EmptyList
              type={{
                Text:
                  'You have no services sold yet. Press the back arrow and start adding orders.'
              }}
            />
          }
        />
        {DATA.length < 1 ? (
          undefined
        ) : (
          <ListItemAtom
            label="TOTAL SALES"
            value={'\u20A6 ' + '62,600.00'}
            listItemStyle={styles.footer}
            rightTextStyle={styles.totalAmount}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.secondary
  },
  footer: {
    backgroundColor: color.selling,
    paddingRight: 48,
    paddingLeft: 48
  },
  listWrapper: {
    marginBottom: 0
  },
  totalAmount: {
    fontSize: 16
  },
  viewUnderEmptyList: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
