import React from 'react'
import SignUpProcess from './SignUpProcess'

interface IProps {
  onCtaPress: any
  firstName: string
}
export default class ThirdStep extends React.PureComponent<IProps> {
  render() {
    return (
      <SignUpProcess
        header=""
        description=""
        ctaButtonText="Continue"
        ctaButtonPress={this.props.onCtaPress}
        checkedItems={[
          {
            text: `Welcome onboard ${this.props.firstName}`,
            isChecked: true,
            isVisible: true
          },
          {
            text: 'Nows lets bring in your business',
            isChecked: false,
            isVisible: true
          }
        ]}
      />
    )
  }
}
