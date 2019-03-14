import * as React from 'react'
import Header from '../../../Components/Header/DetailsScreenHeader'
import GenericListIndex from '../../../Components/Generic/ListIndex'
import { ListCompanyDeliveryFees } from '../../../graphql/queries/business'
import { UserContext } from '../../../context/UserContext'

interface IProps {
  navigation: any
  user?: any
}

class DeliveryFeeScreen extends React.Component<IProps> {
  static navigationOptions = {
    header: null
  }

  parseData = (item: any): any => {
    return [
      {
        firstTopText: item.state.toUpperCase(),
        bottomLeftFirstText: `${item.locations.length} Addresses`,
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

  render() {
    return (
      <React.Fragment>
        <Header
          title="Delivery Fees"
          onPressLeftIcon={() => this.props.navigation.goBack()}
          hideRightMenu={true}
        />
        <GenericListIndex
          isPaginatedList={false}
          navigation={this.props.navigation}
          graphqlQuery={ListCompanyDeliveryFees}
          graphqlQueryResultKey="listCompanyDeliveryFees"
          fetchPolicy="network-only"
          parseItemData={item => this.parseData(item)}
          onItemPress={node =>
            this.props.navigation.navigate('DeliveryDetails', {
              locations: node.locations,
              state: node.state
            })
          }
          formatData={this.groupDeliveryFees}
          emptyListText={`Adding delivery locations allow you manage the delivery fee for various customers based on their locations. \n\n To start creating delivery fees, touch the`}
          headerText="Manage Delivery Charges!"
          fabRouteName="CreateDeliveryFee"
          fabIconName="truck-delivery"
          fabIconType="MaterialCommunityIcons"
          hideSeparator={true}
        />
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
