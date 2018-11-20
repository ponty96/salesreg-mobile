import * as React from 'react'
import { Alert } from 'react-native'
import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'
import { ListCompanyServicesGQL } from '../../graphql/queries/store'

interface IProps {
  navigation: any
}

export default class ServicesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Services"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
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
      <GenericListIndex
        navigation={this.props.navigation}
        graphqlQuery={ListCompanyServicesGQL}
        graphqlQueryResultKey="listCompanyServices"
        parseItemData={this.parseData}
        onItemPress={item =>
          this.props.navigation.navigate('ServicesDetails', { service: item })
        }
        emptyListText={`When you add services you offer, they get listed here \nAdd services by tapping the`}
        headerText="Add services here to start making sales"
        fabRouteName="UpsertService"
        fabIconName="basket-fill"
        fabIconType="MaterialCommunityIcons"
        hideSeparator={true}
      />
    )
  }
}
