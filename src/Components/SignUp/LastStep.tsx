import React from 'react'
import SignUpProcess from './SignUpProcess'

interface IProps {
  onCtaPress: any
  businessName: string
}
export default class LastStep extends React.PureComponent<IProps> {
  render() {
    return (
      <SignUpProcess
        header={`Congratulations ${
          this.props.businessName
        }, you are good to go`}
        description="You can always edit your business profile by going to Settings > Business"
        ctaButtonText="Continue"
        ctaButtonPress={this.props.onCtaPress}
        checkedItems={[
          {
            text: `Now, add your products & services to start selling`,
            isChecked: true,
            isVisible: false
          }
        ]}
      />
    )
  }
}
