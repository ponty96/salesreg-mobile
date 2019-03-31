import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'native-base'
import { LineChart } from 'react-native-chart-kit'

import { MediumText, DemiBoldText } from '../../../Atom/TextAtom'
import DashboardStyles from './DashboardStyles'
import { color } from '../../../Style/Color'

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

export default class OrderAnalytics extends React.PureComponent {
  renderTitle = () => (
    <React.Fragment>
      <View style={styles.row}>
        <MediumText style={styles.smallText}>
          Order awaiting fulfillment
        </MediumText>
        <Icon name="today" type="MaterialIcons" />
      </View>
      <View style={styles.row}>
        <DemiBoldText style={styles.largeText}>56</DemiBoldText>
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

  renderOrderOverTime = () => (
    <View style={{ marginTop: 15 }}>
      <MediumText style={[styles.smallText]}>ORDER OVER TIME</MediumText>
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
        {this.renderTitle()}
        {this.renderOrderOverTime()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...DashboardStyles
})
