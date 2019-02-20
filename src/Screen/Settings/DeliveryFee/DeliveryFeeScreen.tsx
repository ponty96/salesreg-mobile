import * as React from 'react'
import { Alert } from 'react-native'
import { Mutation } from 'react-apollo'
import { ActionSheet } from 'native-base'
import Header from '../../../Components/Header/DetailsScreenHeader'
import GenericListIndex from '../../../Components/Generic/ListIndex'
import AppSpinner from '../../../Components/Spinner'
import { ListCompanyDeliveryFees } from '../../../graphql/queries/business'
import { DeleteDeliveryFee } from '../../../graphql/mutations/business'
import { NotificationBanner } from '../../../Components/NotificationBanner'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'
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
  forceUpdateId: number
  deliveryAddressToDelete: string
}

class DeliveryFeeScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    forceUpdateId: Date.now(),
    deliveryAddressToDelete: ''
  }

  parseData = (item: any, deleteDeliveryFee: (obj: any) => void) => {
    return [
      {
        firstTopText: item.location,
        bottomLeftFirstText: item.price,
        bottomLeftSecondText: '', // item.date
        topRightText: ``, // this should be the number of products and services within this category
        showTrash: true,
        onPressTrash: () => {
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
                    deliveryAddressToDelete: item.location
                  },
                  () => {
                    deleteDeliveryFee({ variables: { deliveryFeeId: item.id } })
                  }
                )
              }
            }
          )
        }
      }
    ]
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
            { cancelable: false }
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

      this.setState({
        forceUpdateId: Date.now()
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Delivery Fees"
          onPressLeftIcon={() => this.props.navigation.goBack()}
          hideRightMenu={true}
        />
        <Mutation
          mutation={DeleteDeliveryFee}
          refetchQueries={ListCompanyDeliveryFees}
          awaitRefetchQueries={true}
          onCompleted={this.onCompleted}
        >
          {(deleteDeliveryFee, { loading }) => {
            return (
              <React.Fragment>
                <AppSpinner visible={loading} />
                <GenericListIndex
                  forceUpdateID={this.state.forceUpdateId}
                  isPaginatedList={false}
                  navigation={this.props.navigation}
                  graphqlQuery={ListCompanyDeliveryFees}
                  graphqlQueryResultKey="listCompanyDeliveryFees"
                  parseItemData={item =>
                    this.parseData(item, deleteDeliveryFee)
                  }
                  onItemPress={() => null}
                  emptyListText={`Adding delivery locations allow you manage the delivery fee for various customers based on their locations. \n\n To start creating delivery fees, touch the`}
                  headerText="Manage Delivery Charges!"
                  fabRouteName="CreateDeliveryFee"
                  fabIconName="truck-delivery"
                  fabIconType="MaterialCommunityIcons"
                  hideSeparator={true}
                />
              </React.Fragment>
            )
          }}
        </Mutation>
      </React.Fragment>
    )
  }
}

const _DeliveryFeeScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <DeliveryFeeScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_DeliveryFeeScreen.navigationOptions = DeliveryFeeScreen.navigationOptions

export default _DeliveryFeeScreen
