import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";

import styles from './../Style/Auth';
import SignupForm from './../Components/SignupForm';
import AuthenticationHeader from './../Components/AuthenticationHeader';

class SignupScreen extends React.Component {
    render() {
        return (
            <View style = { styles.container }>
                <AuthenticationHeader />
                <Text style = { styles.signUpText }>
                    SIGN UP
                </Text>
                <View>
                    <KeyboardAvoidingView style={styles.formInnerLayer} behaviour="position">
                        <SignupForm  navigation={this.props.navigation}/>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}

export default SignupScreen;
