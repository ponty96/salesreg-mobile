/**
 *
 * REQUIREMENTS
 *
 * This container component is a step based form container used everywhere in the app
 *
 * It expects the following for each step:
 *  Step title
 *  Form fields
 *  Button title, or defaults to "Next"
 *  Button onPress handler, or defaults to navigating to the next step
 *
 * Functionality:
 *  - renders form title
 *  - handles step navigation
 *  - handles form client side validation
 */

/**
 *  Form field {
 *   label
 *   placeholder
 *   type
 *   subType
 *   validation: string | [array of string | function ] | function
 *  }
 *
 */

import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Container, Content } from 'native-base'
import ButtonAtom from '../../Atom/ButtonAtom'
import FormHeader from '../../Components/Header/FormHeader'

interface FormStep {
  stepTitle: string
  // formFields: JSX.Element
  buttonTitle?: string
}
interface IProps {
  steps: FormStep[]
  onCompleteForm: (params: any) => void
}
interface IState {
  currentStep: number
  showHeaderBorder?: boolean
}

export default class FormStepperContainer extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    currentStep: 1,
    showHeaderBorder: false
  }
  render = () => (
    <Container style={{ flex: 1 }}>
      <FormHeader
        onPressBackIcon={this.handleBackButtonPress}
        currentStep={this.state.currentStep}
        totalSteps={this.props.steps.length}
        showBottomBorder={this.state.showHeaderBorder}
      />
      <Content contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>
          {this.props.steps[this.state.currentStep - 1]['stepTitle']}
        </Text>
      </Content>

      <View style={styles.footer}>
        <ButtonAtom
          btnText={`${this.props.steps[this.state.currentStep - 1][
            'buttonTitle'
          ] || 'Next'}`}
          onPress={this.onCtaButtonPress}
          type="secondary"
        />
      </View>
    </Container>
  )

  handleBackButtonPress = () => {
    const { currentStep } = this.state
    if (currentStep > 1) {
      this.setState({ currentStep: currentStep - 1 })
    }
  }

  onCtaButtonPress = () => {
    const { currentStep } = this.state
    if (currentStep == this.props.steps.length) {
      // call compleleteform handler
    } else {
      this.setState({ currentStep: currentStep + 1 })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    height: '100%'
  },
  headerText: {
    alignSelf: 'flex-start',
    fontSize: 22,
    color: '#000',
    fontFamily: 'AvenirNext-DemiBold'
  },
  footer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16
  }
})
