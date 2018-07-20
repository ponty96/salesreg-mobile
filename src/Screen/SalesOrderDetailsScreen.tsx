import * as React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
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
          onPressRightButton={() => console.log('Edit pressed.')}
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

  handleDontCancelPress = () => {
    alert("Don't cancel button pressed.")
  }

  render() {
    const DATA: {}[] = [
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
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={this.handleCancelPress}
        >
          <Text style={styles.buttonText}>Cancel Order</Text>
        </TouchableOpacity>
        <WarningModal
          headerText="Warning!"
          bodyText="You cannot undo this action, do you still want to cancel this order ?"
          firstButtonText="Continue"
          firstButtonTextColor={color.red}
          secondButtonText="Don't cancel"
          visible={this.state.visible}
          onBackPress={() => this.setState({ visible: false })}
          onPressTopButton={() => this.handleContinuePress}
          onPressBottomButton={() => this.handleDontCancelPress}
        />
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
    fontFamily: 'SourceSansPro',
    fontSize: 14,
    color: color.principal,
    flex: 1
  },
  boldLabel: {
    color: color.principal,
    fontFamily: 'SourceSansPro',
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
    fontFamily: 'SourceSansPro'
  }
})
