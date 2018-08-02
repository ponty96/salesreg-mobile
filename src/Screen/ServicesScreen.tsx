import React, { PureComponent } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'

import { Query } from 'react-apollo'
import FabAtom from '../Atom/FabAtom'
import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import AppSpinner from '../Components/Spinner'
import { ListCompanyServicesGQL } from '../graphql/queries/product-service'
import Auth from '../services/auth'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {
  business: any
}

class ServicesScreen extends PureComponent<IProps, IState> {
  public state = {
    business: null
  }

  public componentDidMount() {
    this.updateState()
  }
  public updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      business: user.company
    })
  }

  public handleTouch = service => {
    this.props.navigation.navigate('ShowService', { service })
  }

  public renderList = ({ item }: any) => {
    return (
      <ServiceListItemAtom
        name={item.name}
        amount={item.price}
        // tslint:disable-next-line:jsx-no-lambda
        onPress={() => this.handleTouch(item)}
      />
    )
  }

  public render() {
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
                name={'circle-with-plus'}
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
