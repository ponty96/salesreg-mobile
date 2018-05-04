import React, { Component } from 'react';
import { Picker, Icon } from 'native-base';

import { selectGenderStyles } from './../Style/exportStyles';

class SelectGenderAtom extends Component {
    render() {
        return (
            <Picker
                mode = 'dropdown'
                iosHeader = 'Gender'
                selectedValue = { this.props.gender }
                onValueChange = { this.props.updateGender }
                style = { selectGenderStyles.pickerColor }
            >
                <Picker.Item label = 'Male' value = 'Male' />
                <Picker.Item label = 'Female' value = 'Female' />
            </Picker>
        )
    }
}

export default SelectGenderAtom;