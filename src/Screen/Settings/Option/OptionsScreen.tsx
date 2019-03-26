import * as React from 'react'
import { Alert } from 'react-native'
import { Mutation } from 'react-apollo'
import { ActionSheet } from 'native-base'

import Header from '../../../Components/Header/DetailsScreenHeader'
import GenericListIndex from '../../../Components/Generic/ListIndex'
import { ListCompanyOptionsGQL } from '../../../graphql/queries/store'
import { DeleteOptionGQL } from '../../../graphql/mutations/store'
import AppSpinner from '../../../Components/Spinner'
import { NotificationBanner } from '../../../Components/NotificationBanner'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'

let BUTTONS = ['Yes, delete', 'Cancel']
let DESTRUCTIVE_INDEX = 1
let CANCEL_INDEX = 2

interface IProps {
  navigation: any
  setNotificationBanner: (obj: any) => void
}

interface IState {
  forceUpdateId: number
  queryText: string
  optionNameToDelete: string
}

class OptionsScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    forceUpdateId: Date.now(),
    queryText: '',
    optionNameToDelete: ''
  }

  parseData = (item: any, deleteOption: (obj: any) => void) => {
    return [
      {
        firstTopText: item.name,
        bottomLeftSecondText: '', // item.date
        topRightText: ``, // this should be the number of products and services within this option
        showTrash: true,
        onPressTrash: () => {
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: 'Delete?'
            },
            buttonIndex => {
              if (buttonIndex == 0) {
                this.setState(
                  {
                    optionNameToDelete: item.name
                  },
                  () => {
                    deleteOption({ variables: { optionId: item.id } })
                  }
                )
              }
            }
          )
        }
      }
    ]
  }

  onCompleted = async res => {
    const {
      deleteOption: { success, fieldErrors }
    } = res

    if (!success) {
      setTimeout(
        () =>
          Alert.alert(
            'Error',
            fieldErrors[0].message,
            [{ text: 'Ok', onPress: () => null }],
            { cancelable: false }
          ),
        100
      )
    } else {
      let banner = NotificationBanner(
        configureNotificationBanner(
          'DeleteOption',
          this.state.optionNameToDelete
        )
      )
      banner.show({ bannerPosition: 'bottom' })

      this.setState({
        forceUpdateId: Date.now()
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Product Variant Options"
          onPressRightIcon={() =>
            this.props.navigation.navigate('Notifications')
          }
          onPressLeftIcon={() => this.props.navigation.goBack()}
          hideRightMenu={true}
          showSearchBar
          searchBar={{
            placeholder: 'Search for a variant option',
            queryText: this.state.queryText,
            onSearch: queryText => this.setState({ queryText })
          }}
        />
        <Mutation
          mutation={DeleteOptionGQL}
          refetchQueries={ListCompanyOptionsGQL}
          awaitRefetchQueries={true}
          onCompleted={this.onCompleted}
        >
          {(deleteOption, { loading }) => (
            <React.Fragment>
              <AppSpinner visible={loading} />
              <GenericListIndex
                forceUpdateID={this.state.forceUpdateId}
                navigation={this.props.navigation}
                graphqlQuery={ListCompanyOptionsGQL}
                queryText={this.state.queryText}
                graphqlQueryResultKey="listCompanyOptions"
                parseItemData={item => this.parseData(item, deleteOption)}
                onItemPress={item =>
                  this.props.navigation.navigate('UpsertOption', {
                    option: item
                  })
                }
                emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLet's proceed by tapping the`}
                headerText="Great habit keeping records!"
                fabRouteName="UpsertOption"
                fabIconName="package-variant"
                fabIconType="MaterialCommunityIcons"
                hideSeparator={true}
              />
            </React.Fragment>
          )}
        </Mutation>
      </React.Fragment>
    )
  }
}

export default OptionsScreen
