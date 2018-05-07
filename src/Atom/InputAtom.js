import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Item, Input, Label, Text } from 'native-base';
import { View } from 'react-native';

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
            <View>
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
                        placeholderTextColor = { styles.placeholderColor }
                    />
                </Item>
                { 
                    this.props.underneathText 
                    ? 
                    <Text style = { styles.underneathText }>{ this.props.underneathText }</Text> 
                    : 
                    null 
                }                
            </View>
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
    contStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    inputStyle: PropTypes.object,
    keyboardType: PropTypes.oneOf(['default', 'numeric', 'email-address', 'phone-pad']),
    underneathText: PropTypes.string
}

export default InputAtom;