import React, { Component } from 'react'
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native'
import { CheckBox, ActionSheet, Content } from 'native-base'
import { Mutation } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import SelectStatusAtom from '../../Atom/SelectStatusAtom'
import { color } from '../../Style/Color'
import Header from '../../Components/Header/DetailsScreenHeader'
import ButtonAtom from '../../Atom/Form/ButtonAtom'
import Preferences from '../../services/preferences'
import {
  ORDER_STATUSES,
  orderStateMachine
} from '../../utilities/data/statuses'
import { capitalize } from '../../Functions'
import {
  UpdateSaleOrderStatusGQL,
  UpdatePurchaseOrderStatusGQL
} from '../../graphql/mutations/order'
import AppSpinner from '../../Components/Spinner'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'
import { MediumText, RegularText, DemiBoldText } from '../../Atom/TextAtom'

var BUTTONS = ['Yes, Change', 'Cancel']
var DESTRUCTIVE_INDEX = 0
var CANCEL_INDEX = 1

interface IProps {
  navigation: any
  customer: any
  setNotificationBanner: (obj: any) => void
}

interface OrderStatus {
  label: string
  value: string
}
interface IState {
  orderStatus: OrderStatus
  showHint: boolean
  hideHintChecked: boolean
}

interface IOrderStatusProps {
  contactName: string
  id: string
  gender: string
  onPress?: () => void
  hideHintChecked: boolean
  hideHintCheck: () => void
}

const parseGender = gender => {
  if (gender == 'MALE') return 'his'
  return 'her'
}

const OrderStatusHint = (props: IOrderStatusProps) => {
  const firstName = props.contactName.split(' ')[0]
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 16,
        backgroundColor: '#fff'
      }}
    >
      <Content>
        <DemiBoldText style={[styles.boldText, { marginVertical: 20 }]}>
          {`Keep ${firstName}'s mind at rest concerning ${parseGender(
            props.gender
          )} order.`.trim()}
        </DemiBoldText>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            Indicate the status of this order by touching the circles on each
            status
          </RegularText>
        </View>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            Press the blue Done button when you are finished
          </RegularText>
        </View>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            {`${firstName} order will be sent to her`}
          </RegularText>
        </View>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            You can always update the status in the order details page
          </RegularText>
        </View>

        <TouchableOpacity style={[styles.row]} onPress={props.hideHintCheck}>
          <CheckBox
            checked={props.hideHintChecked}
            style={styles.checkBox}
            onPress={props.hideHintCheck}
          />
          <MediumText style={styles.dismissText}>
            Don't show this message again
          </MediumText>
        </TouchableOpacity>
      </Content>
      <View style={styles.footer}>
        <ButtonAtom
          btnText={`Continue to status`}
          onPress={props.onPress}
          type="secondary"
        />
      </View>
    </View>
  )
}

class OrderStatusScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Order status"
          onPressRightIcon={() => navigation.navigate('Notifications')}
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
  }
  orderStateMachine = null
  constructor(props: IProps) {
    super(props)
    const showHint = props.navigation.getParam('showHint', true)
    const status = props.navigation.getParam('status', 'pending')
    this.state = {
      orderStatus: {
        value: status,
        label: `${capitalize(status)}...`
      },
      showHint: showHint,
      hideHintChecked: false
    }

    this.orderStateMachine = orderStateMachine(status)
  }

  continueToStatusChange = async () => {
    if (this.state.hideHintChecked) {
      await Preferences.hideOrderStatusHint()
    }
    this.setState({ showHint: false })
  }

  hideHintCheck = () => {
    this.setState({ hideHintChecked: !this.state.hideHintChecked })
  }

  render(): JSX.Element {
    const orderType = this.props.navigation.getParam('type', {})
    if (this.state.showHint) {
      const contact = this.props.navigation.getParam('contact', {})
      return (
        <OrderStatusHint
          gender={contact.gender}
          contactName={contact.contactName}
          id={contact.id}
          hideHintChecked={this.state.hideHintChecked}
          hideHintCheck={this.hideHintCheck}
          onPress={this.continueToStatusChange}
        />
      )
    }
    return (
      <Mutation
        mutation={
          orderType == 'sale'
            ? UpdateSaleOrderStatusGQL
            : UpdatePurchaseOrderStatusGQL
        }
        onCompleted={this.onCompleted}
      >
        {(updateOrderStatus, { loading }) => [
          <AppSpinner visible={loading} />,
          <View
            style={[
              styles.container,
              {
                backgroundColor: color[`${this.state.orderStatus.value}BgColor`]
              }
            ]}
          >
            <DemiBoldText style={styles.headerText}>
              {this.state.orderStatus.label}
            </DemiBoldText>
            {ORDER_STATUSES.map(orderStatus => (
              <SelectStatusAtom
                key={orderStatus.value}
                title={orderStatus.label}
                indicatorColor={{
                  backgroundColor: `${orderStatus.value}BorderIndicator`
                }}
                selected={this.state.orderStatus.value == orderStatus.value}
                onPress={() =>
                  this.changeOrderStatus(orderStatus, updateOrderStatus)
                }
                status={orderStatus.value}
              />
            ))}
          </View>
        ]}
      </Mutation>
    )
  }

  changeOrderStatus = (orderStatus, updateOrderStatusMutation) => {
    if (this.orderStateMachine.can(orderStatus.value)) {
      this.orderStateMachine[orderStatus.value]()
      this.setState(
        {
          orderStatus: {
            ...orderStatus,
            label: `${orderStatus.label}...`
          }
        },
        () => {
          const order = this.props.navigation.getParam('order', {})
          const orderType = this.props.navigation.getParam('type', {})
          this.submit(() =>
            updateOrderStatusMutation({
              variables: {
                id: order.id,
                orderType: orderType,
                status: orderStatus.value.toUpperCase()
              }
            })
          )
        }
      )
    } else {
      /// state machine cannot transition, show user alert here
    }
  }

  submit = cb => {
    // show alert warning
    // call callback
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Change order status?'
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          cb()
        }
      }
    )
  }

  onCompleted = async res => {
    const {
      updateOrderStatus: { success, data }
    } = res
    const contact = this.props.navigation.getParam('contact', {})

    if (!success) {
      Alert.alert(
        'Something went wrong!',
        'Apologises but something went wrong, please try again',
        [],
        { cancelable: true }
      )
    } else {
      const orderType = this.props.navigation.getParam('type', {})
      let resetAction: any = null
      if (orderType == 'purchase') {
        resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Purchase' }),
            NavigationActions.navigate({
              routeName: 'PurchaseDetails',
              params: {
                purchase: data
              }
            })
          ]
        })
      } else {
        resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Sales' }),
            NavigationActions.navigate({
              routeName: 'SalesDetails',
              params: {
                sales: data
              }
            })
          ]
        })
      }

      let banner = NotificationBanner(
        configureNotificationBanner('UpdateOrderStatus', contact)
      )
      banner.show({ bannerPosition: 'bottom' })

      this.props.navigation.dispatch(resetAction)
    }
  }
}

export default OrderStatusScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'AvenirNext-DemiBold',
    paddingLeft: 16,
    paddingVertical: 24
  },
  bottomSpace: {
    marginBottom: 16
  },
  bottomText: {
    marginLeft: 22,
    marginBottom: 32
  },
  hintText: {
    fontSize: 18,
    color: color.textColor,
    paddingVertical: 16
  },
  dotIcon: {
    fontSize: 25,
    color: color.textColor,
    paddingRight: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginTop: 25
  },
  checkBox: {
    marginRight: 8,
    borderRadius: 0,
    width: 22,
    height: 22
  },
  dismissText: {
    fontSize: 16,
    color: color.textColor,
    marginLeft: 16
  },
  footer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0
  },

  /** Borrowed style */
  boldText: {
    fontSize: 22,
    marginBottom: 16,
    // textAlign: 'justify',
    marginRight: 30,
    color: color.textColor,
    padding: 16
  },
  text: {
    fontSize: 17,
    textAlign: 'justify',
    marginRight: 30,
    color: color.textColor
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
    backgroundColor: color.textColor
  },
  section: {
    flexDirection: 'row',
    marginBottom: 30,
    marginRight: 30,
    alignItems: 'flex-start',
    paddingLeft: 16
  }
})
