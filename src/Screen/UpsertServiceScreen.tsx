import React, { Component } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import InputAtom from '../Atom/InputAtom'
import CustomHeader from '../Components/CustomHeader'
import SaveCancelButton from '../Container/SaveCancelButton'
import { color } from '../Style/Color'

import { Mutation } from 'react-apollo'
import AppSpinner from '../Components/Spinner'
import { parseFieldErrors } from '../Functions'
import { UpsertServiceGQL } from '../graphql/mutations/product-service'
import Auth from '../services/auth'

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
  public state = {
    name: '',
    price: '',
    userId: '',
    companyId: '',
    fieldErrors: null
  }

  public updateState = (key: string, value: any) => {
    const state = { ...this.state, [key]: value }
    this.setState(state)
  }

  // tslint:disable-next-line:member-ordering
  public static navigationOptions = ({ navigation }: any) => {
    const service = navigation.getParam('service', null)
    return {
      header: (
        <CustomHeader
          title={service ? `Edit Service ${service.name}` : 'New Service'}
          // tslint:disable-next-line:jsx-no-lambda
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  public componentDidMount() {
    const service = this.props.navigation.getParam('service', null)
    if (service) {
      this.setState({ ...service })
    }
    this.updateDetails()
  }

  public updateDetails = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      userId: user.id,
      companyId: user.company.id
    })
  }

  public render() {
    const { navigation } = this.props
    return (
      <Mutation mutation={UpsertServiceGQL} onCompleted={this.onCompleted}>
        {(upsertService, { loading }) => (
          <View style={styles.container}>
            <AppSpinner visible={loading} />
            <View style={{ flex: 1 }}>
              <View style={styles.inputView}>
                <InputAtom
                  label="Service name"
                  // tslint:disable-next-line:jsx-no-lambda
                  getValue={val => this.updateState('name', val)}
                  contStyle={styles.inputWrapper}
                  defaultValue={this.state.name}
                />
              </View>
              <View style={styles.inputView}>
                <InputAtom
                  label="Rate/charges"
                  // tslint:disable-next-line:jsx-no-lambda
                  getValue={val => this.updateState('price', val)}
                  contStyle={styles.inputWrapper}
                  defaultValue={this.state.price}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <SaveCancelButton
              navigation={navigation}
              positiveButtonName="SAVE"
              // tslint:disable-next-line:jsx-no-lambda
              createfunc={() =>
                upsertService({
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

  public onCompleted = async res => {
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
    marginTop: 16,
    paddingBottom: 8,
    marginLeft: 8,
    marginRight: 8
  }
})
