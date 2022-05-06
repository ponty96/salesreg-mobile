import * as React from 'react'

import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'

interface IProps {
  navigation: any
}

interface IState {
  queryText: string
}

export default class ProductScreen extends React.Component<IProps, IState> {
  state = {
    queryText: ''
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  parseData = (item: any) => {
    const { name, number, minimumSku, featuredImage, price } = item
    return [
      {
        firstTopText: name,
        bottomLeftFirstText: '',
        bottomLeftSecondText: '', //total amount in sales
        topRightText: `\u20A6 ${price}`,
        bottomRightText: number,
        avatar: featuredImage,
        topLeftTextStyle: parseInt(minimumSku) >= parseInt(number) && {
          color: 'red'
        }
      }
    ]
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Products"
          onPressRightIcon={() =>
            this.props.navigation.navigate('Notifications')
          }
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
          showSearchBar
          searchBar={{
            placeholder: 'Search for a product',
            queryText: this.state.queryText,
            onSearch: queryText => {
              this.setState({ queryText })
            }
          }}
        />
        <GenericListIndex
          navigation={this.props.navigation}
          queryText={this.state.queryText}
          graphqlQuery={ListCompanyProductsGQL}
          graphqlQueryResultKey="listCompanyProducts"
          parseItemData={this.parseData}
          onItemPress={item =>
            this.props.navigation.navigate('ProductDetails', { product: item })
          }
          emptyListText={`When you add products, they get listed here \nAdd products by tapping the`}
          headerText="Add products here to start making sales"
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
