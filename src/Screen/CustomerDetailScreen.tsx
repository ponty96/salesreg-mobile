import React, { PureComponent } from 'react';
import { View } from 'react-native';
import AboveCustomerDetailsAtom from '../Atom/AboveCustomerDetailsAtom';
import InnerTabAtom from '../Atom/CustomerInnerTabAtom';
import CustomHeader from '../Components/CustomHeader';

interface IProps {
  navigation?: any;
}

class CustomerDetailScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Customer"
          showRight
          rightText="Edit"
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onBackPress={() => navigation.goBack()}
          onPressRightButton={() => navigation.navigate('NewCustomer')}
        />
      )
    };
  };

  render() {
    const customer = this.props.navigation.getParam('customer');
    return (
      <View style={{ flex: 1 }}>
        <AboveCustomerDetailsAtom
          customerName={customer.customerName}
          purchaseMade={43000}
          overDue={10000}
          redText="Overdue"
          avatar={customer.image}
          customer={customer}
        />
        <InnerTabAtom screenProps={{ customer: customer }} />
      </View>
    );
  }
}

export default CustomerDetailScreen;
