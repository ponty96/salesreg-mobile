import * as React from 'react';
import { Item, Input, Label, Text } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  required?: boolean | false;
  label?: string;
  defaultValue?: string;
  multiline?: boolean;
  placeholder?: string;
  floatingLabel?: boolean | true;
  secureTextEntry?: boolean | false;
  getValue?: (a: string | number) => void;
  contStyle?: object | Array<any>;
  inputStyle?: object;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  underneathText?: string;
  underneathStyle?: object;
  maxLength?: number;
  login?: boolean;
  error?: any;
}

interface IState {
  bottomColor: string;
  labelColor: string;
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
  };

  state = {
    bottomColor: color.textBorderBottom,
    labelColor: color.inactive
  };

  changeUnderline = (newColor: string): void => {
    if (this.props.error) {
      this.setState({ bottomColor: 'red', labelColor: 'red' });
    } else if (this.props.login) {
      this.setState({ bottomColor: newColor, labelColor: newColor });
    } else {
      this.setState({ labelColor: newColor });
    }
  };

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
          <Label
            style={{
              color: this.state.labelColor,
              padding: 3,
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
            style={[
              { fontFamily: 'SourceSansPro' },
              styles.inputText,
              this.props.inputStyle
            ]}
            numberOfLines={6}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={color.inactive}
            onFocus={() => this.changeUnderline(color.blueLabelColor)}
            onBlur={() => this.changeUnderline(color.textBorderBottom)}
            maxLength={this.props.maxLength}
          />
        </Item>
        {this.renderUnderNeathText()}
      </View>
    );
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
      );
    }
    return <Text />;
  };
}

export default InputAtom;

const styles = StyleSheet.create({
  marginlessInput: {
    marginLeft: 0
  },
  marginfulInput: {
    marginLeft: 4
  },
  label: {
    // color: this.state.labelColor,
    padding: 3,
    fontSize: 16
  },
  labelText: {
    // color: this.state.labelColor,
    fontFamily: 'SourceSansPro',
    padding: 3,
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
    marginBottom: 25,
    marginTop: 2
  },
  inputText: {
    color: color.principal,
    marginTop: 8
  }
});
