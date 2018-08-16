import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import FabAtom from '../Atom/FabAtom';
import ContactList from '../Components/ContactList';
import { color } from '../Style/Color';
import CustomHeader from '../Components/CustomHeader';

import { CompanyCustomersGQL } from '../graphql/queries/contact';
import { Query } from 'react-apollo';
import AppSpinner from '../Components/Spinner';
import Auth from '../services/auth';

interface IProps {
  navigation: any;
}

interface IState {
  companyId: string;
}

class CustomerScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Customer"
          showMenu
          showRight
          firstRightIcon="ios-search"
          rightText=" "
          onMenuPress={() => navigation.navigate('DrawerToggle')}
        />
      )
    };
  };

  state = {
    companyId: ''
  };

  onPress = customer => {
    this.props.navigation.navigate('CustomerDetails', { customer });
  };

  componentDidMount() {
    this.updateState();
  }
  updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser());
    this.setState({
      companyId: user.company.id
    });
  };

  render() {
    return (
      <Query
        query={CompanyCustomersGQL}
        variables={{ companyId: this.state.companyId }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data }) => (
          <View style={styles.centerContainer}>
            <AppSpinner visible={loading} />
            <ContactList
              items={data.companyCustomers || []}
              onPress={this.onPress}
              screenType="customer"
            />
            <FabAtom
              routeName={'NewCustomer'}
              name={'md-person-add'}
              navigation={this.props.navigation}
            />
          </View>
        )}
      </Query>
    );
  }
}

export default CustomerScreen;

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
});
