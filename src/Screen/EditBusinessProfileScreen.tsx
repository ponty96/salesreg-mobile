import { CheckBox, Textarea } from 'native-base'
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import FormContainerAtom from '../Atom/FormContainerAtom'
import FormImageAtom from '../Atom/FormImageAtom'
import GoogleInputAtom from '../Atom/GoogleInputAtom'
import InputAtom from '../Atom/InputAtom'
import PickerAtom from '../Atom/PickerAtom'
import CustomHeader from '../Components/CustomHeader'
// import EditBusinessProfileForm from '../Components/EditBusinessProfileForm'
import AppSpinner from '../Components/Spinner'
import SaveCancelButton from '../Container/SaveCancelButton'
import { parseFieldErrors } from '../Functions'
import { EditBusinessProfileMutationGQL } from '../graphql/mutations/user-business'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

class EditBusinessProfileScreen extends Component<IProps, any> {
  public constructor(props: IProps) {
    super(props)
    this.state = {
      image: {
        uri:
          'https://irp-cdn.multiscreensite.com/649127fb/dms3rep/multi/mobile/ic1.png'
      },
      businessName: '',
      check1: true,
      check2: true,
      email: '',
      description: '',
      address: ''
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
  public checked1 = () => {
    this.setState({
      check1: !this.state.check1
    })
  }
  public checked2 = () => {
    this.setState({
      check2: !this.state.check2
    })
  }
  public updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  // tslint:disable-next-line:member-ordering
  public static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Edit Business Profile"
          // tslint:disable-next-line:jsx-no-lambda
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  public getName = (text: string) => {
    this.setState({
      name: text
    })
  }

  public getPhoneNumber = (numberText: string) => {
    this.setState({
      phoneNumber: numberText
    })
  }

  public updateGender = (selectedGender: string) => {
    this.setState({
      gender: selectedGender
    })
  }

  public render() {
    return (
      <Mutation
        mutation={EditBusinessProfileMutationGQL}
        onCompleted={this.onCompleted}
      >
        {(editBusinessProfile, { loading }) => (
          <View style={styles.formViewContainer}>
            <AppSpinner visible={loading} />
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={60}
              style={styles.itemsContainer}
            >
              <ScrollView>
                <FormImageAtom
                  form="business"
                  getValue={this.getImage}
                  source={this.state.image.uri}
                />
                <FormContainerAtom headerText={'Business ID'}>
                  <InputAtom
                    label={'Business Name'}
                    defaultValue={this.state.businessName}
                    // tslint:disable-next-line:jsx-no-lambda
                    getValue={val => this.updateState('buinessName', val)}
                  />
                </FormContainerAtom>
                <FormContainerAtom headerText="Contact Address">
                  <InputAtom
                    label="Email Address"
                    // tslint:disable-next-line:jsx-no-lambda
                    getValue={val => this.updateState('email', val)}
                    keyboardType="email-address"
                  />
                  <GoogleInputAtom
                    label="Address City, State"
                    // tslint:disable-next-line:jsx-no-lambda
                    getValue={(val: string) => this.updateState('address', val)}
                  />
                </FormContainerAtom>
                <FormContainerAtom headerText="What are you selling?">
                  <View style={styles.checkView}>
                    <CheckBox
                      checked={this.state.check1}
                      color={color.selling}
                      onPress={this.checked1}
                      style={styles.checkBox}
                    />
                    <Text style={styles.checkText}>
                      Products (Traders, manufacturers, producers)
                    </Text>
                  </View>
                  <View style={styles.checkView}>
                    <CheckBox
                      checked={this.state.check2}
                      color={color.selling}
                      onPress={this.checked2}
                      style={styles.checkBox}
                    />
                    <Text style={styles.checkText}>Services</Text>
                  </View>
                </FormContainerAtom>
                <FormContainerAtom headerText="Transaction currency">
                  <View style={[styles.bottomBorder, { padding: 10 }]}>
                    <PickerAtom
                      list={['Naira (\u20A6)']}
                      style={styles.pickerStyle}
                      placeholder="Select Currency"
                    />
                  </View>
                </FormContainerAtom>
                <FormContainerAtom headerText="Description">
                  <View style={styles.bottomBorder}>
                    <Textarea
                      rowSpan={5}
                      placeholder="Description"
                      placeholderTextColor={color.inactive}
                      // tslint:disable-next-line:jsx-no-lambda
                      onChangeText={val => this.updateState('description', val)}
                    />
                  </View>
                </FormContainerAtom>
              </ScrollView>
            </KeyboardAvoidingView>
            <SaveCancelButton
              positiveButtonName="SAVE"
              navigation={this.props.navigation}
              // tslint:disable-next-line:jsx-no-lambda
              createfunc={() =>
                editBusinessProfile({
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
      businessName: this.state.businessName,
      description: this.state.description,
      check: this.state.check1 + ' ' + this.state.check2,
      address: this.state.address,
      profilePicture: this.state.image.uri,
      companyId: this.state.companyId
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
  },
  indentLeft: {
    marginLeft: 20
  },
  indentRight: {
    marginRight: 20
  },
  checkBox: {
    left: 0,
    borderWidth: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    marginLeft: 0
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
    width: '100%',
    height: 35
  },
  checkText: {
    paddingLeft: 16,
    color: color.principal
  },
  checkView: {
    flexDirection: 'row',
    margin: 8
  },
  bottomBorder: {
    borderBottomColor: color.list,
    borderBottomWidth: 1,
    marginLeft: 3,
    marginRight: 3
  }
})
