import React, { Component } from 'react'

import { Form } from 'native-base'
import { Mutation } from 'react-apollo'
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import FormContainerAtom from '../Atom/FormContainerAtom'
import FormImageAtom from '../Atom/FormImageAtom'
import GoogleInputAtom from '../Atom/GoogleInputAtom'
import InputAtom from '../Atom/InputAtom'
import CustomHeader from '../Components/CustomHeader'
// import EditUserProfileForm from '../Components/EditUserProfileForm';
import AppSpinner from '../Components/Spinner'
import SaveCancelButton from '../Container/SaveCancelButton'
import { parseFieldErrors } from '../Functions'
import { EditUserProfileMutationGQL } from '../graphql/mutations/user-business'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
  phoneNumber?: string
}

// interface IState {}

class EditUserProfileScreen extends Component<IProps, any> {
  public constructor(props: IProps) {
    super(props)
    this.state = {
      image: {
        uri: 'http://downloadicons.net/sites/default/files/user-icon-2197.png'
      },
      userName: '',
      phone: '',
      email: '',
      address: '',
      userId: ''
    }
  }

  // tslint:disable-next-line:member-ordering
  public static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Edit Profile"
          // tslint:disable-next-line:jsx-no-lambda
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  public getImage = (pic: any) => {
    this.setState((prevState: any) => ({
      image: {
        ...prevState.image,
        uri: pic
      }
    }))
  }
  public updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  public render() {
    return (
      <Mutation
        mutation={EditUserProfileMutationGQL}
        onCompleted={this.onCompleted}
      >
        {(editUserProfile, { loading }) => (
          <View style={styles.formViewContainer}>
            <AppSpinner visible={loading} />
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={60}
              style={styles.itemsContainer}
            >
              <ScrollView>
                <Form>
                  <FormImageAtom
                    form="user"
                    getValue={this.getImage}
                    source={this.state.image.uri}
                  />
                  <FormContainerAtom headerText={'User ID'}>
                    <InputAtom
                      label={'User Name'}
                      defaultValue={this.state.userName}
                      // tslint:disable-next-line:jsx-no-lambda
                      getValue={val => this.updateState('name', val)}
                    />
                  </FormContainerAtom>
                  <FormContainerAtom headerText="Contact">
                    <InputAtom
                      label="Phone Number"
                      defaultValue={this.props.phoneNumber}
                      // tslint:disable-next-line:jsx-no-lambda
                      getValue={val => this.updateState('phone', val)}
                      keyboardType="numeric"
                    />
                    <InputAtom
                      label="Email Address"
                      // tslint:disable-next-line:jsx-no-lambda
                      getValue={val => this.updateState('email', val)}
                      keyboardType="email-address"
                    />
                  </FormContainerAtom>
                  <FormContainerAtom headerText="Address">
                    <GoogleInputAtom
                      label="Business Address City, State"
                      // tslint:disable-next-line:jsx-no-lambda
                      getValue={(val: string) =>
                        this.updateState('address', val)
                      }
                    />
                  </FormContainerAtom>
                </Form>
              </ScrollView>
            </KeyboardAvoidingView>

            <SaveCancelButton
              positiveButtonName="SAVE"
              navigation={this.props.navigation}
              // tslint:disable-next-line:jsx-no-lambda
              createfunc={() =>
                editUserProfile({
                  variables: this.parseMutationVariables()
                })
              }
            />
          </View>
        )}
      </Mutation>
    )
  }
  public parseMutationVariables = () => {
    return {
      phoneNumber: this.state.phone,
      email: this.state.email,
      userName: this.state.userName,
      address: this.state.address,
      profilePicture: this.state.image.uri,
      userId: this.state.userId
    }
  }
  public onCompleted = async res => {
    const {
      editUserProfile: { success, fieldErrors }
    } = res
    if (success) {
      this.props.navigation.navigate('UserProfile')
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
    fontFamily: 'SourceSansPro_Semibold'
  }
})
