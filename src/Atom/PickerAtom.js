import React, { Component } from 'react';
import { Picker, Icon } from 'native-base';
import PropTypes from 'prop-types';

class PickerAtom extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: ""
        };
      }
      handleChange(value) {
        this.setState({
          selected: value
        });
      }
    
    render() {
        return (
            <Picker
                iosHeader="Select one"
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: 130, height: 35 }}
                selectedValue={this.state.selected}
                onValueChange={this.handleChange.bind(this)}
            >
              <Picker.Item label="Fastest Selling" value="key0" />
              <Picker.Item label="Slowest Selling" value="key1" />
              <Picker.Item label="Highest Profit" value="key2" />
              <Picker.Item label="Lowest Profit" value="key3" />
            </Picker>
        );
    }
};

PickerAtom.propTypes = {
    selectedValue: PropTypes.string,
}

export default PickerAtom;
