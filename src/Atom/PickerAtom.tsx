import * as React from 'react';
import { Picker, Icon } from 'native-base';

interface IProps {
  list: Array<any>;
  style?: object;
  placeholder: string;
  selected?: string;
  handleSelection?: (value: any) => void;
}

interface IState {
  selected: string;
}

class PickerAtom extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: this.props.selected
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
      <Picker
        iosHeader="Select Gender"
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={this.props.style}
        selectedValue={this.state.selected}
        onValueChange={this.handleChange.bind(this)}
        placeholder={this.props.placeholder}
        textStyle={{ textAlign: 'left', paddingLeft: 0, paddingRight: 0 }}
      >
        {list.map((element, key) => (
          <Picker.Item label={element} value={element} key={key} />
        ))}
      </Picker>
    );
  }
}

export default PickerAtom;
