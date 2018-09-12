import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import FabAtom from '../../Atom/FabAtom'
import ContactList from '../../Components/Contact/ContactList'
import { color } from '../../Style/Color'
import Header from '../../Components/Header/BaseHeader'

import { CompanyContactGQL } from '../../graphql/queries/contact'
import { Query } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import Auth from '../../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  companyId: string
}

class VendorScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Vendor"
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
    }
  }

  state = {
    companyId: ''
  }

  onPress = vendor => {
    this.props.navigation.navigate('VendorDetails', { vendor })
  }

  componentDidMount() {
    this.updateState()
  }
  updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      companyId: user.company.id
    })
  }

  render() {
    return (
      <Query
        query={CompanyContactGQL}
        variables={{ companyId: this.state.companyId, type: 'vendor' }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data }) => (
          <View style={styles.centerContainer}>
            <AppSpinner visible={loading} />
            <ContactList
              items={data.companyContacts || []}
              onPress={this.onPress}
              screenType="vendor"
            />
            <FabAtom
              routeName={'UpsertVendor'}
              name={'md-person-add'}
              navigation={this.props.navigation}
            />
          </View>
        )}
      </Query>
    )
  }
}

export default VendorScreen

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
