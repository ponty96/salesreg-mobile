import React, { PureComponent } from 'react';
import { View } from 'react-native';
import CustomerFormAtom from '../Atom/CustomerFormAtom';

import SaveCancelButton from '../Container/SaveCancelButton';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../Style/OrderList';

interface IProps {
    navigation: any;
}

interface IState {

}

class NewCustomerForm extends PureComponent<IProps, IState> {
  create = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
            <CustomerFormAtom navigation={this.props.navigation}/>
        </ScrollView>
        <SaveCancelButton
          navigation={{ fakeObject: 'To stop giving errors' }}
          createfunc={this.create}
          positiveButtonName="SAVE"
        />
      </View>
    )
  }
}

export default NewCustomerForm;