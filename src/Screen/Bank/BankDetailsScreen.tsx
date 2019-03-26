import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'

import Header from '../../Components/Header/DetailsScreenHeader'
import GenericDetailsComponent from '../../Components/Generic/Details'
import { getBankName } from '../../utilities/data/picker-lists'
import { DeleteBankGQL } from '../../graphql/mutations/business'
import { ListCompanyBanksGQL } from '../../graphql/queries/business'
import { UserContext } from '../../context/UserContext'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'

interface IProps {
  navigation: any
  user?: any
  setNotificationBanner: (obj: any) => void
}

class BankDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const bank = navigation.getParam('bank', {})
    return {
      header: (
        <Header
          title="Bank Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => navigation.navigate('UpsertBank', { bank })}
        />
      )
    }
  }

  parseItems = () => {
    const bank = this.props.navigation.getParam('bank', {})
    const items = [
      {
        itemTitle: 'Account number',
        itemValue: bank.accountNumber
      },
      {
        itemTitle: 'Bank',
        itemValue: getBankName(bank.bankName)
      }
    ]
    if (bank.isPrimary) {
      return items.concat([
        {
          itemTitle: 'Primary Account',
          itemValue: ''
        }
      ])
    } else {
      return items
    }
  }

  resetNavigationStack = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home'
        }),
        NavigationActions.navigate({
          routeName: 'Banks'
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const bank = this.props.navigation.getParam('bank', {})
    return (
      <GenericDetailsComponent
        title={getBankName(bank.bankName)}
        totalAmount={bank.accountNumber}
        hideNairaSymbolInGreenCanvas={true}
        items={this.parseItems()}
        hideTotal={true}
        enableDelete={false}
        graphqlDeleteMutation={DeleteBankGQL}
        graphqlDeleteMutationResultKey="deleteBank"
        graphqlDeleteVariables={{ bankId: bank.id }}
        graphqlRefetchQueries={[
          {
            query: ListCompanyBanksGQL,
            variables: {
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        onSuccessfulDeletion={() => {
          let banner = NotificationBanner(
            configureNotificationBanner('DeleteAccount', bank)
          )
          banner.show({ bannerPosition: 'bottom' })

          this.resetNavigationStack()
        }}
      />
    )
  }
}

const _BankDetailsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <BankDetailsScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_BankDetailsScreen.navigationOptions = BankDetailsScreen.navigationOptions

export default _BankDetailsScreen
