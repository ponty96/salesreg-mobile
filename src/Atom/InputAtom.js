import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Item, Input, Label, Text } from 'native-base';

import styles from './../Style/Form';

class InputAtom extends Component {
    static defaultProps = {
        required: false,
        floatingLabel: true,
        secureTextEntry: false,
        keyboardType: 'default'
    }

    render() {
        return (
            <Item floatingLabel={this.props.floatingLabel}>
                <Label style={styles.label}>
                    {this.props.required && <Text style={styles.required}>* </Text>}
                    {this.props.label}
                </Label>
                <Input
                    placeholder = {this.props.placeholder}
                    onChangeText={text => this.props.getValue(text)}
                    defaultValue = {this.props.defaultValue}
                    secureTextEntry = {this.props.secureTextEntry}
                    keyboardType = {this.props.keyboardType}
                    underlineColorAndroid = {'transparent'}
                />
            </Item>
        );
    }
}

InputAtom.propTypes = {
    required: PropTypes.bool,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    floatingLabel: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    getValue: PropTypes.func,
    keyboardType: PropTypes.oneOf(['default', 'numeric', 'email-address', 'phone-pad']),
}

export default InputAtom;