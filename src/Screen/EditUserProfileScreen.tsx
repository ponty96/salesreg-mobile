import React, { Component } from 'react'
import SaveCancelButton from '../Container/SaveCancelButton'
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
import { Container, Content, Form } from 'native-base'

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
          <Container>
            <Content>
              <Form>
                <AppSpinner visible={loading} />
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
                <SaveCancelButton
                  positiveButtonName="SAVE"
                  navigation={this.props.navigation}
                  createfunc={() =>
                    updateUser({
                      variables: this.parseMutationVariables()
                    })
                  }
                />
              </Form>
            </Content>
          </Container>
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
