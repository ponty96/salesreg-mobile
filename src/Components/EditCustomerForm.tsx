import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import EditCustomerAtom from '../Atom/EditCustomerAtom';
import styles from '../Style/OrderList';
import SaveCancelButton from '../Container/SaveCancelButton';

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
            <EditCustomerAtom navigation={this.props.navigation} customerName={'Ayo'}/>
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