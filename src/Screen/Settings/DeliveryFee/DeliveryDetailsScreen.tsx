import * as React from 'react'
import { Alert, View } from 'react-native'
import { Mutation } from 'react-apollo'
import { ActionSheet } from 'native-base'
import Header from '../../../Components/Header/DetailsScreenHeader'
import AppSpinner from '../../../Components/Spinner'
import { ListCompanyDeliveryFees } from '../../../graphql/queries/business'
import { DeleteDeliveryFee } from '../../../graphql/mutations/business'
import { NotificationBanner } from '../../../Components/NotificationBanner'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'
import { color } from '../../../Style/Color'
import SalesOrderListAtom from '../../../Atom/ListItem/SalesOrderListAtom'
import EmptyList from '../../../Components/EmptyList'
import { UserContext } from '../../../context/UserContext'

let BUTTONS = ['Yes, delete', 'Cancel']
let DESTRUCTIVE_INDEX = 0
let CANCEL_INDEX = 1

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner: (obj: any) => void
}

interface IState {
  deliveryAddressToDelete: string
  locations: any[]
}

class DeliveryDetailsScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    let locations = props.navigation.getParam('locations', [])
    this.state = {
      deliveryAddressToDelete: '',
      locations
    }
  }

  onCompleted = async res => {
    const {
      deleteDeliveryFee: { success, fieldErrors }
    } = res

    if (!success) {
      setTimeout(
        () =>
          Alert.alert(
            'Error',
            fieldErrors[0].message,
            [{ text: 'Ok', onPress: () => null }],
            {
              cancelable: false
            }
          ),
        100
      )
    } else {
      let banner = NotificationBanner(
        configureNotificationBanner(
          'DeleteDeliveryFee',
          this.state.deliveryAddressToDelete
        )
      )
      banner.show({ bannerPosition: 'bottom' })
      let locations = this.state.locations.filter(
        location => location.region != this.state.deliveryAddressToDelete
      )
      this.setState({
        locations
      })
    }
  }

  deleteDeliveryFee = (location, deleteDeliveryFee) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Delete?'
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          this.setState(
            {
              deliveryAddressToDelete: location.region
            },
            () => {
              deleteDeliveryFee({
                variables: { deliveryFeeId: location.id }
              })
            }
          )
        }
      }
    )
  }

  render() {
    let state = this.props.navigation.getParam('state', null)

    return (
      <React.Fragment>
        <Header
          title={`${state[0].toUpperCase()}${state.substr(1)} Delivery Fees`}
          onPressLeftIcon={() => this.props.navigation.goBack()}
          hideRightMenu={true}
        />
        <Mutation
          mutation={DeleteDeliveryFee}
          refetchQueries={[
            {
              query: ListCompanyDeliveryFees,
              variables: {
                companyId: this.props.user.company.id
              }
            }
          ]}
          awaitRefetchQueries={true}
          onCompleted={this.onCompleted}
        >
          {(deleteDeliveryFee, { loading }) => {
            return (
              <React.Fragment>
                <AppSpinner visible={loading} />
                <View style={{ flex: 1, backgroundColor: color.secondary }}>
                  {this.state.locations.length > 0 ? (
                    this.state.locations.map(location => (
                      <SalesOrderListAtom
                        firstTopText={location.region.toUpperCase()}
                        bottomLeftFirstText={`Price:`}
                        bottomLeftSecondText={`\u20A6${location.fee}`}
                        topRightText={``}
                        showTrash={true}
                        onPress={() => null}
                        onPressTrash={() =>
                          this.deleteDeliveryFee(location, deleteDeliveryFee)
                        }
                      />
                    ))
                  ) : (
                    <EmptyList
                      type={{
                        Text: `No Address found for ${state[0].toUpperCase()}${state.substr(
                          1
                        )}, please add one or more addresses to this location`,
                        headerText: 'Addresses Not Found'
                      }}
                    />
                  )}
                </View>
              </React.Fragment>
            )
          }}
        </Mutation>
      </React.Fragment>
    )
  }
}

const _DeliveryDetailsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <DeliveryDetailsScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_DeliveryDetailsScreen.navigationOptions =
  DeliveryDetailsScreen.navigationOptions

export default _DeliveryDetailsScreen
