import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Icon } from 'native-base'

import SaveCancelButton from '../Container/SaveCancelButton'
import EditBusinessProfileForm from '../Components/EditBusinessProfileForm'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {
  name: string
  phoneNumber: string
  image: string
  gender: string
}

class EditBusinessProfileScreen extends Component<IProps, IState> {
  state = {
    name: 'Ayo Anwakasng',
    phoneNumber: '09034567889',
    image:
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
    gender: 'Female'
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: (
        <Text style={[{ fontFamily: 'SourceSansPro' }]}>Edit Profile</Text>
      ), // params.name
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      )
    }
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
        <EditBusinessProfileForm
          image={this.state.image}
          getImage={this.getImage}
          name={this.state.name}
          getName={this.getName}
          phoneNumber={this.state.phoneNumber}
          getPhoneNumber={this.getPhoneNumber}
          gender={this.state.gender}
          updateGender={this.updateGender}
        />
        <SaveCancelButton
          positiveButtonName="SAVE"
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

export default EditBusinessProfileScreen

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
})
