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
    const { name, price } = item
    return [
      {
        firstTopText: name,
        bottomLeftFirstText: '',
        bottomLeftSecondText: '', //total amount in sales
        topRightText: `\u20A6 ${price}`,
        bottomRightText: '', // show total amount in sales
        avatar:
          'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7' // change to image in service
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
        emptyListText={`When you add products, they get listed here \nAdd products by tapping the`}
        headerText="Add products here to start making sales"
        fabRouteName="UpsertServices"
        fabIconName="basket-fill"
        fabIconType="MaterialCommunityIcons"
        hideSeparator={true}
      />
    )
  }
}
