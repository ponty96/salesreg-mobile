import * as React from 'react'
import { Alert } from 'react-native'
import { Mutation } from 'react-apollo'
import { ActionSheet } from 'native-base'
import Header from '../../../Components/Header/DetailsScreenHeader'
import GenericListIndex from '../../../Components/Generic/ListIndex'
import AppSpinner from '../../../Components/Spinner'
import { ListCompanyCategoriesGQL } from '../../../graphql/queries/store'
import { DeleteCategoryGQL } from '../../../graphql/mutations/store'

let BUTTONS = ['Yes, delete', 'Cancel']
let DESTRUCTIVE_INDEX = 0
let CANCEL_INDEX = 1

interface IProps {
  navigation: any
}

interface IState {
  forceUpdateId: number
  queryText: string
}

export default class CategoriesScreen extends React.Component<IProps, IState> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  state = {
    forceUpdateId: Date.now(),
    queryText: ''
  }

  parseData = (item: any, deleteCategory: (obj: any) => void) => {
    return [
      {
        firstTopText: item.title,
        bottomLeftFirstText: item.description
          ? `${item.description.substr(0, 40)}...`
          : '', // item.paidTo
        bottomLeftSecondText: '', // item.date
        topRightText: ``, // this should be the number of products and services within this category
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
                deleteCategory({ variables: { categoryId: item.id } })
              }
            }
          )
        }
      }
    ]
  }

  onCompleted = async res => {
    const {
      deleteCategory: { success, fieldErrors }
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
      this.setState({
        forceUpdateId: Date.now()
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Categories"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => this.props.navigation.goBack()}
          hideRightMenu={true}
          showSearchBar
          searchBar={{
            placeholder: 'Search for a category',
            onSearch: queryText => this.setState({ queryText })
          }}
        />
        <Mutation
          mutation={DeleteCategoryGQL}
          refetchQueries={ListCompanyCategoriesGQL}
          awaitRefetchQueries={true}
          onCompleted={this.onCompleted}
        >
          {(deleteCategory, { loading }) => {
            return (
              <React.Fragment>
                <AppSpinner visible={loading} />
                <GenericListIndex
                  forceUpdateID={this.state.forceUpdateId}
                  navigation={this.props.navigation}
                  queryText={this.state.queryText}
                  graphqlQuery={ListCompanyCategoriesGQL}
                  graphqlQueryResultKey="listCompanyCategories"
                  parseItemData={item => this.parseData(item, deleteCategory)}
                  onItemPress={item =>
                    this.props.navigation.navigate('UpsertCategory', {
                      category: item
                    })
                  }
                  emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLet's proceed by tapping the`}
                  headerText="Great habit keeping records!"
                  fabRouteName="UpsertCategory"
                  fabIconName="apps"
                  fabIconType="MaterialCommunityIcons"
                  hideSeparator={true}
                />
              </React.Fragment>
            )
          }}
        </Mutation>
      </React.Fragment>
    )
  }
}
