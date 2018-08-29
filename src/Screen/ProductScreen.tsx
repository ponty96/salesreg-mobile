import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import FabAtom from '../Atom/FabAtom'
import ProductList from '../Components/ProductList'
import { color } from '../Style/Color'
import { ListCompanyProductsGQL } from '../graphql/queries/product-service'
import { Query } from 'react-apollo'
import AppSpinner from '../Components/Spinner'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  business: any
}

class ProductScreen extends PureComponent<IProps, IState> {
  state = {
    business: null
  }

  componentDidMount() {
    this.updateState()
  }
  updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      business: user.company
    })
  }
  render() {
    const { business } = this.state
    return (
      <Query
        query={ListCompanyProductsGQL}
        variables={{ companyId: `${business && business.id}` }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data }) => {
          return (
            <View style={styles.container}>
              <AppSpinner visible={loading} />
              <ProductList
                items={data.listCompanyProducts}
                navigation={this.props.navigation}
              />
              <FabAtom
                routeName={'NewProduct'}
                name={'basket-fill'}
                type={'MaterialCommunityIcons'}
                navigation={this.props.navigation}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default ProductScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
