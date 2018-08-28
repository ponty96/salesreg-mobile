import * as React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import { color } from '../Style/Color'
import ListItemAtom from '../Atom/ListItemAtom'
import ListItemWithStatusIndicator from '../Components/ListItemWithStatusIndicator'
import ListItemWithTwoValues from '../Components/ListItemWithTwoValues'
import ListItemWithImage from '../Components/ListItemWithImage'
import WarningModal from '../Components/WarningModal'

interface IProps {
  navigation: any
}

interface IState {
  visible: boolean
}

export default class SalesOrderScreen extends React.Component<IProps, IState> {
  state = {
    visible: false
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Sales order details"
          showRight
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onPressRightButton={() => alert('Edit pressed.')}
          rightText="Edit"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  handleCancelPress = () => {
    this.setState({ visible: true })
  }

  handleContinuePress = () => {
    alert('Continue button pressed.')
  }

  handleOKPress = () => {
    alert('OK button pressed.')
  }

  handleDontCancelPress = () => {
    this.props.navigation.navigate('SalesOrderStatus')
    this.setState({ visible: false })
  }

  handleGotoStatusPress = () => {
    this.props.navigation.navigate('SalesOrderStatus', { screen: 'service' })
    this.setState({ visible: false })
  }

  renderBelowTotal = (): JSX.Element => {
    return (
      <View>
        <ListItemAtom
          label="Amount paid"
          value={'\u20A6 ' + '5,350.00'}
          labelStyle={styles.text}
          rightTextStyle={[styles.text, { textAlign: 'right' }]}
          listItemStyle={styles.header}
          greenText
        />
        <ListItemAtom
          label="Balance"
          value={'\u20A6 ' + '6,000.00'}
          labelStyle={styles.text}
          rightTextStyle={[styles.text, { textAlign: 'right' }]}
          listItemStyle={styles.header}
          redText
        />
        <ListItemAtom
          label="Balance due date"
          value="02-21-2018"
          labelStyle={styles.text}
          rightTextStyle={[styles.text, { textAlign: 'right' }]}
          listItemStyle={styles.header}
          redText
        />
      </View>
    )
  }

  renderModal = () => {
    const { getParam } = this.props.navigation

    if (getParam('screen') === 'service')
      return (
        <WarningModal
          headerText="Cancel order!"
          bodyText="You cannot cancel a delivered order. Recall this order to be able to cancel."
          firstButtonText="OK"
          firstButtonTextColor={color.black}
          secondButtonText="Go to status"
          visible={this.state.visible}
          onBackPress={() => this.setState({ visible: false })}
          onPressTopButton={() => this.handleContinuePress()}
          onPressBottomButton={() => this.handleDontCancelPress()}
          footerText="Close"
        />
      )
    else
      return (
        <WarningModal
          headerText="Warning!"
          bodyText="You cannot undo this action, do you still want to cancel this order ?"
          firstButtonText="Continue"
          firstButtonTextColor={color.red}
          secondButtonText="Don't cancel"
          visible={this.state.visible}
          onBackPress={() => this.setState({ visible: false })}
          onPressTopButton={this.handleContinuePress}
          onPressBottomButton={this.handleDontCancelPress}
          footerText="Close"
        />
      )
  }

  render() {
    const DATA: Array<{}> = [
      {
        left: 'Item 1',
        topRight: '4',
        bottomRight: '1,500.00'
      },
      {
        left: 'Item 2',
        topRight: '2',
        bottomRight: '850.00'
      },
      {
        left: 'Item 3',
        topRight: '36',
        bottomRight: '9,000.00'
      }
    ]
    const { navigation } = this.props
    return (
      <ScrollView style={styles.container}>
        <ListItemAtom
          label="ORDER ID"
          value="233232"
          labelStyle={styles.boldLabel}
          rightTextStyle={[styles.boldLabel]}
          listItemStyle={styles.header}
        />
        <ListItemWithImage label="Bought from" bottomText="Chito" />
        <ListItemAtom
          label="Agent"
          value="Ademola Dike"
          labelStyle={styles.text}
          rightTextStyle={[styles.text, { textAlign: 'right' }]}
          listItemStyle={styles.header}
        />
        <ListItemWithStatusIndicator
          label="Status"
          labelStyle={styles.text}
          value="Pending"
          rightTextStyle={{ color: color.principal }}
          statusColor={color.red}
          listItemStyle={{ paddingLeft: 0 }}
        />
        <ListItemWithTwoValues data={DATA} />
        <ListItemAtom
          label="TOTAL"
          value={'\u20A6 ' + '11,350.00'}
          listItemStyle={styles.totalWrapper}
        />
        {navigation.getParam('screen') === 'service'
          ? undefined
          : this.renderBelowTotal()}
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={this.handleCancelPress}
        >
          <Text style={styles.buttonText}>Cancel Order</Text>
        </TouchableOpacity>
        {this.renderModal()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  text: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    color: color.principal,
    flex: 1
  },
  boldLabel: {
    color: color.principal,
    fontFamily: 'Source Sans Pro',
    fontSize: 16
  },
  header: {
    paddingRight: 32,
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1
  },
  totalWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1,
    backgroundColor: color.selling,
    paddingRight: 32
  },
  buttonWrapper: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginVertical: 8,
    width: '40%',
    alignSelf: 'center',
    borderColor: color.dropdown
  },
  buttonText: {
    color: color.principal,
    fontSize: 14,
    fontFamily: 'Source Sans Pro'
  }
})
