import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";

import LoginForm from "./../Components/LoginForm";
import styles from './../Style/Auth'

class AuthLayout extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.redView}>
                    <View style={styles.appName}>
                        <Text style={styles.appText}>{'SME APP'}</Text>
                    </View>
                </View>
                <View style={styles.whiteView} />
                <View style={styles.formContainer}>
                    <KeyboardAvoidingView style={styles.formInnerLayer} behaviour="position">
                        <LoginForm />
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}

export default AuthLayout;
