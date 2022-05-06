import React, { Component } from 'react'
import { View, StyleSheet, Share } from 'react-native'
import moment from 'moment'

import GenericProfileDetails from '../../Components/Generic/ProfileDetails'
import Header from '../../Components/Header/DetailsScreenHeader'
import { UserContext } from '../../context/UserContext'
import { color } from '../../Style/Color'
import FabAtom from '../../Atom/FabAtom'
import { numberWithCommas } from '../../Functions/numberWithCommas';

interface IProps {
  navigation: any
  user?: any
  specialOffer?: any
}

class SpecialOfferDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const specialOffer = navigation.getParam('specialOffer', {})

    return {
      header: (
        <Header
          title={`${specialOffer.title}`}
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertSpecialOffer', { specialOffer })
          }
        />
      )
    }
  }

  getOfferDetails = () => {
    const specialOffer = this.props.navigation.getParam('specialOffer', {})

    return [
      {
        section: 'Start Date',
        value: moment(specialOffer.startDate).format('YYYY-MM-DD') || ''
      },
      {
        section: 'End Date',
        value: moment(specialOffer.endDate).format('YYYY-MM-DD') || ''
      }
    ].concat(
      specialOffer.bonanzaItems.map(item => ({
        section: item.product.name,
        value: `\u20A6 ${numberWithCommas(item.priceSlashTo)}(${
          item.maxQuantity
          })`
      }))
    )
  }

  onShare = async () => {
    const specialOffer = this.props.navigation.getParam('specialOffer', {})
    try {
      const result: any = await Share.share(
        {
          title: specialOffer.title,
          message: `Save BIG on ${specialOffer.shareLink} with ${
            this.props.user.company.title
            }`,
          url: `${specialOffer.shareLink}`
        },
        { dialogTitle: specialOffer.title }
      )

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      //@An error occurred while sharing
    }
  }

  render() {
    const specialOffer = this.props.navigation.getParam('specialOffer', {})

    return (
      <View style={styles.container}>
        <GenericProfileDetails
          sections={this.getOfferDetails()}
          image={specialOffer.coverPhoto}
          headerText={specialOffer.title}
          imageCategory="event"
          enableDelete={false}
        />
        <FabAtom onPress={this.onShare} name="share" type="MaterialIcons" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  invoicebuttomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 70,
    paddingRight: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bdbdbd',
    backgroundColor: '#fff'
  },
  invoiceText: {
    fontSize: 16,
    color: color.button,
    fontFamily: 'AvenirNext-Regular'
  },
  invoiceIcon: {
    fontSize: 35,
    color: color.button
  }
})

const _SpecialOfferDetailsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <SpecialOfferDetailsScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_SpecialOfferDetailsScreen.navigationOptions =
  SpecialOfferDetailsScreen.navigationOptions

export default _SpecialOfferDetailsScreen
