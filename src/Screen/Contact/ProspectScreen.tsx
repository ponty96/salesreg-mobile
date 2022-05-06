import * as React from 'react'

import { CompanyContactGQL } from '../../graphql/queries/contact'
import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'

interface IProps {
  navigation: any
}

interface IState {
  queryText: string
}

export default class ProspectScreen extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    queryText: ''
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  onPress = prospect => {
    this.props.navigation.navigate('ContactDetails', {
      contact: prospect,
      type: 'prospect'
    })
  }

  parseData = (item: any) => {
    return [
      {
        firstTopText: item.contactName,
        bottomLeftFirstText: '', //item.paidTo
        bottomLeftSecondText: '', //item.date
        topRightText: `\u20A6 ${item.totalAmountPaid}`,
        bottomRightText: item.totalDebt ? `-${item.totalDebt}` : '',
        avatar:
          item.image ||
          'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
      }
    ]
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Prospect"
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
          onPressRightIcon={() =>
            this.props.navigation.navigate('Notifications')
          }
          showSearchBar
          searchBar={{
            placeholder: 'Search for a prospect',
            queryText: this.state.queryText,
            onSearch: queryText => this.setState({ queryText })
          }}
        />
        <GenericListIndex
          navigation={this.props.navigation}
          queryText={this.state.queryText}
          variables={{ type: 'prospect' }}
          graphqlQuery={CompanyContactGQL}
          graphqlQueryResultKey="companyContacts"
          fabRouteParams={{ contactType: 'prospect' }}
          parseItemData={this.parseData}
          onItemPress={this.onPress}
          emptyListText={`So close that you tell them what they need well before they realize it themselves. \n\nStart doing so by tapping`}
          headerText="Get closer than ever to your prospect"
          fabRouteName="UpsertContact"
          fabIconName="user-plus"
          fabIconType="FontAwesome"
          subHeader={{
            screen: 'order',
            rightLabel: '',
            onPress: this.subHeaderPress,
            iconName: 'user',
            iconType: 'FontAwesome'
          }}
          hideSeparator={true}
        />
      </React.Fragment>
    )
  }

  subHeaderPress = () => {}
}
