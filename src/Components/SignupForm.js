import React from "react";
import {Form} from "native-base";
import PropTypes from 'prop-types';
import { View } from 'react-native';

import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import SelectGenderAtom from '../Atom/SelectGenderAtom';
import styles from '../Style/Screen';
import styles1 from '../Style/Form';
import { redButtonText } from '../Style/exportStyles';

class SigupForm extends React.Component {
    state = {
        phone: undefined,
        password: undefined,
        name: undefined,
        confirm_password: undefined,
        gender: undefined
    }

    signup = () => {
        console.log(
            this.state.phone, this.state.password,
            this.state.name, this.state.confirm_password, this.state.gender
        );
    }

    getPhone = (phone) => {
        this.setState({
                phone
        });
    }

    getPassword = (pass) => {
        this.setState({
            password: pass
        });
    }

    getName = (name) => {
        this.setState({
            name
        });
    }

    getConfirm = (confirm_pass) => {
        this.setState({
            confirm_password: confirm_pass
        });
    }

    updateGender = (selectedGender) => {
        this.setState({
            gender: selectedGender
        })
    }

    navigate = (location) => {
        this.props.navigation.navigate(location)
    }

    render() {
        return (
            <Form>

                <InputAtom
                    label="Full name"
                    getValue={this.getName}
                />

                <InputAtom
                    label="Phone number"
                    getValue={this.getPhone}
                    keyboardType="numeric"
                />

                <View style = { [styles.genderPickerWidth, styles1.genderPickerStyle] }>
                    <SelectGenderAtom
                        gender = { this.state.gender }
                        updateGender = { this.updateGender }
                    />
                </View>

                <InputAtom
                    label="Password"
                    getValue={this.getPassword}
                    secureTextEntry={true}
                />

                <InputAtom
                    label="Reenter-password"
                    getValue={this.getConfirm}
                    secureTextEntry={true}
                />

                <View style = { styles1.buttonsWrapper }>
                    <ButtonAtom
                        btnText="Sign up"
                        onPress={this.signup}
                        textStyle = { redButtonText }
                    />
                    <ButtonAtom
                        btnText="I have an account already"
                        transparent={true}
                        funcValue = {'Login'}
                        onPress={this.navigate}
                    />
                </View>
            </Form>
        );
    }
}

SigupForm.propTypes = {
    navigation: PropTypes.object.isRequired
}

export default SigupForm;