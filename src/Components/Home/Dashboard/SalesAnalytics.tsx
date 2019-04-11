import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'native-base'
import { LineChart } from 'react-native-chart-kit'
import { Query } from 'react-apollo'
import moment from 'moment'

import { MediumText, DemiBoldText, RegularText } from '../../../Atom/TextAtom'
import { color } from '../../../Style/Color'
import DashboardStyles from './DashboardStyles'
import { numberWithCommas } from '../../../Functions/numberWithCommas'
import RangePickerAtom from '../../../Atom/RangePickerAtom'
import { IncomeDashboardInfoGQL } from '../../../graphql/queries/order'
import RequestActivityIndicator from './RequestActivityIndicator'
import { evaluateDataPoints, getName } from '../../../Functions/graphHelpers'

interface IProps {
  shouldLoad: boolean
}

interface IState {
  isRangePickerVisible: boolean
  startDate: string
  endDate: string
  shouldLoad: boolean
  groupBy: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
}

const chartConfig = {
  backgroundGradientFrom: color.backgroundGradientFrom,
  backgroundGradientTo: color.backgroundGradientTo,
  color: () => color.graphColor,
  strokeWidth: 0.5
}

export default class SalesAnalytics extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props) {
    super(props)
    this.state = {
      isRangePickerVisible: false,
      startDate: moment()
        .subtract(30, 'd')
        .format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      groupBy: 'WEEKLY',
      shouldLoad: true
    }
  }

  componentDidUpdate() {
    if (this.props.shouldLoad && !this.state.shouldLoad) {
      this.setState({
        shouldLoad: true
      })
    }
  }

  setFilter = (startDate, endDate, groupBy) => {
    this.setState({
      startDate,
      endDate,
      groupBy
    })
  }

  renderDueInvoice = data => {
    let { amountDue } = data
    return (
      <View style={styles.dueInvoiceContainer}>
        <MediumText style={styles.smallText}>DUE INVOICE</MediumText>
        <DemiBoldText style={styles.largeText}>
          {`\u20A6${numberWithCommas(amountDue || 0)}`}{' '}
        </DemiBoldText>
      </View>
    )
  }

  renderSales = data => {
    let { totalIncome, totalProducts } = data
    return (
      <React.Fragment>
        <DemiBoldText style={styles.largeText}>
          {`\u20A6${numberWithCommas(totalIncome)}`}
        </DemiBoldText>
        <View style={{ marginTop: 20 }}>
          <MediumText style={styles.smallText}>TOTAL PRODUCT</MediumText>
          <DemiBoldText style={styles.largeText}>
            {totalProducts || 0}
          </DemiBoldText>
        </View>
      </React.Fragment>
    )
  }

  renderProducts = data => {
    let { topProducts } = data

    return (
      <View style={styles.productContainer}>
        <MediumText style={styles.smallText}>TOP PRODUCT</MediumText>
        {topProducts.length > 0 ? (
          topProducts.map((product, i) => (
            <View style={[styles.row, styles.addTopMargin]} key={i}>
              <RegularText style={[styles.smallText, styles.productsText]}>
                {getName(product.title)}
              </RegularText>
              <RegularText style={[styles.smallText, styles.productsText]}>
                {`\u20A6${numberWithCommas(product.amount)}`}
              </RegularText>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <RegularText style={[styles.smallText, styles.noDataText]}>
              No sales yet
            </RegularText>
          </View>
        )}
      </View>
    )
  }

  renderGraph = data => {
    let { dataPoints } = data,
      chartPoints = evaluateDataPoints(this.state.groupBy, dataPoints)

    return (
      <View style={{ marginTop: 15 }}>
        <MediumText style={[styles.smallText]}>SALES OVER TIME</MediumText>
        {dataPoints.length > 0 ? (
          <LineChart
            data={chartPoints}
            width={Dimensions.get('window').width - 26}
            height={220}
            withDots={false}
            withShadow={false}
            style={styles.chartStyle}
            chartConfig={chartConfig}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <RegularText style={[styles.smallText, styles.noDataText]}>
              No sales yet
            </RegularText>
          </View>
        )}
      </View>
    )
  }

  render() {
    let { startDate, endDate, groupBy, shouldLoad } = this.state

    return (
      <Query
        query={IncomeDashboardInfoGQL}
        fetchPolicy="cache-and-network"
        skip={!shouldLoad}
        variables={{ query: { startDate, endDate, groupBy } }}
      >
        {({ loading, data }) => {
          let _data = data && data.incomeDashboardInfo

          return (
            <View style={styles.container}>
              <View style={styles.row}>
                <MediumText style={styles.smallText}>TOTAL SALES</MediumText>
                <Icon
                  name="today"
                  type="MaterialIcons"
                  style={styles.icon}
                  onPress={() => this.setState({ isRangePickerVisible: true })}
                />
              </View>
              {loading && (
                <RequestActivityIndicator
                  delay={500}
                  containerStyle={styles.loadingContainer}
                />
              )}
              {!loading && _data && (
                <React.Fragment>
                  {this.renderSales(_data)}
                  {this.renderDueInvoice(_data)}
                  {this.renderProducts(_data)}
                  {this.renderGraph(_data)}
                </React.Fragment>
              )}
              <RangePickerAtom
                visible={this.state.isRangePickerVisible}
                onSave={this.setFilter}
                onRequestClose={() =>
                  this.setState({ isRangePickerVisible: false })
                }
              />
            </View>
          )
        }}
      </Query>
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
