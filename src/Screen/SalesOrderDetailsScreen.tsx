import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../Components/Generic/Details'
import moment from 'moment'
import Preferences from '../services/preferences'
import { UserContext } from '../context/UserContext'
import { color } from '../Style/Color'

interface IProps {
	navigation: any
	user?: any
}

class SalesOrderDetailsScreen extends Component<IProps> {
	static navigationOptions = ({ navigation }: any) => {
		return {
			header: (
				<Header title="Sales Order Details" onPressLeftIcon={() => navigation.goBack()} hideRightMenu={true} />
			)
		}
	}

	onStatusPress = async () => {
		const sales = this.props.navigation.getParam('sales', {})
		const hideHint = await Preferences.getOrderStatusHintPref()
		this.props.navigation.navigate('OrderStatusChange', {
			showHint: hideHint ? false : true,
			contact: sales.contact,
			type: 'sale',
			status: sales.status,
			order: sales
		})
	}

	parseItems = () => {
		const sales = this.props.navigation.getParam('sales', {})
		const { items = [] } = sales

		console.log('oya ', sales.location)
		return [
			{
				itemTitle: 'Date',
				itemValue: moment(sales.date).calendar()
			},
			{
				itemTitle: 'Status',
				itemValue: sales.status
			}
		].concat(
			items
				.map(item => ({
					itemTitle: item.product ? item.product.name : item.service.name,
					itemValue: `\u20A6 ${item.unitPrice}`,
					itemQuantity: item.quantity
				}))
				.concat([
					{
						itemTitle: 'Delivery Address',
						itemValue: sales.location
							? [
									sales.location.street1,
									sales.location.city,
									sales.location.state,
									sales.location.country
								]
							: null
					},
					{
						itemTitle: 'Discount',
						itemValue: `\u20A6 ${sales.discount}`
					}
				])
		)
	}

	render() {
		const sales = this.props.navigation.getParam('sales', {})

		return (
			<View style={styles.container}>
				<GenericDetailsComponent
					title={sales.contact.contactName}
					totalAmount={parseFloat((Number(sales.amount) - Number(sales.discount)).toString()).toFixed(2)}
					items={this.parseItems()}
					shouldShowStatus={true}
					onPressStatus={this.onStatusPress}
					enableDelete={false}
				/>
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate('InvoiceDetails', {
							sales,
							from: 'Sales'
						})}
				>
					<View style={styles.invoicebuttomContainer}>
						<Text style={styles.invoiceText}>Invoice</Text>
						<Icon name="chevron-small-right" type="Entypo" style={styles.invoiceIcon} />
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	invoicebuttomContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 70,
		paddingRight: 24,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: '#bdbdbd',
		backgroundColor: '#fff'
	},
	invoiceText: {
		fontSize: 16,
		color: color.button,
		fontFamily: 'AvenirNext-Regular'
	},
	invoiceIcon: {
		fontSize: 35,
		color: color.button
	}
})

const _SalesOrderDetailsScreen: any = props => (
	<UserContext.Consumer>{({ user }) => <SalesOrderDetailsScreen {...props} user={user} />}</UserContext.Consumer>
)

_SalesOrderDetailsScreen.navigationOptions = SalesOrderDetailsScreen.navigationOptions

export default _SalesOrderDetailsScreen
