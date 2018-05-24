import React, { Component } from 'react'
import { View } from 'react-native'

import SaveCancelButton from '../Container/SaveCancelButton'
import EditUserProfileForm from '../Components/EditUserProfileForm'
import styles from './../Style/Layout'

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
    phoneNumber: '09034567889, 08067654323',
    image:
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
    gender: 'Female'
  }

  getName = (text: string) => {
    this.setState({
      name: text
    })
  }

  getPhoneNumber = (numberText: string) => {
    this.setState({
      phoneNumber: numberText
    })
  }

  getImage = (pic: string) => {
    this.setState({
      image: pic
    })
  }

  updateGender = (selectedGender: string) => {
    this.setState({
      gender: selectedGender
    })
  }

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
          updateGender={this.updateGender}
        />
        <SaveCancelButton positiveButtonName="SAVE" navigation={this.props.navigation}/>
      </View>
    )
  }
}

export default EditUserProfileScreen;
