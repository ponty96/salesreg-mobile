import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Form } from "native-base";

import SaveCancelButton from "../Container/SaveCancelButton";
import EditUserProfileForm from "../Components/EditUserProfileForm";
import styles from "./../Style/Layout";

export default class EditUserProfileScreen extends Component {
  state = {
    name: "Ayo Anwakasng",
    phoneNumber: "09034567889, 08067654323",
    image:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7",
    gender: "Female"
  };

  getName = text => {
    this.setState({
      name: text
    });
  };

  getPhoneNumber = number => {
    this.setState({
      phoneNumber: number
    });
  };

  getImage = pic => {
    this.setState({
      image: pic
    });
  };

  updateGender = selectedGender => {
    this.setState({
      gender: selectedGender
    });
  };

  render() {
    return (
      <View style={styles.formViewContainer}>
        <EditUserProfileForm
          image={this.state.image}
          getImage={this.getImage}
          name={this.state.name}
          getName={this.getName}
          phoneNumber={this.state.phoneNumber}
          getPhoneNumber={this.getPhoneNumber}
          gender={this.state.gender}
          updateGender={this.state.updateGender}
        />
        <SaveCancelButton positiveButtonName="SAVE" />
      </View>
    );
  }
}
