import React, { Component } from 'react'
import FormStepperContainer from '../../../Container/Form/StepperContainer'
import { UpsertCategoryGQL } from '../../../graphql/mutations/store'
import Auth from '../../../services/auth'
import { Mutation } from 'react-apollo'
import { parseFieldErrors } from '../../../Functions'
import AppSpinner from '../../../Components/Spinner'

interface IProps {
  navigation: any
}

interface IState {
  title: string
  description: string
  companyId: string
  fieldErrors: any
  __typename?: any
  company?: any
  userId?: any
}

export default class UpsertCategoryScreen extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  }

  state = {
    title: '',
    description: '',
    userId: '',
    companyId: '',
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val }
    this.setState({ ...formData })
  }

  async componentDidMount() {
    const user = JSON.parse(await Auth.getCurrentUser())
    const category = this.props.navigation.getParam('category', null)
    let state = {}
    if (category) {
      state = category
    }
    state = { ...state, userId: user.id, companyId: user.company.id }
    this.setState(state)
  }

  render() {
    return (
      <Mutation mutation={UpsertCategoryGQL} onCompleted={this.onCompleted}>
        {(upsertCategory, { loading }) => [
          <AppSpinner visible={loading} />,
          <FormStepperContainer
            formData={this.state}
            steps={[
              {
                stepTitle: 'Lets now describe your category',
                formFields: [
                  {
                    label: 'What should we call this category?',
                    placeholder: 'e.g Sport wears',
                    name: 'title',
                    type: {
                      type: 'input',
                      keyboardType: 'default'
                    }
                  },
                  {
                    label: 'Describe this category',
                    placeholder:
                      'e.g Sport wears for keeping your body in healthy and in shape',
                    name: 'description',
                    type: {
                      type: 'input' // TODO add textarea type
                    },
                    underneathText:
                      'Categories with description, tend to help customers understand and engage more with the products / services within this category'
                  }
                ],
                buttonTitle: 'Done'
              }
            ]}
            updateValueChange={this.updateState}
            handleBackPress={() => this.props.navigation.goBack()}
            fieldErrors={this.state.fieldErrors}
            onCompleteSteps={() =>
              upsertCategory({ variables: this.parseMutationVariables() })
            }
          />
        ]}
      </Mutation>
    )
  }

  parseMutationVariables = () => {
    const category = this.props.navigation.getParam('category', {})
    let params = { ...this.state }
    delete params.fieldErrors
    delete params['__typename']
    delete params['id']

    return { category: params, categoryId: category ? category.id : null }
  }
  onCompleted = async res => {
    const {
      upsertCategory: { success, fieldErrors }
    } = res
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) })
    } else {
      this.props.navigation.navigate('Categories')
    }
  }
}