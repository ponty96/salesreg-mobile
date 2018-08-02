import { Button } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  btnText?: string;
  transparent?: boolean;
  disabled?: boolean;
  onPress?: any;
  funcValue?: string;
  btnStyle?: any;
  textStyle?: any;
}

class ButtonAtom extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    transparent: false,
    disabled: false
  };

  public render() {
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
        onPress={this.props.onPress}
      >
        <Text
          style={[
            { fontFamily: 'SourceSansPro' },
            this.props.transparent ? styles.textRed : styles.textTransparent,
            this.props.textStyle
          ]}
        >
          {this.props.btnText}
        </Text>
      </Button>
    );
  }
}

export default ButtonAtom;

const styles = StyleSheet.create({
  buttonTransparent: {
    backgroundColor: color.secondary,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginVertical: 8
  },
  buttonRed: {
    backgroundColor: color.button,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 3
  },
  buttonDisabled: {
    backgroundColor: color.inactive,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginVertical: 8
  },
  textRed: {
    color: color.primary
  },
  textTransparent: {
    color: color.secondary
  }
});
