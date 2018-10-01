import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import SelectStatusAtom from '../Atom/SelectStatusAtom'
import { color } from '../Style/Color'
import Header from '../Components/Header/DetailsScreenHeader'
import EmptyList from '../Components/EmptyList'
import Icon from '../Atom/Icon'
import ButtonAtom from '../Atom/ButtonAtom'
import { CheckBox } from 'native-base'
import Preferences from '../services/preferences'
import { ORDER_STATUSES } from '../utilities/data/statuses'
import { capitalize } from '../Functions'

interface IProps {
  navigation: any
  customer: any
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

const Row = ({ text }) => (
  <View style={styles.row}>
    <Icon type="Entypo" name="dot-single" style={styles.dotIcon} />
    <Text style={styles.hintText}>{text}</Text>
  </View>
)
const HintBody = ({ firstName }) => (
  <View>
    <Row text="Indicate the status of this order by touching the circles on each status" />
    <Row text="Press the blue Done button when you are finished" />
    <Row text={`${firstName} order will be sent to her`} />
    <Row text="You can always update the status in the order details page" />
  </View>
)
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
      <EmptyList
        type={{
          headerText: `Keep ${firstName}'s mind at rest concerning ${parseGender(
            props.gender
          )} order.`,
          body: <HintBody firstName={firstName} />
        }}
      />
      <View style={styles.row}>
        <CheckBox
          checked={props.hideHintChecked}
          style={styles.checkBox}
          onPress={props.hideHintCheck}
        />
        <Text style={styles.dismissText}>Do not show this message again</Text>
      </View>
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

export default class OrderStatusScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Order status"
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
  }
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
      <View
        style={[
          styles.container,
          { backgroundColor: color[`${this.state.orderStatus.value}BgColor`] }
        ]}
      >
        <Text style={styles.headerText}>{this.state.orderStatus.label}</Text>
        {ORDER_STATUSES.map(orderStatus => (
          <SelectStatusAtom
            key={orderStatus.value}
            title={orderStatus.label}
            indicatorColor={{
              backgroundColor: `${orderStatus.value}BorderIndicator`
            }}
            selected={this.state.orderStatus.value == orderStatus.value}
            onPress={() =>
              this.setState({
                orderStatus: {
                  ...orderStatus,
                  label: `${orderStatus.label}...`
                }
              })
            }
            status={orderStatus.value}
          />
        ))}
        <View style={styles.footer}>
          <ButtonAtom
            btnText={`Done`}
            onPress={this.changeOrderStatus}
            type="secondary"
            icon="md-checkmark"
          />
        </View>
      </View>
    )
  }

  changeOrderStatus = () => {}
}

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
    paddingVertical: 16,
    fontFamily: 'AvenirNext-Medium'
  },
  dotIcon: {
    fontSize: 25,
    color: color.textColor,
    paddingRight: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0
  },
  checkBox: {
    marginRight: 8
  },
  dismissText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14,
    color: color.textColor,
    marginLeft: 8
  }
})
