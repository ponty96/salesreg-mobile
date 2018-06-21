import * as React from 'react'
import { Item, Input, Label, Text } from 'native-base'
import { View, StyleSheet } from 'react-native'
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
  contStyle?: object | Array<any>
  inputStyle?: object
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  underneathText?: string
  underneathStyle?: object
}

class InputAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    label: '',
    required: false,
    floatingLabel: true,
    secureTextEntry: false,
    keyboardType: 'default',
    multiline: false,
    contStyle: { marginLeft: 4 } || { marginLeft: 0 }
  }

  render() {
    return (
      <View style={styles.flexAdjust}>
        <Item
          floatingLabel={this.props.floatingLabel}
          stackedLabel={!this.props.floatingLabel}
          style={this.props.contStyle}
        >
          <Label style={styles.label}>
            {this.props.required && <Text style={styles.required}>* </Text>}
            {this.props.label}
          </Label>
          <Input
            placeholder={this.props.placeholder}
            multiline={this.props.multiline}
            onChangeText={text => this.props.getValue(text)}
            value={this.props.defaultValue}
            secureTextEntry={this.props.secureTextEntry}
            keyboardType={this.props.keyboardType}
            style={[this.props.inputStyle, styles.inputStyle]}
            numberOfLines={6}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={color.inactive}
          />
        </Item>
        {this.props.underneathText ? (
          <Text style={[styles.underneathText, this.props.underneathStyle]}>{this.props.underneathText}</Text>
        ) : (
          <Text />
        )}
      </View>
    )
  }
}

export default InputAtom

const styles = StyleSheet.create({
  marginlessInput: {
    marginLeft: 0
  },
  marginfulInput: {
    marginLeft: 4
  },
  label: {
    color: color.inactive
  },
  required: {
    color: color.inactive
  },
  underneathText: {
    marginLeft: 0,
    color: color.menu,
    fontSize: 12,
    marginBottom: 25
  },
  flexAdjust: {
    flex: 1
  },
  inputStyle: {
    fontSize: 12
  }
})
