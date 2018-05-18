import React from 'react'
import { Text } from 'react-native'
import { Form } from 'native-base'
import PropTypes from 'prop-types'

import InputAtom from './../Atom/InputAtom'
import ButtonAtom from './../Atom/ButtonAtom'
import styles from './../Style/Form'
import styles1 from './../Style/exportStyles'

class ResetForm extends React.Component {
  state = {
    code: undefined
  }

  static defaultProps = {
    secretPhone: 'xxxxxxxxx678'
  }

  reset = () => {
    console.log(this.state.code)
  }

  resend = () => {
    console.log('Put resend logic here')
  }

  getCode = code => {
    this.setState({
      code
    })
  }

  navigate = location => {
    this.props.navigation.navigate(location)
  }

    render() {
        return (
            <Form>
                <Text
                    style={styles.buttonsWrapper}
                >
                    A reset code will be sent to {this.props.secretPhone}. Enter the code to reset your password
                </Text>

        <InputAtom
          placeholder={'Enter Reset Code'}
          floatingLabel={false}
          getValue={this.getCode}
          contStyle={styles1.marginlessInput}
        />

        <ButtonAtom
          btnText="send another code"
          transparent={true}
          onPress={this.resend}
        />
        <ButtonAtom
          btnText="Reset Password"
          onPress={this.reset}
          disabled={this.state.code ? false : true}
        />
        <ButtonAtom
          btnText="I don't have an account"
          transparent={true}
          funcValue={'Signup'}
          onPress={this.navigate}
        />
      </Form>
    )
  }
}

ResetForm.propTypes = {
  secretPhone: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
}

export default ResetForm
