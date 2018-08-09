import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import SalesOrderListAtom from '../Atom/SalesOrderListAtom'
import ListItemAtom from '../Atom/ListItemAtom'
import { color } from '../Style/Color'

export class ExpensesDetailsScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Expense"
          onBackPress={() => navigation.goBack()}
          showRight
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          rightText="Edit"
        />
      )
    }
  }

  render() {
    const DATA: Array<{ label: string; value: string }> = [
      {
        label: '',
        value: ''
      }
    ]

    return (
      <View style={styles.container}>
        <SalesOrderListAtom
          firstTopLeftText="Order PU0012"
          bottomLeftText="06/15/2018"
          topRightText={'\u20A6 ' + '20,700.00'}
          rightTopTextStyle={styles.headerAmountStyle}
          style={styles.listHeaderWrapper}
          rightStyle={styles.listHeaderRight}
        />
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <ListItemAtom label={item.label} value={item.value} />
          )}
          keyExtractor={item => item.label}
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
  headerAmountStyle: {
    color: color.selling,
    marginTop: 20,
    fontFamily: 'SourceSansPro_Semibold'
  },
  listHeaderWrapper: {
    paddingBottom: 16
  },
  listHeaderRight: {
    marginRight: 0
  }
})
