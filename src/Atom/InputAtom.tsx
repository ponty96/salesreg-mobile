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
  maxLength?: number
}

interface IState {
  bottomColor: string
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
    bottomColor: color.textBorderBottom
  }

  render() {
    return (
      <View>
        <Item
          floatingLabel={this.props.floatingLabel}
          stackedLabel={!this.props.floatingLabel}
          style={[
            { borderBottomColor: this.state.bottomColor },
            this.props.contStyle
          ]}
        >
          <Label style={styles.label}>
            {this.props.required && <Text style={styles.required}>* </Text>}
            <Text
              style={{ color: color.inactive, fontFamily: 'SourceSansPro' }}
            >
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
            style={[
              { fontFamily: 'SourceSansPro' },
              styles.inputText,
              this.props.inputStyle
            ]}
            numberOfLines={6}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={color.inactive}
            onFocus={() => this.setState({ bottomColor: color.button })}
            onBlur={() =>
              this.setState({ bottomColor: color.textBorderBottom })
            }
            maxLength={this.props.maxLength}
          />
        </Item>
        {this.props.underneathText ? (
          <Text
            style={[
              styles.underneathText,
              this.props.underneathStyle,
              { fontFamily: 'SourceSansPro' }
            ]}
          >
            {this.props.underneathText}
          </Text>
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
    color: color.inactive,
    fontSize: 14
  },
  required: {
    color: color.primary,
    fontSize: 14
  },
  underneathText: {
    marginLeft: 0,
    color: color.principal,
    fontSize: 12,
    marginBottom: 25,
    marginTop: 2
  },
  inputText: {
    color: color.principal
  }
})
