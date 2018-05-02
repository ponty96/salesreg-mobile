import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Form } from "native-base";

import InputAtom from '../Atom/InputAtom';
import SelectGenderAtom from '../Atom/SelectGenderAtom';
import ImageAtom from '../Atom/ImageAtom';
import styles1 from './../Style/Layout';
import styles from './../Style/Screen';
import SaveCancelButton from "../Container/SaveCancelButton";
import { marginlessInput } from './../Style/exportStyles';

export default class EditUserProfileScreen extends Component {
    state = {
        name: 'Ayo Anwakasng',
        phoneNumber: '09034567889, 08067654323',
        image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
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

    getImage = (pic) => {
        this.setState({
            image: pic
        })
    }

    render() {
        return (
                <View style = { styles1.formViewContainer }>
                    <KeyboardAvoidingView 
                        behavior = 'padding' 
                        style = { styles1.itemsContainer }
                    >
                        <ScrollView>
                            <ImageAtom
                                source = { this.state.image }
                                getValue = { this.getImage }
                            />
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
                                    keyboardType = 'numeric'
                                />
                            </View> 
                            <View style = {[ styles.indentLeft, styles.editDetailsWrapper, styles.genderPickerWidth ]}>
                                <Text style = { styles.textTitle }>
                                    Gender
                                </Text>
                                <SelectGenderAtom />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <SaveCancelButton
                        positiveButtonName = 'SAVE'
                    />
                </View>
        )
    }
}