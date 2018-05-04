import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";

import styles from './../Style/Auth';
import LoginForm from './../Components/LoginForm';
import AuthenticationHeader from './../Components/AuthenticationHeader';

class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <AuthenticationHeader />
                <Text style = { styles.signUpText }>
                    LOGIN
                </Text>
                <View style = {styles.signUpFormWrapper} >
                    <View style={styles.formContainer}>
                        <KeyboardAvoidingView style={styles.formInnerLayer} behaviour="position">
                            <LoginForm navigation={this.props.navigation}/>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </View>
        );
    }
}

export default LoginScreen;
