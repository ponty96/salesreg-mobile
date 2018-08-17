import * as React from 'react'
import { View, StyleSheet, Alert, FlatList } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import { Icon } from 'native-base'
import { color } from '../Style/Color'
import SalesOrderListAtom from '../Atom/SalesOrderListAtom'
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

  renderList = ({ item }): JSX.Element => {
    return (
      <SalesOrderListAtom
        firstTopLeftText={item.transactionID}
        topRightText={item.price}
        bottomLeftText={item.customerName}
        bottomRightText={item.date}
      />
    )
  }

  render() {
    const DATA: Array<{
      transactionID: string
      customerName: string
      price: string
      date: string
    }> = [
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04/11/2018'
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04/11/2018'
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04/11/2018'
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04/11/2018'
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04/11/2018'
      },
      {
        transactionID: '#00023',
        customerName: 'Lakan Wanton Doe',
        price: '3000.00',
        date: '04/11/2018'
      }
    ]
    return (
      <View style={styles.container}>
        <FlatList data={DATA} renderItem={this.renderList} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerMenuIcon: {
    color: color.secondary,
    fontSize: 28,
    marginLeft: 32,
    marginTop: 4
  }
})
