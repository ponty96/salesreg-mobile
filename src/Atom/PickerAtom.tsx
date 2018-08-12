import * as React from 'react';
import { Picker, Icon } from 'native-base';
import { View } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  list: Array<any>;
  placeholder: string;
  selected?: string;
  handleSelection?: (value: any) => void;
  width?: string;
  pickerStyle?: any;
  style?: any;
}

interface IState {
  loading: boolean;
}

class PickerAtom extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true
    };
  }
  static defaultProps = {
    width: '100%'
  };
  handleChange(value: string) {
    this.props.handleSelection(value);
  }

  render() {
    let list = this.props.list;
    return (
      <View>
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
            height: 35,
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

export default PickerAtom;
