import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'native-base';
import { Text } from 'react-native';

import styles from './../Style/Form';

class ButtonAtom extends Component {
    static defaultProps = {
        transparent: false,
    }

    render() {
        return (
            <Button
                transparent = {this.props.transparent}
                style = {[this.props.transparent ? styles.buttonTransparent : styles.buttonRed]}
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
}

export default ButtonAtom;