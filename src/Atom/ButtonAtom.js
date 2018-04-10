import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'native-base';
import { Text } from 'react-native';

import styles from './../Style/Form';

class ButtonAtom extends Component {
    static defaultProps = {
        transparent: false,
        disabled: false,
        funcValue: undefined
    }

    render() {
        return (
            <Button
                transparent = {this.props.transparent}
                disabled = {this.props.disabled}
                light = {this.props.disabled}
                style = {
                    [
                        this.props.transparent ? styles.buttonTransparent : styles.buttonRed,
                        this.props.disabled && styles.buttonDisabled
                    ]
                }
                onPress = {() => this.props.onPress(this.props.funcValue)}
            >
                <Text style = {this.props.transparent ? styles.textRed : styles.textTransparent}>
                    { this.props.btnText }
                </Text>
            </Button>
        );
    }
}

ButtonAtom.propTypes = {
    btnText: PropTypes.string.isRequired,
    transparent: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    funcValue: PropTypes.string
}

export default ButtonAtom;