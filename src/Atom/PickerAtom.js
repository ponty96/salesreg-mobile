import React, { Component } from 'react';
import { Picker } from 'native-base';
import PropTypes from 'prop-types';

const Item = Picker.Item

class PickerAtom extends Component {
    constructor(props){
        super(props)
        this.state={
            selected: this.props.selectedValue ? this.props.selectedValue : undefined
        }
    }
    handleChange = (val) => {
        this.props.handleChange(val);
    }

    render() {
        return (
            <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected}
                onValueChange={this.handleChange}
            >
                { this.props.items.map((item, index) => ( <Item key={index} label={item.label} value={item.value} /> )) }
            </Picker>
        );
    }
};

PickerAtom.propTypes = {
    handleChange: PropTypes.func.isRequired,
    selectedValue: PropTypes.string,
    items: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired
}

export default PickerAtom;
