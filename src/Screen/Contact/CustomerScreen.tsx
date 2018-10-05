import * as React from 'react'
import { CompanyContactGQL } from '../../graphql/queries/contact'
import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'

interface IProps {
  navigation: any
}

export default class CustomerScreen extends React.PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Customer"
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
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
        topRightText: `\u20A6 10,000`,
        bottomRightText: `-100,000`,
        avatar: item.image
      }
    ]
  }

  render() {
    return (
      <GenericListIndex
        navigation={this.props.navigation}
        variables={{ type: 'customer' }}
        graphqlQuery={CompanyContactGQL}
        graphqlQueryResultKey="companyContacts"
        parseItemData={this.parseData}
        onItemPress={this.onPress}
        emptyListText={``}
        headerText="All customers will be listed here"
        fabRouteName="UpsertCustomer"
        fabIconName="md-person-add"
        fabIconType="Ionicons"
        subHeader={{
          screen: 'order',
          rightLabel: '',
          onPress: this.subHeaderPress,
          iconName: 'md-person'
        }}
        hideSeparator={true}
      />
    )
  }

  subHeaderPress = () => {}
}
