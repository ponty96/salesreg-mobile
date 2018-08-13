import * as React from 'react';
import { Picker, Icon } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { color } from '../Style/Color';

import { Item, Label, Text } from 'native-base';

interface IProps {
  list: Array<any>;
  placeholder: string;
  selected?: string;
  handleSelection?: (value: any) => void;
  width?: string;
  pickerStyle?: any;
  style?: any;
  required?: boolean | false;
  label?: string;
}

interface IState {
  loading: boolean;
  bottomColor: string;
  labelColor: string;
}

class PickerAtom extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      bottomColor: color.textBorderBottom,
      labelColor: color.inactive
    };
  }
  static defaultProps = {
    width: '100%'
  };
  handleChange(value: string) {
    this.props.handleSelection(value);
  }
  changeUnderline = (newColor: string): void => {
    this.setState({ labelColor: newColor });
  };

  render() {
    let list = this.props.list;
    return (
      <View style={{ minHeight: 65 }}>
        <Label
          style={{
            color: this.state.labelColor,
            padding: 0,
            fontSize: 14,
            marginLeft: 4
          }}
        >
          {this.props.required && <Text style={styles.required}>*</Text>}
          <Text style={[styles.labelText, { color: this.state.labelColor }]}>
            {this.props.label}
          </Text>
        </Label>
        <Picker
          iosHeader="Select Gender"
          mode="dropdown"
          iosIcon={
            <Icon
              name="caret-down"
              type="FontAwesome"
              style={{ color: color.inactive, fontSize: 16 }}
            />
          }
          style={{
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: color.textBorderBottom,
            marginBottom: 8,
            width: this.props.width,
            ...this.props.pickerStyle
          }}
          selectedValue={this.props.selected}
          onValueChange={this.handleChange.bind(this)}
          placeholder={this.props.placeholder}
          placeholderStyle={{
            color: color.inactive,
            fontSize: 16,
            textAlign: 'left',
            paddingLeft: 8
          }}
          textStyle={{
            textAlign: 'left',
            color: color.principal,
            fontSize: 16,
            paddingLeft: 8
          }}
        >
          {list.map((element, key) => (
            <Picker.Item label={element} value={element} key={key} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'SourceSansPro',
    padding: 0,
    fontSize: 16
  },
  required: {
    color: color.inactive,
    fontSize: 14
  }
});

export default PickerAtom;
