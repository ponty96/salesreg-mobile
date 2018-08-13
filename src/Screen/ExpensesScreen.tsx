import * as React from 'react'
import { View, StyleSheet, Alert, SectionList, Text } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import FabAtom from '../Atom/FabAtom'
import EmptyList from '../Components/EmptyList'
import SalesOrderListAtom from '../Atom/SalesOrderListAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

export default class ExpensesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Expenses"
          showMenu
          onPressFirstRightIcon={() => Alert.alert('Search button pressed.')}
          onMenuPress={() => navigation.navigate('DrawerToggle')}
          showRight
          firstRightIcon="ios-search"
          rightStyle={styles.headerRight}
        />
      )
    }
  }

  renderList = ({ item }: any): JSX.Element => {
    const { navigation } = this.props
    return (
      <SalesOrderListAtom
        firstTopLeftText={item.name}
        bottomLeftText={item.paidTo}
        topRightText={'\u20A6 ' + item.amount}
        rightTopTextStyle={styles.amount}
        onPress={() => navigation.navigate('ExpensesDetails')}
      />
    )
  }

  renderListFooter = ({ section }: any): JSX.Element => {
    return (
      <View style={styles.footerWrapper}>
        <Text style={styles.footerText}>{section.date}</Text>
      </View>
    )
  }

  render() {
    const { navigation } = this.props
    const DATA0: Array<{ name: string; paidTo: string; amount: string }> = [
      {
        name: 'Shop renovation',
        paidTo: 'Lakan Wanton Doe',
        amount: '3000.00'
      },
      {
        name: 'Fuel',
        paidTo: 'Unknown',
        amount: '11,350.00'
      },
      {
        name: 'Order PU0017',
        paidTo: 'Rakuxi shoes',
        amount: '20,350.00'
      },
      {
        name: 'Fuel',
        paidTo: 'Unknown',
        amount: '11,350.00'
      }
    ]

    const DATA1: Array<{ name: string; paidTo: string; amount: string }> = [
      {
        name: 'Order PU0012',
        paidTo: 'Lere Wakoza',
        amount: '200,000.00'
      },
      {
        name: 'Order PU0013',
        paidTo: 'Lere Wakoza',
        amount: '200,000.00'
      },
      {
        name: 'Nepa bill',
        paidTo: 'PHCN',
        amount: '5780.00'
      },
      {
        name: 'Shelve',
        paidTo: 'Carpenter',
        amount: '12,800.00'
      }
    ]

    return (
      <View style={styles.container}>
        <FabAtom
          routeName="NewExpenses"
          navigation={navigation}
          name="database-minus"
          type="MaterialCommunityIcons"
        />
        <SectionList
          renderItem={this.renderList}
          ListEmptyComponent={
            <EmptyList type={{ Text: 'expenses', verifyMainList: 'main' }} />
          }
          sections={[
            { date: 'YESTERDAY', data: DATA0 },
            { date: '23 APRIL 2018', data: DATA1 }
          ]}
          keyExtractor={(item, index) => item.name + index}
          renderSectionFooter={this.renderListFooter}
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
  footerText: {
    fontFamily: 'SourceSansPro_Semibold',
    fontSize: 16,
    textAlign: 'center'
  },
  footerWrapper: {
    backgroundColor: color.grey,
    marginHorizontal: 10,
    paddingVertical: 8
  },
  amount: {
    color: color.selling
  },
  headerRight: {
    marginRight: 32,
    width: 30
  }
})
