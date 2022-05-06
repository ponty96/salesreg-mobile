import React from 'react'
import moment from 'moment'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'native-base'

import Header from '../../Components/Header/BaseHeader'
import GenericListIndex from '../../Components/Generic/ListIndex'
import { ListCompanyBonanzasGQL } from '../../graphql/queries/offer'

interface IProps {
  navigation: any
}

interface IState {
  queryText: string
}

export default class SpecialOfferScreen extends React.PureComponent<
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

  parseData = (item: any) => {
    const { title, endDate, coverPhoto, startDate } = item,
      _photo = coverPhoto
        ? { avatar: coverPhoto }
        : {
            icon: (
              <View style={styles.iconContainer}>
                <Icon
                  type="Ionicons"
                  name="md-calendar"
                  style={{ fontSize: 16 }}
                />
              </View>
            )
          }
    return [
      {
        firstTopText: title,
        bottomLeftFirstText: '',
        bottomLeftSecondText: '', //total amount in sales
        topRightText: `${moment(startDate).format('YYYY-MM-DD')}`,
        bottomRightText: `${moment(endDate).format('YYYY-MM-DD')}`,
        ..._photo
      }
    ]
  }

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
          graphqlQuery={ListCompanyBonanzasGQL}
          graphqlQueryResultKey="listCompanyBonanzas"
          parseItemData={this.parseData}
          onItemPress={item =>
            this.props.navigation.navigate('SpecialOfferDetails', {
              specialOffer: item
            })
          }
          emptyListText={`When you add special offers, they get listed here \nAdd special offers by tapping the`}
          headerText="All your special offers will appear here"
          fabRouteName="UpsertSpecialOffer"
          fabIconName="local-offer"
          fabIconType="MaterialIcons"
          hideSeparator={true}
        />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    height: 50,
    width: 50,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 25,
    margin: 0,
    padding: 0,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999'
  },
  icon: {
    fontSize: 18,
    color: '#fff'
  }
})
