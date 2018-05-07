import React from "react";
import { Text, View, KeyboardAvoidingView, ScrollView } from "react-native";

import styles from './../Style/Auth';
import SignupForm from './../Components/SignupForm';
import AuthenticationHeader from './../Components/AuthenticationHeader';

class SignupScreen extends React.Component {
    render() {
        return (
            <View style = { styles.container }>
                <AuthenticationHeader />
                <ScrollView>
                    <View style = {styles.wrapper} >
                        <Text style = { styles.signUpText }>
                            SIGN UP
                        </Text>
                        <KeyboardAvoidingView  behaviour="position">
                            <SignupForm  navigation = {this.props.navigation}/>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default SignupScreen;
