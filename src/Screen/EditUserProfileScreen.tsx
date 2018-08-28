import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native'

import SaveCancelButton from '../Container/SaveCancelButton'
import { color } from '../Style/Color'
import { Form } from 'native-base'
import InputAtom from '../Atom/InputAtom'
import CustomHeader from '../Components/CustomHeader'
import FormImageAtom from '../Atom/FormImageAtom'
import FormContainerAtom from '../Atom/FormContainerAtom'
import FormAddressSection from '../Components/FormAddressSection'
import DatePickerAtom from '../Atom/DatePickerAtom'
import { UpdateUserGQL } from '../graphql/mutations/user'
import Auth from '../services/auth'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import PickerAtom from '../Atom/PickerAtom'
import FormErrorTextAtom from '../Atom/FormErrorTextAtom'

interface IProps {
  navigation: any
}

interface IState {
  profilePicture: string
  firstName: string
  lastName: string
  phoneType: string
  phoneNumber: string
  dateOfBirth: string
  street1: string
  city: string
  state: string
  country: string
  gender: string
  fieldErrors: any
}

class EditUserProfileScreen extends Component<IProps, IState> {
  state = {
    profilePicture: '',
    firstName: '',
    lastName: '',
    phoneType: '',
    phoneNumber: '',
    dateOfBirth: '',
    street1: '',
    city: '',
    state: '',
    country: '',
    gender: '',
    fieldErrors: null
  }

  componentWillMount() {
    this.updateDetails()
  }
  getImage = (_pic: any) => {}
  updateState = (key: string, value: any) => {
    const data = { ...this.state, [key]: value }
    this.setState(data)
  }

  updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      ...user,
      profilePicture: user.profilePicture || '',
      phoneNumber: user.phone ? user.phone.number : '',
      phoneType: user.phone ? user.phone.type : '',
      ...this.parseLocationForForm(user.location)
    })
  }

  parseLocationForForm = location => {
    if (location) {
      return location
    } else return {}
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Edit Profile"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  render() {
    const { fieldErrors } = this.state
    return (
      <Mutation mutation={UpdateUserGQL} onCompleted={this.onCompleted}>
        {(updateUser, { loading }) => (
          <View style={styles.formViewContainer}>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={60}
              style={styles.itemsContainer}
            >
              <AppSpinner visible={loading} />
              <ScrollView>
                <Form>
                  <FormImageAtom
                    form="user"
                    getValue={this.getImage}
                    source={this.state.profilePicture}
                  />
                  <FormContainerAtom headerText={'Personal Information'}>
                    <InputAtom
                      label={'First Name'}
                      required={true}
                      defaultValue={this.state.firstName}
                      getValue={val => this.updateState('firstName', val)}
                      error={fieldErrors && fieldErrors['firstName']}
                    />
                    <InputAtom
                      label={'Last Name'}
                      required={true}
                      defaultValue={this.state.lastName}
                      getValue={val => this.updateState('lastName', val)}
                      error={fieldErrors && fieldErrors['lastName']}
                    />
                    <PickerAtom
                      list={['MALE', 'FEMALE']}
                      placeholder="*Gender"
                      selected={this.state.gender.toUpperCase()}
                      handleSelection={val => this.updateState('gender', val)}
                      required={true}
                      label="Gender"
                    />
                    {fieldErrors &&
                      fieldErrors['gender'] && (
                        <FormErrorTextAtom errorText={fieldErrors['gender']} />
                      )}
                    <DatePickerAtom
                      placeholder="Date Of Birth"
                      date={this.state.dateOfBirth}
                      handleDateSelection={val =>
                        this.updateState('dateOfBirth', val)
                      }
                      label="Date of Birth"
                      required={true}
                      error={fieldErrors && fieldErrors['dateOfBirth']}
                    />
                    <InputAtom
                      label="Phone Number"
                      required={true}
                      defaultValue={this.state.phoneNumber}
                      getValue={val => this.updateState('phoneNumber', val)}
                      keyboardType="numeric"
                      error={fieldErrors && fieldErrors['number']}
                    />
                  </FormContainerAtom>
                  <FormAddressSection
                    street1={this.state.street1}
                    city={this.state.city}
                    state={this.state.state}
                    country={this.state.country}
                    fieldErrors={fieldErrors}
                    getValue={this.updateState}
                  />
                </Form>
              </ScrollView>
            </KeyboardAvoidingView>
            <SaveCancelButton
              positiveButtonName="SAVE"
              navigation={this.props.navigation}
              createfunc={() =>
                updateUser({
                  variables: this.parseMutationVariables()
                })
              }
            />
          </View>
        )}
      </Mutation>
    )
  }
  parseMutationVariables = () => {
    let params = { ...this.state }
    delete params.fieldErrors
    return params
  }
  onCompleted = async res => {
    console.log('res', res)
    const {
      updateUser: { success, fieldErrors, data }
    } = res
    if (success) {
      await Auth.setCurrentUser(data)
      this.props.navigation.goBack()
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

export default EditUserProfileScreen

const styles = StyleSheet.create({
  formViewContainer: {
    flex: 1,
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  indentLeft: {
    marginLeft: 20
  },
  indentRight: {
    marginRight: 20
  },
  mainView: {
    backgroundColor: 'transparent',
    width: '100%'
  },
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  editDetailsWrapper: {
    marginTop: 30,
    marginBottom: 10
  },
  textTitle: {
    color: color.inactive,
    fontWeight: '400',
    fontSize: 14
  },
  itemsContainer: {
    flex: 4,
    backgroundColor: '#F6F6F6'
  },
  pickerStyle: {
    width: 130,
    height: 35
  },
  headerText: {
    alignSelf: 'center',
    // marginTop: 8,
    // marginBottom: 16,
    fontSize: 14,
    color: color.button,
    fontFamily: 'SourceSansPro-Semibold'
  }
})
