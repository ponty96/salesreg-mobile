import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomerFormAtom from '../Atom/CustomerFormAtom';

import SaveCancelButton from '../Container/SaveCancelButton';
import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  navigation: any;
}

interface IState {}

class NewCustomerForm extends PureComponent<IProps, IState> {
  create = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <CustomerFormAtom navigation={this.props.navigation} />
        </ScrollView>
        <SaveCancelButton
          navigation={this.props.navigation}
          createfunc={this.create}
          positiveButtonName="SAVE"
        />
      </View>
    );
  }
}

export default NewCustomerForm;

const styles = StyleSheet.create({
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
