import * as React from 'react'
import { Alert } from 'react-native'
import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'

interface IProps {
  navigation: any
}

export default class ProductScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Products"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
          showSearchBar
        />
      )
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
      <GenericListIndex
        navigation={this.props.navigation}
        graphqlQuery={ListCompanyProductsGQL}
        graphqlQueryResultKey="listCompanyProducts"
        parseItemData={this.parseData}
        onItemPress={item =>
          this.props.navigation.navigate('ProductDetails', { product: item })
        }
        emptyListText={`When you add products, they get listed here \nAdd products by tapping the`}
        headerText="Add products here to start making sales"
        fabRouteName="CreateProduct"
        fabIconName="basket-fill"
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
    )
  }
}
