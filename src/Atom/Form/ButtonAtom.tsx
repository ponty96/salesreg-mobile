import * as React from 'react'
import { Button, Icon } from 'native-base'
import { StyleSheet } from 'react-native'

import { DemiBoldText } from '../TextAtom'
import { color } from '../../Style/Color'

interface IProps {
  btnText?: string
  transparent?: boolean
  disabled?: boolean
  onPress?: () => void
  funcValue?: string
  btnStyle?: any
  textStyle?: any
  faded?: boolean
  type?: 'primary' | 'secondary'
  hideIcon?: boolean
  icon?: any
}

class ButtonAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    transparent: false,
    disabled: false,
    hideIcon: false
  }

  render() {
    return (
      <Button
        transparent={this.props.transparent}
        disabled={this.props.disabled}
        light={this.props.disabled}
        style={[
          styles.button,
          styles[`${this.props.type}Btn`],
          this.props.transparent && styles.transparent,
          this.props.btnStyle,
          this.props.faded && styles.faded
        ]}
        onPress={this.props.onPress}
      >
        <DemiBoldText
          style={[
            styles.text,
            styles[`${this.props.type}Text`],
            this.props.textStyle
          ]}
        >
          {this.props.btnText}
        </DemiBoldText>
        {!this.props.hideIcon && (
          <Icon
            name={this.props.icon || 'ios-arrow-forward'}
            type="Ionicons"
            style={[styles[`${this.props.type}Text`], styles.icon]}
          />
        )}
      </Button>
    )
  }
}

export default ButtonAtom

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 5,
    padding: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto'
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  faded: {
    backgroundColor: '#bbdefb'
  },
  primaryBtn: {
    backgroundColor: '#fff'
  },
  secondaryBtn: {
    backgroundColor: color.button
  },
  text: {
    fontSize: 16,
    marginRight: 10
  },
  primaryText: {
    color: color.button
  },
  secondaryText: {
    color: '#fff'
  },
  icon: {
    fontSize: 28
  }
})
