import * as React from 'react'
import { StyleSheet, Alert, FlatList, ScrollView } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import { Icon } from 'native-base'
import { color } from '../Style/Color'
import SalesOrderListAtom from '../Atom/SalesOrderListAtom'
import EmptyList from '../Components/EmptyList'
// import { MenuTrigger, Menu } from 'react-native-popup-menu'

interface IProps {
  navigation: any
}

export default class InvoicesScreen extends React.Component<IProps> {
  static navigationOptions = (): object => {
    return {
      header: (
        <CustomHeader
          title="Invoice"
          showMenu
          showRight
          firstRightIcon="ios-search"
        >
          {/*<Menu>
            <MenuTrigger>*/}
          <Icon
            name="md-more"
            type="Ionicons"
            style={styles.headerMenuIcon}
            onPress={() => Alert.alert('Pressed menu icon.')}
          />
          {/*</MenuTrigger>
          </Menu>*/}
        </CustomHeader>
      )
    }
  }

  renderList = ({ item }: any): JSX.Element => {
    const { navigation } = this.props
    return (
      <SalesOrderListAtom
        firstTopLeftText={item.transactionID}
        topRightText={'\u20A6 ' + item.price}
        bottomLeftText={item.customerName}
        bottomRightText={item.date}
        leftStyle={styles.listLeft}
        rightStyle={styles.listRight}
        topLeftTextColor={item.status}
        bottomRightTextStyle={{ color: color.principal }}
        rightTopTextStyle={{ color: color.selling }}
        bottomRightTextColor={item.dateStatus}
        onPress={() => navigation.navigate('InvoiceDetails', {screen: 'invoiceDetail'})}
      />
    )
  }

  render() {
    const DATA: Array<{
      transactionID: string
      customerName: string
      price: string
      date: string
      status?: string
      dateStatus?: string
    }> = [
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04 / 11 / 2018',
        status: color.selling
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04 / 11 / 2018',
        status: color.selling
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04 / 11 / 2018'
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04 / 11 / 2018',
        dateStatus: color.red
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04 / 11 / 2018',
        dateStatus: color.red
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04 / 11 / 2018'
      }
    ]

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={this.renderList}
          keyExtractor={(item, index) => item.transactionID + index}
          ListEmptyComponent={
            <EmptyList
              type={{
                Text: 'When orders are taken, the invoices appear here'
              }}
            />
          }
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  headerMenuIcon: {
    color: color.secondary,
    fontSize: 28,
    marginLeft: 32,
    marginTop: 4
  },
  listLeft: {
    marginLeft: 8
  },
  listRight: {
    marginRight: 8
  }
})
