import * as React from 'react'
import { Alert } from 'react-native'
import { Mutation } from 'react-apollo'
import { ActionSheet } from 'native-base'
import Header from '../../../Components/Header/DetailsScreenHeader'
import GenericListIndex from '../../../Components/Generic/ListIndex'
import AppSpinner from '../../../Components/Spinner'
import { ListCompanyCategoriesGQL } from '../../../graphql/queries/store'
import { DeleteCategoryGQL } from '../../../graphql/mutations/store'

var BUTTONS = ['No', 'Yes, delete', 'Cancel']
var DESTRUCTIVE_INDEX = 1
var CANCEL_INDEX = 2

interface IProps {
  navigation: any
}

export default class CategoriesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Categories"
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
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
              if (buttonIndex == 1) {
                deleteCategory({ variables: { categoryId: item.id } })
              }
            }
          )
        }
      }
    ]
  }

  onCompleted = async res => {
    let {
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
    }
  }

  render() {
    return (
      <Mutation
        mutation={DeleteCategoryGQL}
        refetchQueries={ListCompanyCategoriesGQL}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(deleteCategory, { loading }) => (
          <React.Fragment>
            <AppSpinner visible={loading} />
            <GenericListIndex
              navigation={this.props.navigation}
              graphqlQuery={ListCompanyCategoriesGQL}
              graphqlQueryResultKey="listCompanyCategories"
              parseItemData={item => this.parseData(item, deleteCategory)}
              onItemPress={item =>
                this.props.navigation.navigate('UpsertCategory', {
                  category: item
                })
              }
              emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLets proceed by tapping the`}
              headerText="Great habit keeping records!"
              fabRouteName="UpsertCategory"
              fabIconName="apps"
              fabIconType="MaterialCommunityIcons"
              hideSeparator={true}
            />
          </React.Fragment>
        )}
      </Mutation>
    )
  }
}
