import * as React from 'react'
import { Alert } from 'react-native'
import { ActionSheet } from 'native-base'
import { Mutation } from 'react-apollo'

import AppSpinner from '../../../Components/Spinner'
import Header from '../../../Components/Header/BaseHeader'
import GenericListIndex from '../../../Components/Generic/ListIndex'
import { ListCompanyDeliveryFees } from '../../../graphql/queries/business'
import { UserContext } from '../../../context/UserContext'
import { DeleteDeliveryFee } from '../../../graphql/mutations/business'
import { NotificationBanner } from '../../../Components/NotificationBanner'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'

let BUTTONS = ['Yes, delete', 'Cancel']
let DESTRUCTIVE_INDEX = 0
let CANCEL_INDEX = 1

interface IProps {
  navigation: any
  user?: any
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
    deliveryAddressToDelete: '',
    forceUpdateId: Date.now()
  }

  parseData = (item: any): any => {
    return [
      {
        firstTopText: item.state.toUpperCase(),
        bottomLeftFirstText:
          item.state.toLowerCase() == 'nation wide'
            ? `Price: \u20A6${item.locations[0].fee}`
            : `${item.locations.length} region${
                item.locations.length > 1 ? 's' : ''
              }`,
        bottomLeftSecondText: ``,
        topRightText: ``, // this should be the number of products and services within this category
        showTrash: false
      }
    ]
  }

  groupDeliveryFees = sections => {
    if (sections.length == 0) {
      return sections
    } else {
      let _sections = [],
        seenStates = []

      sections.forEach(section => {
        let index = seenStates.indexOf(section.state)
        if (index != -1) {
          _sections[index].node.locations.push(section)
        } else {
          seenStates.push(section.state)
          _sections.push({
            node: {
              state: section.state,
              locations: [section]
            }
          })
        }
      })

      return [
        {
          data: _sections
        }
      ]
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
      this.setState({
        forceUpdateId: Date.now()
      })
    }
  }

  deleteDeliveryFee = (address, deleteDeliveryFee) => {
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
              deliveryAddressToDelete: address.state
            },
            () => {
              deleteDeliveryFee({
                variables: { deliveryFeeId: address.locations[0].id }
              })
            }
          )
        }
      }
    )
  }

  render() {
    return (
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
        {(deleteDeliveryFee, { loading }) => (
          <React.Fragment>
            <AppSpinner visible={loading} />
            <Header
              title="Shipping Zones"
              onPressLeftIcon={() =>
                this.props.navigation.navigate('DrawerToggle')
              }
            />
            <GenericListIndex
              isPaginatedList={false}
              navigation={this.props.navigation}
              graphqlQuery={ListCompanyDeliveryFees}
              graphqlQueryResultKey="listCompanyDeliveryFees"
              fetchPolicy="network-only"
              parseItemData={item => this.parseData(item)}
              onItemPress={node => {
                node.state.toLowerCase() == 'nation wide'
                  ? this.deleteDeliveryFee(node, deleteDeliveryFee)
                  : this.props.navigation.navigate('DeliveryDetails', {
                      locations: node.locations,
                      state: node.state
                    })
              }}
              formatData={this.groupDeliveryFees}
              emptyListText={`Adding shipping zones allow you manage the shipping fee for your customers based on their regions. \n\n To start creating shipping zones, touch the`}
              headerText="Manage Delivery Charges!"
              fabRouteName="CreateDeliveryFee"
              fabIconName="truck-delivery"
              fabIconType="MaterialCommunityIcons"
              hideSeparator={true}
            />
          </React.Fragment>
        )}
      </Mutation>
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
