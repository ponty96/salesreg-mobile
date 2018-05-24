import * as React from 'react'
import { Button } from 'native-base'
import { Text } from 'react-native'
import styles from './../Style/Form'

interface IProps {
  btnText?: string
  transparent?: boolean
  disabled?: boolean
  onPress?: (a: string) => void
  funcValue?: string
  btnStyle?: any
  textStyle?: any
}

class ButtonAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    transparent: false,
    disabled: false
  };

  onPress = () => {
      if (this.props.onPress) {
          this.props.onPress(this.props.funcValue);
      }
  }

  render() {
    return (
      <Button
        transparent={this.props.transparent ? this.props.transparent : false}
        disabled={this.props.disabled}
        light={this.props.disabled}
        style={[
          this.props.transparent ? styles.buttonTransparent : styles.buttonRed,
          this.props.disabled && styles.buttonDisabled,
          this.props.btnStyle
        ]}
        onPress={this.onPress}
      >
        <Text
          style={[
            this.props.transparent ? styles.textRed : styles.textTransparent,
            this.props.textStyle
          ]}
        >
          {this.props.btnText}
        </Text>
      </Button>
    )
  }
}

export default ButtonAtom
