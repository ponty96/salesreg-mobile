import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'

import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import { color } from '../Style/Color'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import FabAtom from '../Atom/FabAtom'
import { ListCompanyServicesGQL } from '../graphql/queries/store'
import { Query } from 'react-apollo'
import AppSpinner from '../Components/Spinner'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  business: any
}

class ServicesScreen extends PureComponent<IProps, IState> {
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

  handleTouch = service => {
    this.props.navigation.navigate('ShowService', { service })
  }

  renderList = ({ item }: any) => {
    return (
      <ServiceListItemAtom
        name={item.name}
        amount={item.price}
        onPress={() => this.handleTouch(item)}
      />
    )
  }

  render() {
    const { business } = this.state
    return (
      <Query
        query={ListCompanyServicesGQL}
        variables={{ companyId: `${business && business.id}` }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data }) => {
          return (
            <View style={styles.container}>
              <AppSpinner visible={loading} />
              <SubHeaderAtom
                list={[
                  'Fastest selling',
                  'Slowest selling',
                  'Highest profit',
                  'Lowest profit'
                ]}
                image={require('../../assets/Icons/subheader-icons/product-blue.png')}
                total={
                  data.listCompanyServices ? data.listCompanyServices.length : 0
                }
              />
              <ScrollView>
                <FlatList
                  data={data.listCompanyServices}
                  renderItem={this.renderList}
                />
              </ScrollView>
              <FabAtom
                routeName={'EditServices'}
                name={'plus'}
                type={'Entypo'}
                navigation={this.props.navigation}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default ServicesScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
