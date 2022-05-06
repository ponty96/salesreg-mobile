import React from 'react'
import SignUpProcess from './SignUpProcess'

interface IProps {
  onCtaPress: any
  onLoginPress: () => void
}

export default class FirstStep extends React.PureComponent<IProps> {
  render() {
    return (
      <SignUpProcess
        header="Welcome! Let's get you ready to sell"
        description="In the short while, before we takeoff, let's get you and & your business comfortably onboard"
        ctaButtonText="Lets begin"
        ctaButtonPress={this.props.onCtaPress}
        checkedItems={[
          {
            text: `First you come \nonboard`,
            isChecked: false,
            isVisible: true
          }
        ]}
        showLogin
        onLoginPress={this.props.onLoginPress}
      />
    )
  }
}
