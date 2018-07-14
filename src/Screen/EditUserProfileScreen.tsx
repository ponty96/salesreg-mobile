import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import SaveCancelButton from '../Container/SaveCancelButton';
import EditUserProfileForm from '../Components/EditUserProfileForm';
import { color } from '../Style/Color';
import CustomHeader from '../Components/CustomHeader';

interface IProps {
  navigation: any;
}

interface IState {}

class EditUserProfileScreen extends Component<IProps, IState> {
  state = {};

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Edit Profile"
          onBackPress={() => navigation.goBack()}
        />
      )
    };
  };

  render() {
    return (
      <View style={styles.formViewContainer}>
        <EditUserProfileForm phoneNumber="" />
        <SaveCancelButton
          positiveButtonName="SAVE"
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default EditUserProfileScreen;

const styles = StyleSheet.create({
  formViewContainer: {
    flex: 1,
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
});
