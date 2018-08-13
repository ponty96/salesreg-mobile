import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'
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
          onPressRightButton={() => Alert.alert('Edit pressed.')}
        />
      )
    }
  }

  render() {
    const DATA: Array<{ label: string; value: string }> = [
      { label: 'Item 1', value: '120,500.00' },
      { label: 'Item 2', value: '45,500.00' },
      { label: 'Item 3', value: '34,000.00' }
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
        <ListItemAtom
          label="Paid to"
          value="Lere Wakoza"
          labelStyle={styles.listLabel}
          rightTextStyle={styles.valueStyle}
          listItemStyle={styles.listWrapper}
        />
        <ListItemAtom
          label="Paid by"
          value="Ayo Doe"
          labelStyle={styles.listLabel}
          rightTextStyle={styles.valueStyle}
          listItemStyle={styles.listWrapper}
        />
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <ListItemAtom
              label={item.label}
              value={'\u20A6 ' + item.value}
              labelStyle={styles.listLabel}
              rightTextStyle={styles.greenText}
              listItemStyle={styles.listWrapper}
            />
          )}
          keyExtractor={item => item.label}
        />
        <ListItemAtom
          label="TOTAL"
          value={'\u20A6 ' + '200,000.00'}
          listItemStyle={styles.footer}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
  },
  listLabel: {
    color: color.button,
    marginLeft: 2
  },
  valueStyle: {
    color: color.principal,
    fontFamily: 'SourceSansPro'
  },
  listWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingRight: 24
  },
  greenText: {
    color: color.selling
  },
  footer: {
    backgroundColor: color.selling,
    paddingLeft: 24,
    paddingRight: 24
  }
})
