import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import SaveCancelButton from '../Container/SaveCancelButton';
import EditBusinessProfileForm from '../Components/EditBusinessProfileForm';
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

class EditBusinessProfileScreen extends Component<IProps, IState> {
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
          title="Edit Business Profile"
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
        <EditBusinessProfileForm />
        <SaveCancelButton
          positiveButtonName="SAVE"
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default EditBusinessProfileScreen;

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
