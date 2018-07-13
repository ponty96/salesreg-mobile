import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';

import SaveCancelButton from '../Container/SaveCancelButton';
import EditUserProfileForm from '../Components/EditUserProfileForm';
import { color } from '../Style/Color';
import CustomHeader from '../Components/CustomHeader';

interface IProps {
  navigation: any;
}

interface IState {
  name: string;
  phoneNumber: string;
  image: string;
  gender: string;
}

class EditUserProfileScreen extends Component<IProps, IState> {
  state = {
    name: 'Ayo Anwakasng',
    phoneNumber: '09034567889',
    image:
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
    gender: 'Female'
  };

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

  getName = (text: string) => {
    this.setState({
      name: text
    });
  };

  getPhoneNumber = (numberText: string) => {
    this.setState({
      phoneNumber: numberText
    });
  };

  getImage = (pic: string) => {
    this.setState({
      image: pic
    });
  };

  updateGender = (selectedGender: string) => {
    this.setState({
      gender: selectedGender
    });
  };

  render() {
    return (
      <View style={styles.formViewContainer}>
        <EditUserProfileForm phoneNumber={this.state.phoneNumber} />
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
