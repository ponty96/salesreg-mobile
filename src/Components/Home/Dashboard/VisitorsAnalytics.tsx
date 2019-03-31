import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'native-base'
import { PieChart } from 'react-native-chart-kit'

import { MediumText, DemiBoldText } from '../../../Atom/TextAtom'
import DashboardStyles from './DashboardStyles'
import { color } from '../../../Style/Color'

const data = [
  {
    name: 'Webstore',
    count: 12343,
    color: color.green,
    legendFontColor: '#333',
    legendFontSize: 15
  },
  {
    name: 'Twitter',
    count: 234,
    color: color.yellow,
    legendFontColor: '#333',
    legendFontSize: 15
  },
  {
    name: 'Instagram',
    count: 85,
    color: color.blue,
    legendFontColor: '#333',
    legendFontSize: 15
  },
  {
    name: 'Webstore',
    count: 43,
    color: color.pink,
    legendFontColor: '#333',
    legendFontSize: 15
  }
]

const chartConfig = {
  backgroundGradientFrom: color.backgroundGradientFrom,
  backgroundGradientTo: color.backgroundGradientTo,
  color: () => color.graphColor,
  strokeWidth: 0.5
}

export default class VisitorsAnalytics extends React.PureComponent {
  renderTitle = () => (
    <React.Fragment>
      <View style={styles.row}>
        <MediumText style={styles.smallText}>Total Visitors</MediumText>
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

  renderGraph = () => (
    <View style={styles.graph}>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 26}
        height={220}
        accessor="count"
        backgroundColor="transparent"
        chartConfig={chartConfig}
      />
    </View>
  )

  renderProducts = () => (
    <View style={styles.productContainer}>
      <MediumText style={styles.smallText}>TRENDING PRODUCT</MediumText>
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderTitle()}
        {this.renderGraph()}
        {this.renderProducts()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...DashboardStyles,
  graph: {
    marginVertical: 15,
    paddingVertical: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderTopColor: '#bdbdbd',
    borderBottomColor: '#bdbdbd'
  },
  productContainer: {
    paddingBottom: 15
  }
})
