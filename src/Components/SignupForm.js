import React from "react";
import {Form} from "native-base";
import PropTypes from 'prop-types';

import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';

class SigupForm extends React.Component {
    state = {
        phone: undefined,
        password: undefined,
        name: undefined,
        confirm_password: undefined
    }

    signup = () => {
        console.log(
            this.state.phone, this.state.password,
            this.state.name, this.state.confirm_password,
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

                <ButtonAtom
                    btnText="Sign up"
                    onPress={this.signup}
                />
                <ButtonAtom
                    btnText="I have an account already"
                    transparent={true}
                    funcValue = {'Login'}
                    onPress={this.navigate}
                />
            </Form>
        );
    }
}

SigupForm.propTypes = {
    navigation: PropTypes.object.isRequired
}

export default SigupForm;