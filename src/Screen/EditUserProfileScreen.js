import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';

import ImageAtom from '../Atom/ImageAtom';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from '../Style/Screen';

export default class EditUserProfileScreen extends Component {
    state = {
        name: 'Ayo Anwakasng',
        phoneNumber: '09034567889, 08067654323'
    }

    getName = (text) => {
        this.setState(
            {
                name: text
            }
        )
    }

    getPhoneNumber = (number) => {
        this.setState(
            {
                phoneNumber: number
            }
        )
    }

    render() {
        return (
                <View style = { styles.container }>
                    <ImageAtom />
                    <View style = {[ styles.indentLeft, styles.indentRight, styles.editDetailsWrapper ]}>
                        <InputAtom 
                            label = 'Name:'
                            defaultValue = { this.state.name }
                            getValue = { this.getName }
                        />
                    </View>
                    <View style = {[ styles.indentLeft, styles.indentRight, styles.editDetailsWrapper ]}>
                        <InputAtom 
                            label = 'Phone number(separate multiple with commas):'
                            defaultValue = { this.state.phoneNumber }
                            getValue = { this.getPhoneNumber }
                        />
                    </View>
                </View>
        )
    }
}