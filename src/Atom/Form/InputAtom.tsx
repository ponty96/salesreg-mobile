import * as React from 'react'
import { Item, Input, Label, Text, Textarea } from 'native-base'
import { View, StyleSheet, Platform } from 'react-native'
import { color } from '../../Style/Color'
import { numberWithCommas } from '../../Functions/numberWithCommas'

interface IProps {
  required?: boolean | false
  label?: string
  defaultValue?: string
  multiline?: boolean
  placeholder?: string
  editable?: boolean
  floatingLabel?: boolean | true
  secureTextEntry?: boolean | false
  getValue?: (a: string | number) => void
  contStyle?: object | any
  containerStyle?: object
  inputStyle?: object
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  underneathText?: string
  underneathStyle?: object
  maxLength?: number
  login?: boolean
  error?: any
  inlineElement?: any
  onSubmitEditing?: () => void
}

interface IState {}

class InputAtom extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    label: '',
    required: false,
    floatingLabel: true,
    secureTextEntry: false,
    keyboardType: 'default',
    editable: true,
    multiline: false,
    contStyle: { marginLeft: 4 } || { marginLeft: 0 },
    onSubmitEditing: null
  }

  inputRef = null

  render() {
    return (
      <View style={this.props.containerStyle}>
        {!this.props.multiline ? (
          <Item
            stackedLabel={true}
            style={[
              {
                borderBottomColor: color.textBorderBottom,
                marginTop: 24,
                height: 80
              },
              this.props.contStyle
            ]}
          >
            <Label
              style={{
                color: color.textColor,
                padding: 0,
                fontSize: 14
              }}
            >
              {this.props.required && <Text style={styles.required}>*</Text>}
              <Text style={styles.labelText}>{this.props.label}</Text>
            </Label>
            <View
              style={{ flexDirection: 'row', width: '100%', marginBottom: 4 }}
            >
              {this.props.inlineElement}
              <Input
                placeholder={this.props.placeholder}
                editable={this.props.editable}
                multiline={this.props.multiline}
                onChangeText={text =>
                  this.props.getValue(
                    this.props.keyboardType == 'phone-pad' ||
                      this.props.keyboardType == 'numeric'
                      ? text.replace(/,/gi, '')
                      : text
                  )
                }
                value={
                  this.props.keyboardType == 'numeric'
                    ? numberWithCommas(this.props.defaultValue || '')
                    : this.props.defaultValue
                }
                secureTextEntry={this.props.secureTextEntry}
                keyboardType={this.props.keyboardType}
                style={[this.props.inputStyle, styles.inputText]}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={color.inactive}
                maxLength={this.props.maxLength}
                ref={input => (this.inputRef = input)}
                onSubmitEditing={() => {
                  this.props.onSubmitEditing()
                  setTimeout(() => {
                    this.inputRef._root.focus()
                  }, 450)
                }}
              />
            </View>
          </Item>
        ) : (
          <React.Fragment>
            <Label
              style={{
                color: color.textColor,
                padding: 0,
                marginTop: 24,
                fontSize: 14
              }}
            >
              {this.props.required && <Text style={styles.required}>*</Text>}
              <Text style={styles.labelText}>{this.props.label}</Text>
            </Label>
            <Textarea
              rowSpan={5}
              style={[this.props.inputStyle, styles.multilineText]}
              ref={input => (this.inputRef = input)}
              onSubmitEditing={() => {
                this.props.onSubmitEditing()
                setTimeout(() => {
                  this.inputRef._root.focus()
                }, 450)
              }}
              editable={this.props.editable}
              placeholder={this.props.placeholder}
              placeholderTextColor={color.inactive}
              onChangeText={text => this.props.getValue(text)}
              value={this.props.defaultValue}
            />
          </React.Fragment>
        )}
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
              fontFamily: 'AvenirNext-Regular',
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
    fontSize: 16,
    top: 0
  },
  labelText: {
    fontFamily: 'AvenirNext-DemiBold',
    padding: 0,
    fontSize: 16,
    color: color.textColor
  },
  required: {
    color: color.inactive,
    fontSize: 14
  },
  underneathText: {
    marginLeft: 3,
    color: color.textColor,
    fontSize: 14,
    marginBottom: 0,
    marginTop: 2,
    fontFamily: 'AvenirNext-Regular',
    paddingVertical: 12
  },
  inputText: {
    fontFamily: 'AvenirNext-Regular',
    color: color.principal,
    fontSize: 16,
    // marginTop: 6,
    height: 55,
    top: Platform.OS == 'ios' ? 6 : 6
  },
  multilineText: {
    fontFamily: 'AvenirNext-Regular',
    color: color.principal,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    top: Platform.OS == 'ios' ? 6 : 6
  }
})
