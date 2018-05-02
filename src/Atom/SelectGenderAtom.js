import React, { Component } from 'react';
import { Picker, Icon } from 'native-base';

class SelectGenderAtom extends Component {
    state = {
        gender: undefined
    }

    updateGender = (selectedGender) => {
        this.setState({
            gender: selectedGender
        })
    }

    render() {
        return (
            <Picker
                mode = 'dropdown'
                iosHeader = 'Select one...'
                selectedValue = { this.state.gender }
                onValueChange = { this.updateGender }
            >
                <Picker.Item label = 'Male' value = 'Male' />
                <Picker.Item label = 'Female' value = 'Female' />
            </Picker>
        )
    }
}

export default SelectGenderAtom;