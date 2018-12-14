import React from 'react'
import FormStepperContainer from '../../Container/Form/StepperContainer'
// import { Mutation } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
// import { parseFieldErrors } from '../../Functions'
import { UserContext } from '../../context/UserContext'

interface IProps {
  navigation: any
  user?: any
}

interface IProducts {
  productId?: string
  quantity: String
  name?: string
  type?: string
  serviceId?: String
  unitPrice: String
}

interface IState {
  items: IProducts[]
  fieldErrors: any
}

class UpsertProductRestockScreen extends React.PureComponent<IProps, IState> {
  state = {
    items: [
      {
        productId: null,
        quantity: '',
        name: '',
        type: '',
        serviceId: null,
        unitPrice: '0.00'
      }
    ],
    fieldErrors: null
  }

  updateState = (key: string, val: any) => {
    const formData = {
      ...this.state,
      [key]: val
    }

    console.log("The value is ", val)

    this.setState({
      ...formData
    })
  }

  onCompleted = async () => {}

  parseMutationVariables = () => {}

  render() {
    return (
      <React.Fragment>
        <AppSpinner visible={false} />
        <FormStepperContainer
          formData={this.state}
          updateValueChange={this.updateState}
          handleBackPress={() => this.props.navigation.goBack()}
          fieldErrors={this.state.fieldErrors}
          onCompleteSteps={() => null}
          steps={[
            {
              stepTitle: "Let's have the items you are restocking",
              formFields: [
                {
                  label: '',
                  validators: ['sales-order'],
                  type: {
                    type: 'restock-items'
                  },
                  name: 'items'
                }
              ]
            },
            {
              stepTitle: 'Verify your re-stock entry',
              formFields: [
                {
                  label: '',
                  type: {
                    type: 'product-list'
                  },
                  name: 'items'
                }
              ],
              buttonTitle: 'Done'
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const _UpsertProductRestockScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <UpsertProductRestockScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_UpsertProductRestockScreen.navigationOptions = {
  header: null
}

export default _UpsertProductRestockScreen
