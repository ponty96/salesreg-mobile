import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { color } from '../Style/Color'
import Header from '../Components/Header/BaseHeader'
import SaveCancelButton from '../Container/SaveCancelButton'
import InputAtom from '../Atom/InputAtom'

import { Mutation } from 'react-apollo'
import { UpsertServiceGQL } from '../graphql/mutations/product-service'
import AppSpinner from '../Components/Spinner'
import Auth from '../services/auth'
import { parseFieldErrors } from '../Functions'
import { Container, Content, Form } from 'native-base'

interface IProps {
  navigation: any
}

interface IState {
  name: string
  price: string
  userId: string
  companyId: string
  fieldErrors: any
}

export default class UpsertServiceScreen extends Component<IProps, IState> {
  state = {
    name: '',
    price: '',
    userId: '',
    companyId: '',
    fieldErrors: null
  }

  updateState = (key: string, value: any) => {
    const state = { ...this.state, [key]: value }
    this.setState(state)
  }

  static navigationOptions = ({ navigation }: any) => {
    const service = navigation.getParam('service', null)
    return {
      header: (
        <Header
          title={service ? `Edit Service ${service.name}` : 'New Service'}
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }

  componentDidMount() {
    const service = this.props.navigation.getParam('service', null)
    if (service) {
      this.setState({ ...service })
    }
    this.updateDetails()
  }

  updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      userId: user.id,
      companyId: user.company.id
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <Mutation mutation={UpsertServiceGQL} onCompleted={this.onCompleted}>
        {(upsertService, { loading }) => (
          <Container>
            <Content>
              <Form>
                <AppSpinner visible={loading} />
                <View style={{ flex: 1 }}>
                  <View style={styles.inputView}>
                    <InputAtom
                      label="Service name"
                      getValue={val => this.updateState('name', val)}
                      contStyle={styles.inputWrapper}
                      defaultValue={this.state.name}
                      placeholder="e.g Human Hair dressing"
                    />
                  </View>
                  <View style={styles.inputView}>
                    <InputAtom
                      label="Rate/charges"
                      getValue={val => this.updateState('price', val)}
                      contStyle={styles.inputWrapper}
                      defaultValue={this.state.price}
                      keyboardType="numeric"
                      placeholder="e.g 5,000"
                    />
                  </View>
                </View>
                <SaveCancelButton
                  navigation={navigation}
                  positiveButtonName="SAVE"
                  createfunc={() =>
                    upsertService({
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
    const service = this.props.navigation.getParam('service', {})
    const { name, price, userId, companyId } = this.state
    return {
      name,
      price,
      userId,
      companyId,
      serviceId: service ? service.id : null
    }
  }

  onCompleted = async res => {
    const {
      upsertService: { success, fieldErrors }
    } = res
    if (success) {
      this.props.navigation.navigate('Services')
    } else {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.modal
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    padding: 3,
    borderRadius: 3,
    marginTop: 16
  },
  inputWrapper: {
    // marginTop: 16,
    // paddingBottom: 8,
    // marginLeft: 8,
    // marginRight: 8
  }
})
