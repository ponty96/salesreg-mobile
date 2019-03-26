import React from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { Icon } from 'native-base'
import { Mutation } from 'react-apollo'

import Header from '../../../Components/Header/DetailsScreenHeader'
import { GreenCanvas } from '../../../Atom/GreenCanvas'
import { color } from '../../../Style/Color'
import ExpandableListItemAtom from '../../../Atom/ListItem/ExpandableListItemAtom'
import SubHeaderAtom from '../../../Components/Header/SubHeaderAtom'
import { DeleteCategoryGQL } from '../../../graphql/mutations/store'
import { ListCompanyCategoriesGQL } from '../../../graphql/queries/store'
import { UserContext } from '../../../context/UserContext'
import AppSpinner from '../../../Components/Spinner'

interface IProps {
  navigation: any
  user?: any
}

class CategoryDetailsScreen extends React.PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const category = navigation.getParam('category', {})
    return {
      header: (
        <Header
          title="Category Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertCategory', { category })
          }
        />
      )
    }
  }

  getAssociatedItemsCount = () => {
    const category = this.props.navigation.getParam('category', {})
    const { products = [], services = [] } = category
    return products.length + services.length
  }

  onDeleteCompleted = async res => {
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
      this.props.navigation.navigate('Categories')
    }
  }

  render() {
    const category = this.props.navigation.getParam('category', {})
    return (
      <Mutation
        mutation={DeleteCategoryGQL}
        onCompleted={this.onDeleteCompleted}
        refetchQueries={[
          {
            query: ListCompanyCategoriesGQL,
            variables: {
              companyId: this.props.user.company.id,
              after: null,
              first: 10
            }
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(deleteCategory, { loading }) => {
          return (
            <React.Fragment>
              <AppSpinner visible={loading} />
              <View style={styles.container}>
                <GreenCanvas title={category.title} />
                <SubHeaderAtom
                  total={this.getAssociatedItemsCount()}
                  screen={'Category'}
                  rightLabel="View Associated Products & Services"
                  onPressArrow={() =>
                    this.props.navigation.navigate('CategoryAssociations', {
                      category
                    })
                  }
                  iconName="md-apps"
                />
                <ExpandableListItemAtom
                  section="Title"
                  value={category.title}
                />
                <ExpandableListItemAtom
                  section="Description"
                  value={category.description ? [category.description] : null}
                />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                  }}
                  onPress={() =>
                    deleteCategory({ variables: { categoryId: category.id } })
                  }
                >
                  <Icon
                    type="EvilIcons"
                    name="trash"
                    style={{ color: color.textBorderBottom, fontSize: 60 }}
                  />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )
        }}
      </Mutation>
    )
  }
}

const _CategoryDetailsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <CategoryDetailsScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_CategoryDetailsScreen.navigationOptions =
  CategoryDetailsScreen.navigationOptions

export default _CategoryDetailsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  listLabel: {
    color: color.textColor,
    marginLeft: 2,
    fontFamily: 'AvenirNext-Regular'
  },
  listWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingRight: 24
  },
  greenText: {
    color: color.selling,
    fontFamily: 'AvenirNext-Regular'
  }
})
