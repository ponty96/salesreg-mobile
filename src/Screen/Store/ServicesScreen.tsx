import * as React from 'react'
import { Alert } from 'react-native'
import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'
import { ListCompanyServicesGQL } from '../../graphql/queries/store'

interface IProps {
  navigation: any
}

interface IState {
  queryText: string
}

export default class ServicesScreen extends React.Component<IProps, IState> {
  state = {
    queryText: ''
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  parseData = (item: any) => {
    const { name, price, featuredImage } = item
    return [
      {
        firstTopText: name,
        bottomLeftFirstText: '',
        bottomLeftSecondText: '', //total amount in sales
        topRightText: `\u20A6 ${price}`,
        bottomRightText: '', // show total amount in sales
        avatar: featuredImage // change to image in service
      }
    ]
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Services"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
          showSearchBar
          searchBar={{
            placeholder: 'Search for a service',
            queryText: this.state.queryText,
            onSearch: queryText => this.setState({ queryText })
          }}
        />
        <GenericListIndex
          navigation={this.props.navigation}
          graphqlQuery={ListCompanyServicesGQL}
          queryText={this.state.queryText}
          graphqlQueryResultKey="listCompanyServices"
          parseItemData={this.parseData}
          onItemPress={item =>
            this.props.navigation.navigate('ServicesDetails', { service: item })
          }
          emptyListText={`When you add services you offer, they get listed here \n\nAdd services by tapping the`}
          headerText="Add services here to start making sales"
          fabRouteName="UpsertService"
          fabIconName="basket-fill"
          fabIconType="MaterialCommunityIcons"
          hideSeparator={true}
        />
      </React.Fragment>
    )
  }
}
