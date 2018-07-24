import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import EmptyList from '../Components/EmptyList'
import SelectStatusAtom from '../Atom/SelectStatusAtom'
import { color } from '../Style/Color'
import SaveCancelButton from '../Container/SaveCancelButton'
import CustomHeader from '../Components/CustomHeader'
import { textStyles } from '../Style/TextStyles'
import OrderRecallModal from '../Components/OrderRecallModal'

interface IProps {
  navigation: any
}

interface IState {
  pending: boolean
  pendingDelivery: boolean
  delivering: boolean
  delivered: boolean
  recalled: boolean
  visible: boolean
}

export default class SalesOrderStatusScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Sales order status"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  state = {
    pending: true,
    pendingDelivery: false,
    delivering: false,
    delivered: false,
    recalled: false,
    visible: false
  }

  handleRadioClick = (pressed: string): void => {
    switch (pressed) {
      case 'pending': {
        this.setState({
          pending: !this.state.pending,
          pendingDelivery: false,
          delivering: false,
          delivered: false,
          recalled: false
        })
        break
      }
      case 'pendingDelivery': {
        this.setState({
          pending: false,
          pendingDelivery: !this.state.pendingDelivery,
          delivering: false,
          delivered: false,
          recalled: false
        })
        break
      }
      case 'delivering': {
        this.setState({
          pending: false,
          pendingDelivery: false,
          delivering: !this.state.delivering,
          delivered: false,
          recalled: false
        })
        break
      }
      case 'delivered': {
        this.setState({
          pending: false,
          pendingDelivery: false,
          delivering: false,
          delivered: !this.state.delivered,
          recalled: false
        })
        break
      }
      case 'recalled': {
        this.setState({
          pending: false,
          pendingDelivery: false,
          delivering: false,
          delivered: false,
          recalled: !this.state.recalled
        })
        break
      }
      default:
    }
  }

  handleOKPress = () => {
    alert('OK button pressed.')
  }

  render(): JSX.Element {
    const { getParam } = this.props.navigation
    return (
      <View style={styles.container}>
        <EmptyList
          type={{
            Text:
              getParam('screen') === 'service'
                ? 'This order cannot be deleted after a status change from pending to any other state.\n' +
                  '\nApart from pending orders, no order can be canceled unless they have been recalled.'
                : 'This order cannot be deleted nor canceled after status changes from pending to any other state.',
            style: { marginBottom: 8 }
          }}
        />
        <ScrollView>
          <SelectStatusAtom
            title="Pending"
            indicatorColor={{ backgroundColor: color.red }}
            selected={this.state.pending}
            onPress={() => this.handleRadioClick('pending')}
          />
          <SelectStatusAtom
            title="Pending delivery"
            indicatorColor={{ backgroundColor: color.orange }}
            selected={this.state.pendingDelivery}
            onPress={() => this.handleRadioClick('pendingDelivery')}
          />
          <SelectStatusAtom
            title="Delivering"
            indicatorColor={{ backgroundColor: color.active }}
            selected={this.state.delivering}
            onPress={() => this.handleRadioClick('delivering')}
          />
          <SelectStatusAtom
            title="Delivered"
            indicatorColor={{ backgroundColor: color.selling }}
            selected={this.state.delivered}
            onPress={() => this.handleRadioClick('delivered')}
          />
          <SelectStatusAtom
            title="Recalled"
            indicatorColor={{ backgroundColor: color.yellow }}
            selected={this.state.recalled}
            styleWrapper={styles.bottomSpace}
            onPress={() => this.handleRadioClick('recalled')}
          />
          {getParam('screen') === 'service' ? (
            <Text
              style={[
                textStyles.normalText,
                textStyles.redText,
                styles.bottomText
              ]}
            >
              You cannot recall a service order
            </Text>
          ) : (
            undefined
          )}
        </ScrollView>
        <SaveCancelButton
          positiveButtonName="DONE"
          navigation={this.props.navigation}
          createfunc={() => this.setState({ visible: true })}
        />
        <OrderRecallModal
          headerText="Order recall!"
          bodyText="You cannot recall a sevice order ?"
          firstButtonText="OK"
          secondButtonText="Close"
          visible={this.state.visible}
          onBackPress={() => this.setState({ visible: false })}
          onPressTopButton={this.handleOKPress}
          onPressBottomButton={() => this.setState({ visible: false })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomSpace: {
    marginBottom: 16
  },
  bottomText: {
    marginLeft: 22,
    marginBottom: 32
  }
})
