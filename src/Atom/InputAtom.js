import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Item, Input, Label, Text } from 'native-base';

import styles from './../Style/Form';

class InputAtom extends Component {
    static defaultProps = {
        required: false,
        floatingLabel: true,
        secureTextEntry: false,
        keyboardType: 'default',
        multiline: false
    }

    render() {
        return (
            <Item floatingLabel={this.props.floatingLabel} stackedLabel={!this.props.floatingLabel} style={this.props.contStyle}>
                <Label style={styles.label}>
                    {this.props.required && <Text style={styles.required}>* </Text>}
                    {this.props.label}
                </Label>
                <Input
                    placeholder = {this.props.placeholder}
                    multiline = {this.props.multiline}
                    onChangeText={text => this.props.getValue(text)}
                    value = {this.props.defaultValue}
                    secureTextEntry = {this.props.secureTextEntry}
                    keyboardType = {this.props.keyboardType}
                    style = {this.props.inputStyle}
                    numberOfLines={6}
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
    multiline: PropTypes.bool,
    placeholder: PropTypes.string,
    floatingLabel: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    getValue: PropTypes.func,
    contStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    keyboardType: PropTypes.oneOf(['default', 'numeric', 'email-address', 'phone-pad']),
}

export default InputAtom;