import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import EmptyList from '../Components/EmptyList'
import SelectStatusAtom from '../Atom/SelectStatusAtom'
import { color } from '../Style/Color'
import SaveCancelButton from '../Container/SaveCancelButton'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

interface IState {
  pending: boolean
  pendingDelivery: boolean
  delivering: boolean
  delivered: boolean
  recalled: boolean
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
    recalled: false
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

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <EmptyList
          type={{
            Text:
              'This order cannot be deleted nor canceled after status changes from pending to any other state.',
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
        </ScrollView>
        <SaveCancelButton
          positiveButtonName="DONE"
          navigation={this.props.navigation}
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
  }
})
