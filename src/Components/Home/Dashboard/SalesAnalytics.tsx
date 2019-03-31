import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'native-base'
import { LineChart } from 'react-native-chart-kit'

import { MediumText, DemiBoldText } from '../../../Atom/TextAtom'
import { color } from '../../../Style/Color'
import DashboardStyles from './DashboardStyles'

const data = {
  labels: ['Mar 25', '26', '27', '28', '29'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: () => color.blue,
      strokeWidth: 3
    },
    {
      data: [20, 30, 45, 80, 50, 35],
      color: () => color.green,
      strokeWidth: 3
    }
  ]
}

const chartConfig = {
  backgroundGradientFrom: color.backgroundGradientFrom,
  backgroundGradientTo: color.backgroundGradientTo,
  color: () => color.graphColor,
  strokeWidth: 0.5
}

export default class SalesAnalytics extends React.PureComponent {
  renderDueInvoice = () => (
    <View style={styles.dueInvoiceContainer}>
      <MediumText style={styles.smallText}>DUE INVOICE</MediumText>
      <DemiBoldText style={styles.largeText}>N12,930.89</DemiBoldText>
    </View>
  )

  renderSales = () => (
    <React.Fragment>
      <View style={styles.row}>
        <MediumText style={styles.smallText}>TOTAL SALES</MediumText>
        <Icon name="today" type="MaterialIcons" />
      </View>
      <DemiBoldText style={styles.largeText}>N67,988.90</DemiBoldText>
      <View style={{ marginTop: 20 }}>
        <MediumText style={styles.smallText}>TOTAL PRODUCT</MediumText>
        <DemiBoldText style={styles.largeText}>32</DemiBoldText>
      </View>
    </React.Fragment>
  )

  renderProducts = () => (
    <View style={styles.productContainer}>
      <MediumText style={styles.smallText}>TOP PRODUCT</MediumText>
      <View style={styles.row}>
        <MediumText style={[styles.smallText, styles.productsText]}>
          Hublot wrist watch
        </MediumText>
        <MediumText style={[styles.smallText, styles.productsText]}>
          N23,500.00
        </MediumText>
      </View>
      <View style={styles.row}>
        <MediumText style={[styles.smallText, styles.productsText]}>
          Simulation Dildo
        </MediumText>
        <MediumText style={[styles.smallText, styles.productsText]}>
          N15,200.00
        </MediumText>
      </View>
    </View>
  )

  renderSalesOverTime = () => (
    <View style={{ marginTop: 15 }}>
      <MediumText style={[styles.smallText]}>SALES OVER TIME</MediumText>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 26}
        height={220}
        withShadow={false}
        style={styles.chartStyle}
        chartConfig={chartConfig}
      />
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        {this.renderSales()}
        {this.renderDueInvoice()}
        {this.renderProducts()}
        {this.renderSalesOverTime()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...DashboardStyles,
  dueInvoiceContainer: {
    marginVertical: 15,
    paddingVertical: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderTopColor: '#bdbdbd',
    borderBottomColor: '#bdbdbd'
  },
  productContainer: {
    paddingBottom: 15,
    borderBottomColor: '#757575',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
