import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import VendorFormAtom from '../Atom/VendorFormAtom';

import SaveCancelButton from '../Container/SaveCancelButton';
import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  navigation: any;
}

interface IState {}

class VendorForm extends PureComponent<IProps, IState> {
  create = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <VendorFormAtom navigation={this.props.navigation} />
        </ScrollView>
        <SaveCancelButton
          navigation={this.props.navigation}
          createfunc={this.create}
          positiveButtonName="DONE"
        />
      </View>
    );
  }
}

export default VendorForm;

const styles = StyleSheet.create({
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
