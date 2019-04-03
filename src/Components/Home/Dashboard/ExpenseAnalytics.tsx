import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import { MediumText, DemiBoldText, RegularText } from '../../../Atom/TextAtom'
import DashboardStyles from './DashboardStyles'
import { numberWithCommas } from '../../../Functions/numberWithCommas'
import RangePickerAtom from '../../../Atom/RangePickerAtom'

export default class ExpenseAnalytics extends React.PureComponent {
  state = {
    isRangePickerVisible: false
  }

  renderTitle = () => (
    <React.Fragment>
      <View style={styles.row}>
        <MediumText style={styles.smallText}>TOTAL EXPENSE</MediumText>
        <Icon name="today" type="MaterialIcons" style={styles.icon} />
      </View>
      <View style={styles.row}>
        <DemiBoldText style={styles.largeText}>{`\u20A6${numberWithCommas(
          2300.0
        )}`}</DemiBoldText>
        <View style={styles.row}>
          <Icon
            style={styles.redText}
            name="ios-arrow-round-down"
            type="Ionicons"
          />
          <MediumText style={[styles.redText, { marginLeft: 5 }]}>
            2.45%
          </MediumText>
        </View>
      </View>
    </React.Fragment>
  )

  renderExpenses = () => (
    <View style={styles.expenseContainer}>
      <MediumText style={styles.smallText}>EXPENSE BREAKDOWN</MediumText>
      <View style={[styles.row, styles.borderedExpense]}>
        <RegularText style={[styles.smallText, styles.productsText]}>
          Bought Bag Packs
        </RegularText>
        <RegularText style={[styles.smallText, styles.productsText]}>
          {`\u20A6${numberWithCommas(23500.0)}`}{' '}
        </RegularText>
      </View>
      <View style={[styles.row, styles.borderedExpense]}>
        <RegularText style={[styles.smallText, styles.productsText]}>
          Bought Bag Packs
        </RegularText>
        <RegularText style={[styles.smallText, styles.productsText]}>
          {`\u20A6${numberWithCommas(23500.0)}`}{' '}
        </RegularText>
      </View>
    </View>
  )

  render() {
    return (
      <React.Fragment>
        <RangePickerAtom
          visible={this.state.isRangePickerVisible}
          onSave={() => null}
          onRequestClose={() => this.setState({ isRangePickerVisible: false })}
        />
        <View style={styles.container}>
          {this.renderTitle()}
          {this.renderExpenses()}
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  ...DashboardStyles,
  expenseContainer: {
    paddingBottom: 15,
    marginTop: 25
  },
  borderedExpense: {
    paddingVertical: 15,
    borderBottomColor: '#757575',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
