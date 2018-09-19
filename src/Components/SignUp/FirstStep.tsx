import React from 'react'
import SignUpProcess from './SignUpProcess'

interface IProps {
  onCtaPress: any
}
export default class FirstStep extends React.PureComponent<IProps> {
  render() {
    return (
      <SignUpProcess
        header="Welcome! Lets get you ready to sell"
        description="In the short while, before we takeoff, lets get you and & your business comfortably onboard"
        ctaButtonText="Continue"
        ctaButtonPress={this.props.onCtaPress}
        checkedItems={[
          {
            text: `First you come \nonboard`,
            isChecked: false,
            isVisible: true
          }
        ]}
      />
    )
  }
}