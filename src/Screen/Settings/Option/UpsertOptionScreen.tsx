import React, { Component } from 'react'
import FormStepperContainer from '../../../Container/Form/StepperContainer'
import { UpsertOptionGQL } from '../../../graphql/mutations/store'
import { ListCompanyOptionsGQL } from '../../../graphql/queries/store'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../../Functions'
import AppSpinner from '../../../Components/Spinner'
import Auth from '../../../services/auth'
import { NavigationActions } from 'react-navigation'

interface IProps {
  navigation: any
}

interface IState {
  name: string
  companyId: string
  fieldErrors: any
  isVisual: string
  __typename?: any
  company?: any
}

export default class UpsertOptionScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    name: '',
    isVisual: '',
    companyId: '',
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  async componentDidMount() {
    const user = JSON.parse(await Auth.getCurrentUser())
    const option = this.props.navigation.getParam('option', null)
    let state = {}
    if (option) {
      state = option
    }
    state = { ...state, companyId: user.company.id }
    this.setState(state)
  }

  render() {
    const option = this.props.navigation.getParam('option', null)

    return (
      <Mutation
        mutation={UpsertOptionGQL}
        onCompleted={this.onCompleted}
        refetchQueries={[
          {
            query: ListCompanyOptionsGQL,
            variables: {
              queryText: '',
              companyId: this.state.companyId,
              first: 10,
              after: null
            }
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(upsertOption, { loading }) => [
          <AppSpinner visible={loading} />,
          <FormStepperContainer
            formData={this.state}
            formAction={option && 'update'}
            steps={[
              {
                stepTitle: "Let's have your option",
                formFields: [
                  {
                    label: 'What should we call this option?',
                    placeholder: 'e.g Color',
                    name: 'name',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    }
                  },
                  {
                    label: `Should ${this.state.name || 'it'} be visual?`,
                    name: 'isVisual',
                    type: {
                      type: 'radio',
                      options: ['Yes', 'No']
                    },
                    validators: ['required']
                  }
                ],
                buttonTitle: 'Done'
              }
            ]}
            updateValueChange={this.updateState}
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
            onCompleteSteps={() =>
              upsertOption({ variables: this.parseMutationVariables() })
            }
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    const option = this.props.navigation.getParam('option', {})
    let params = { ...this.state }
    delete params.fieldErrors
    delete params['__typename']
    delete params['id']

    return { option: params, optionId: option ? option.id : null }
  }
  onCompleted = async res => {
    const {
      upsertOption: { success, fieldErrors }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: 'ProfileSettings'
          }),
          NavigationActions.navigate({
            routeName: 'Options'
          })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }
}
