import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'native-base'
import { LineChart } from 'react-native-chart-kit'
import { Query } from 'react-apollo'
import moment from 'moment'

import { MediumText, RegularText } from '../../../Atom/TextAtom'
import DashboardStyles from './DashboardStyles'
import { color } from '../../../Style/Color'
import RangePickerAtom from '../../../Atom/RangePickerAtom'
import { OrderDashboardInfoGQL } from '../../../graphql/queries/order'
import RequestActivityIndicator from './RequestActivityIndicator'
import { evaluateDataPoints } from '../../../Functions/graphHelpers'

interface IState {
	isRangePickerVisible: boolean
	startDate: string
	endDate: string
	shouldLoad: boolean
	groupBy: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
}

interface IProps {
	shouldLoad: boolean
}

const chartConfig = {
	backgroundGradientFrom: color.backgroundGradientFrom,
	backgroundGradientTo: color.backgroundGradientTo,
	color: () => color.graphColor,
	strokeWidth: 0.5
}

export default class OrderAnalytics extends React.PureComponent<IProps, IState> {
	constructor(props) {
		super(props)
		this.state = {
			isRangePickerVisible: false,
			startDate: moment()
				.subtract(30, 'd')
				.format('YYYY-MM-DD'),
			endDate: moment().format('YYYY-MM-DD'),
			groupBy: 'WEEKLY',
			shouldLoad: false
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

	renderStatuses = data => {
		let { orderStatuses } = data
		return (
			<View style={styles.row}>
				{orderStatuses.map((orderStatus: any) => (
					<View style={styles.row}>
						<Icon
							type="MaterialCommunityIcons"
							name="checkbox-blank-circle"
							style={{
								color: color[`${orderStatus.status.trim()}BorderIndicator`]
							}}
						/>
						<MediumText>
							{orderStatus.count} {orderStatus.status} orders
						</MediumText>
					</View>
				))}
			</View>
		)
	}

	renderGraph = data => {
		let { dataPoints } = data,
			chartPoints = evaluateDataPoints(this.state.groupBy, dataPoints)

		return (
			<View style={{ marginTop: 15 }}>
				<MediumText style={[styles.smallText]}>ORDER OVER TIME</MediumText>
				{dataPoints.length > 0 ? (
					<LineChart
						data={chartPoints}
						width={Dimensions.get('window').width - 26}
						height={220}
						withShadow={false}
						withDots={false}
						style={styles.chartStyle}
						chartConfig={chartConfig}
						bezier
					/>
				) : (
					<View style={styles.emptyContainer}>
						<RegularText style={[styles.smallText, styles.noDataText]}>No orders yet</RegularText>
					</View>
				)}
			</View>
		)
	}

	render() {
		let { startDate, endDate, groupBy, shouldLoad } = this.state

		return (
			<Query
				query={OrderDashboardInfoGQL}
				fetchPolicy="cache-and-network"
				skip={!shouldLoad}
				variables={{ query: { startDate, endDate, groupBy } }}
			>
				{({ loading, data }) => {
					let _data = data && data.orderDashboardInfo

					return (
						<View style={styles.container}>
							<View style={styles.row}>
								<MediumText style={styles.smallText}>ORDER AWAITING FULFILLMENT</MediumText>
								<Icon
									name="today"
									type="MaterialIcons"
									style={styles.icon}
									onPress={() => this.setState({ isRangePickerVisible: true })}
								/>
							</View>
							{loading && (
								<RequestActivityIndicator delay={500} containerStyle={styles.loadingContainer} />
							)}
							{!loading &&
								_data && (
									<React.Fragment>
										{this.renderStatuses(_data)}
										{this.renderGraph(_data)}
									</React.Fragment>
								)}
							<RangePickerAtom
								visible={this.state.isRangePickerVisible}
								onSave={this.setFilter}
								startDate={this.state.startDate}
								endDate={this.state.endDate}
								onRequestClose={() => this.setState({ isRangePickerVisible: false })}
							/>
						</View>
					)
				}}
			</Query>
		)
	}
}

const styles = StyleSheet.create({
	...DashboardStyles
})
