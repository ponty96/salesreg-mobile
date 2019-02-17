import React from 'react'
import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'
import { ListSpecialOffersGQL } from '../../graphql/queries/offer'

interface IProps {
  navigation: any
}

interface IState {
  queryText: string
}

export default class ProductScreen extends React.PureComponent<IProps, IState> {
  state = {
    queryText: ''
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  parseData = (item: any) => {}

  render() {
    return (
      <React.Fragment>
        <Header
          title="Special Offer"
          onPressRightIcon={() => null}
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
          showSearchBar
          searchBar={{
            placeholder: 'Search for a special offer',
            queryText: this.state.queryText,
            onSearch: queryText => {
              this.setState({ queryText })
            }
          }}
        />
        <GenericListIndex
          navigation={this.props.navigation}
          queryText={this.state.queryText}
          graphqlQuery={ListSpecialOffersGQL}
          graphqlQueryResultKey="listSpecialOffers"
          parseItemData={this.parseData}
          onItemPress={item =>
            this.props.navigation.navigate('SpecialOfferDetails', {
              specialOffer: item
            })
          }
          emptyListText={`When you add products, they get listed here \nAdd products by tapping the`}
          headerText="All your special offers will appear here"
          fabRouteName="CreateProduct"
          fabIconName="package-variant"
          fabIconType="MaterialCommunityIcons"
          hideSeparator={true}
          subHeader={{
            rightLabel: sections => (sections.length > 0 ? '+Re-stock' : ''),
            onPress: sections =>
              sections.length > 0
                ? this.props.navigation.navigate('UpsertProductRestock')
                : null
          }}
        />
      </React.Fragment>
    )
  }
}
