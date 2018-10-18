import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import SaveCancelButton from '../Container/SaveCancelButton'
import { color } from '../Style/Color'
import Header from '../Components/Header/BaseHeader'

import { CheckBox, Textarea } from 'native-base'
import InputAtom from '../Atom/Form/InputAtom'
import FormImageAtom from '../Atom/FormImageAtom'
import PickerAtom from '../Atom/Form/PickerAtom'
import FormContainerAtom from '../Atom/FormContainerAtom'
import FormAddressSection from '../Components/FormAddressSection'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../Functions'
import AppSpinner from '../Components/Spinner'
import { UpdateCompanyGQL } from '../graphql/mutations/business'
import Auth from '../services/auth'
import FormErrorTextAtom from '../Atom/Form/FormErrorTextAtom'
import { Container, Content, Form } from 'native-base'

interface IProps {
  navigation: any
}

interface IState {
  image: string
  about: string
  title: string
  contactEmail: string
  currency: string
  products: boolean
  services: boolean
  fieldErrors: any
  companyId: string
  street1: string
  city: string
  state: string
  country: string
}

class EditBusinessProfileScreen extends Component<IProps, IState> {
  state = {
    image:
      'https://irp-cdn.multiscreensite.com/649127fb/dms3rep/multi/mobile/ic1.png',
    about: '',
    title: '',
    contactEmail: '',
    currency: '',
    street1: '',
    city: '',
    state: '',
    country: '',
    companyId: '',
    products: false,
    services: false,
    fieldErrors: null
  }
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Edit Business Profile"
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }

  componentDidMount() {
    this.updateDetails()
  }

  parseCategoryForForm = (category = 'none') => {
    switch (category.toUpperCase()) {
      case 'PRODUCT_SERVICE':
        return { services: true, products: true }
      case 'PRODUCT':
        return { services: false, products: true }
      case 'SERVICE':
        return { services: true, products: false }
      default:
        return { services: false, products: false }
    }
  }

  parseAddressForForm = ({ branches }) => {
    console.log('branches', branches)
    const {
      location: { city, state, street1, country }
    } = branches.find(branch => branch.type == 'head_office')
    return { city, state, street1, country }
  }

  updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      companyId: user.company.id,
      title: user.company.title,
      contactEmail: user.company.contactEmail,
      about: user.company.about,
      currency: user.company.currency,
      ...this.parseCategoryForForm(user.company.category),
      ...this.parseAddressForForm(user.company)
    })
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  flipCheckedState = (oldState: boolean, key: string) => {
    if (key === 'products') this.updateState('products', !oldState)
    else this.updateState('services', !oldState)
  }

  getImage = image => {
    console.log('image', image)
  }

  render() {
    const { fieldErrors } = this.state
    return (
      <Mutation mutation={UpdateCompanyGQL} onCompleted={this.onCompleted}>
        {(updateCompany, { loading }) => (
          <Container>
            <Content>
              <Form>
                <AppSpinner visible={loading} />
                <FormImageAtom
                  form="business"
                  getValue={this.getImage}
                  source={this.state.image}
                />
                <FormContainerAtom headerText={'Business Info'}>
                  <InputAtom
                    label={'Business Name'}
                    defaultValue={this.state.title}
                    getValue={val => this.updateState('title', val)}
                    error={fieldErrors && fieldErrors['title']}
                    placeholder="Enter the Name of your Business"
                  />
                  <InputAtom
                    label="Email Address"
                    defaultValue={this.state.contactEmail}
                    getValue={val => this.updateState('contactEmail', val)}
                    keyboardType="email-address"
                    error={fieldErrors && fieldErrors['contactEmail']}
                    placeholder="Enter the your business email"
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
                <FormContainerAtom headerText="What are you selling?">
                  <View style={styles.checkView}>
                    <CheckBox
                      checked={this.state.products}
                      onPress={() => {
                        this.flipCheckedState(this.state.products, 'products')
                      }}
                      color={color.selling}
                      style={styles.checkBox}
                    />
                    <Text style={styles.checkText}>
                      Products (Traders, manufacturers, producers)
                    </Text>
                  </View>
                  <View style={styles.checkView}>
                    <CheckBox
                      checked={this.state.services}
                      onPress={() => {
                        this.flipCheckedState(this.state.services, 'services')
                      }}
                      color={color.selling}
                      style={styles.checkBox}
                    />
                    <Text style={styles.checkText}>
                      Services(Service providers)
                    </Text>
                  </View>
                </FormContainerAtom>
                <FormContainerAtom headerText="Transaction currency">
                  <PickerAtom
                    list={['Naira(₦)']}
                    width="100%"
                    placeholder="Select Currency"
                    selected={this.state.currency}
                    handleSelection={currency =>
                      this.updateState('currency', currency)
                    }
                    pickerStyle={{ marginTop: 8 }}
                  />
                  {fieldErrors &&
                    fieldErrors['currency'] && (
                      <FormErrorTextAtom errorText={fieldErrors['currency']} />
                    )}
                </FormContainerAtom>
                <FormContainerAtom headerText="Description">
                  <Textarea
                    rowSpan={5}
                    placeholder="Description"
                    placeholderTextColor={color.inactive}
                    defaultValue={this.state.about}
                    onChangeText={val => this.updateState('about', val)}
                  />
                  {fieldErrors &&
                    fieldErrors['about'] && (
                      <FormErrorTextAtom errorText={fieldErrors['about']} />
                    )}
                </FormContainerAtom>
                <SaveCancelButton
                  positiveButtonName="SAVE"
                  navigation={this.props.navigation}
                  createfunc={() =>
                    updateCompany({
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
  parseCategoryForMutation = (products, services) => {
    if (products && services) {
      return 'PRODUCT_SERVICE'
    } else if (products) {
      return 'PRODUCT'
    } else if (services) {
      return 'SERVICE'
    }
    return 'PRODUCT_SERVICE'
  }

  parseMutationVariables = () => {
    const { products, services } = this.state
    let variables = { ...this.state }
    delete variables.products
    delete variables.services
    delete variables.fieldErrors
    return {
      ...variables,
      category: this.parseCategoryForMutation(products, services)
    }
  }

  onCompleted = async res => {
    const {
      updateCompany: { success, fieldErrors, data }
    } = res
    if (success) {
      const user = JSON.parse(await Auth.getCurrentUser())
      const updatedUser = { ...user, company: data }
      await Auth.setCurrentUser(updatedUser)
      this.props.navigation.navigate('BusinessProfile')
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

export default EditBusinessProfileScreen

const styles = StyleSheet.create({
  checkBox: {
    left: 0,
    borderWidth: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    marginLeft: 0
  },
  checkText: {
    paddingLeft: 16,
    color: color.principal
  },
  checkView: {
    flexDirection: 'row',
    margin: 8
  }
})
