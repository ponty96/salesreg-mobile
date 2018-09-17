import React from 'react'
import FirstStep from '../Components/SignUp/FirstStep'
import ThirdStep from '../Components/SignUp/ThirdStep'
import LastStep from '../Components/SignUp/LastStep'
import FormStepperContainer from '../Container/Form/StepperContainer'

interface IState {
  currentStep: number
}

interface IProps {
  registerUser: () => void
}
export default class SignUpProcessContainer extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    currentStep: 0
  }
  render = () => this.renderComponentAtStep()

  navigateToStep = step => {
    this.setState({ currentStep: step })
  }
  renderComponentAtStep = (): JSX.Element => {
    const { currentStep } = this.state
    switch (currentStep) {
      case 0:
      default:
        return <FirstStep onCtaPress={() => this.navigateToStep(1)} />
      case 1:
        return (
          <FormStepperContainer
            steps={[
              {
                stepTitle: 'Tell us about yourself'
              },
              {
                stepTitle: 'Welcome Ayo, how can customers contact you',
                buttonTitle: 'Done'
              }
            ]}
            onCompleteForm={() => this.navigateToStep(2)}
          />
        )
      case 2:
        return (
          <ThirdStep
            onCtaPress={() => this.navigateToStep(3)}
            firstName="Opeoluwa"
          />
        )
      case 3:
        return (
          <LastStep
            onCtaPress={() => this.props.registerUser()}
            businessName="MayAfriq"
          />
        )
    }
  }
}
