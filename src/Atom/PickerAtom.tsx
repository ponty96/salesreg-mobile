import * as React from 'react';
import { Picker, Icon } from 'native-base';
import { View } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  list: Array<any>;
  style?: object;
  placeholder: string;
  selected?: string;
  handleSelection?: (value: any) => void;
}

interface IState {
  selected: string;
  loading: boolean;
}

class PickerAtom extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: this.props.selected,
      loading: true
    };
  }

  handleChange(value: string) {
    this.setState({
      selected: value
    });
    this.props.handleSelection(value);
  }

  render() {
    let list = this.props.list;
    return (
      <View>
        <Picker
          iosHeader="Select Gender"
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={this.props.style}
          selectedValue={this.state.selected}
          onValueChange={this.handleChange.bind(this)}
          placeholder={this.props.placeholder}
          placeholderStyle={{ color: color.principal }}
          textStyle={{
            textAlign: 'left',
            paddingLeft: 0,
            paddingRight: 0,
            color: color.principal
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
