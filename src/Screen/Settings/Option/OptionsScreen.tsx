import * as React from 'react'
import { Alert } from 'react-native'
import Header from '../../../Components/Header/DetailsScreenHeader'
import GenericListIndex from '../../../Components/Generic/ListIndex'
import { ListCompanyOptionsGQL } from '../../../graphql/queries/store'

interface IProps {
  navigation: any
}

export default class OptionsScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Product Variant Options"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
  }

  parseData = (item: any) => {
    return [
      {
        firstTopText: item.name,
        bottomLeftSecondText: '', //item.date
        topRightText: `` // this should be the number of products and services within this option
      }
    ]
  }

  render() {
    /**
     * TODO
     * Change empty list text
     */
    return (
      <GenericListIndex
        navigation={this.props.navigation}
        graphqlQuery={ListCompanyOptionsGQL}
        graphqlQueryResultKey="listCompanyOptions"
        parseItemData={this.parseData}
        onItemPress={item =>
          this.props.navigation.navigate('UpsertOption', { option: item })
        }
        emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLets proceed by tapping the`}
        headerText="Great habit keeping records!"
        fabRouteName="UpsertOption"
        fabIconName="package-variant"
        fabIconType="MaterialCommunityIcons"
        hideSeparator={true}
      />
    )
  }
}
