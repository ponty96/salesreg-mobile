import * as React from 'react'
import { Item, Input, Label, Text } from 'native-base'
import { View, StyleSheet, Platform } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  required?: boolean | false
  label?: string
  defaultValue?: string
  multiline?: boolean
  placeholder?: string
  floatingLabel?: boolean | true
  secureTextEntry?: boolean | false
  getValue?: (a: string | number) => void
  contStyle?: object | any
  inputStyle?: object
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  underneathText?: string
  underneathStyle?: object
  maxLength?: number
  login?: boolean
  error?: any
}

interface IState {
  bottomColor: string
  labelColor: string
}

class InputAtom extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    label: '',
    required: false,
    floatingLabel: true,
    secureTextEntry: false,
    keyboardType: 'default',
    multiline: false,
    contStyle: { marginLeft: 4 } || { marginLeft: 0 }
  }

  state = {
    bottomColor: color.textBorderBottom,
    labelColor: color.label
  }

  changeUnderline = (newColor: string): void => {
    if (this.props.error) {
      this.setState({ bottomColor: 'red', labelColor: 'red' })
    } else if (this.props.login) {
      this.setState({ bottomColor: newColor, labelColor: newColor })
    } else {
      this.setState({
        labelColor: newColor,
        bottomColor: color.textBorderBottom
      })
    }
  }

  render() {
    return (
      <View>
        <Item
          // floatingLabel={this.props.floatingLabel}
          stackedLabel={true}
          style={[
            { borderBottomColor: this.state.bottomColor, marginTop: 0 },
            this.props.contStyle
          ]}
        >
          <Label
            style={{
              color: this.state.labelColor,
              padding: 0,
              fontSize: 14
            }}
          >
            {this.props.required && <Text style={styles.required}>*</Text>}
            <Text style={[styles.labelText, { color: this.state.labelColor }]}>
              {this.props.label}
            </Text>
          </Label>
          <Input
            placeholder={this.props.placeholder}
            multiline={this.props.multiline}
            onChangeText={text => this.props.getValue(text)}
            value={this.props.defaultValue}
            secureTextEntry={this.props.secureTextEntry}
            keyboardType={this.props.keyboardType}
            style={[styles.inputText, this.props.inputStyle]}
            // numberOfLines={6}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={color.inactive}
            onFocus={() => this.changeUnderline(color.label)}
            onBlur={() => this.changeUnderline(color.inactive)}
            maxLength={this.props.maxLength}
          />
        </Item>
        {this.renderUnderNeathText()}
      </View>
    )
  }

  renderUnderNeathText = () => {
    if (this.props.error || this.props.underneathText) {
      return (
        <Text
          style={[
            styles.underneathText,
            this.props.underneathStyle,
            {
              fontFamily: 'SourceSansPro',
              color: this.props.error ? 'red' : color.principal
            }
          ]}
        >
          {this.props.error || this.props.underneathText}
        </Text>
      )
    } else {
      return null
    }
  }
}

export default InputAtom

const styles = StyleSheet.create({
  label: {
    padding: 3,
    fontSize: 16
  },
  labelText: {
    fontFamily: 'SourceSansPro',
    padding: 0,
    fontSize: 16
  },
  required: {
    color: color.inactive,
    fontSize: 14
  },
  underneathText: {
    marginLeft: 0,
    color: color.principal,
    fontSize: 12,
    marginBottom: 0,
    marginTop: 2,
    paddingLeft: 8
  },
  inputText: {
    fontFamily: 'SourceSansPro',
    color: color.principal,
    fontSize: 16,
    // paddingBottom: 0,
    // lineHeight: 8,

    top: Platform.OS == 'ios' ? 6 : 6
  }
})
