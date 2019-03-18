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

export default class CustomerScreen extends React.PureComponent<
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

  onPress = customer => {
    this.props.navigation.navigate('CustomerDetails', { customer })
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
          title="Customer"
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
          onPressRightIcon={() =>
            this.props.navigation.navigate('Notifications')
          }
          showSearchBar
          searchBar={{
            placeholder: 'Search for a customer',
            queryText: this.state.queryText,
            onSearch: queryText => this.setState({ queryText })
          }}
        />
        <GenericListIndex
          navigation={this.props.navigation}
          queryText={this.state.queryText}
          variables={{ type: 'customer' }}
          graphqlQuery={CompanyContactGQL}
          graphqlQueryResultKey="companyContacts"
          parseItemData={this.parseData}
          onItemPress={this.onPress}
          emptyListText={`So close that you tell them what they need well before they realize it themselves. \n\nStart doing so by tapping`}
          headerText="Get closer than ever to your customers"
          fabRouteName="UpsertCustomer"
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
