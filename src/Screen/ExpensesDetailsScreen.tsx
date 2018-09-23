import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'
import Header from '../Components/Header/DetailsScreenHeader'
import SalesOrderListAtom from '../Atom/SalesOrderListAtom'
import ListItemAtom from '../Atom/ListItemAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}
export default class ExpensesDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Expense Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => Alert.alert('Edit pressed.')}
        />
      )
    }
  }

  render() {
    const expense = this.props.navigation.getParam('expense', {})
    const { expenseItems } = expense
    return (
      <View style={styles.container}>
        <SalesOrderListAtom
          firstTopText={expense.title}
          bottomLeftFirstText={expense.date}
          topRightText={'\u20A6 ' + `${expense.totalAmount}`}
          rightTopTextStyle={styles.headerAmountStyle}
          style={styles.listHeaderWrapper}
          rightStyle={styles.listHeaderRight}
        />
        {/* <ListItemAtom
          label="Paid to"
          value={expense.paidTo}
          labelStyle={styles.listLabel}
          rightTextStyle={styles.valueStyle}
          listItemStyle={styles.listWrapper}
        />
        <ListItemAtom
          label="Paid by"
          value={`${expense.paidBy.firstName} ${expense.paidBy.lastName}`}
          labelStyle={styles.listLabel}
          rightTextStyle={styles.valueStyle}
          listItemStyle={styles.listWrapper}
        /> */}
        <FlatList
          data={expenseItems}
          renderItem={({ item }: any) => (
            <ListItemAtom
              label={item.itemName}
              value={'\u20A6 ' + item.amount}
              labelStyle={styles.listLabel}
              rightTextStyle={styles.greenText}
              listItemStyle={styles.listWrapper}
            />
          )}
          keyExtractor={(item: any) => item.id}
        />
        <ListItemAtom
          label="TOTAL"
          value={'\u20A6 ' + `${expense.totalAmount}`}
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
    fontFamily: 'SourceSansPro-Semibold'
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
    fontFamily: 'Source Sans Pro'
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
