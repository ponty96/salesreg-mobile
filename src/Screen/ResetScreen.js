import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";

import styles from './../Style/Auth';
import ResetForm from './../Components/ResetForm';
import AuthenticationHeader from './../Components/AuthenticationHeader';

class ResetScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <AuthenticationHeader />
                <Text style = { styles.signUpText }>
                    RESET PASSWORD
                </Text>
                <View style = {styles.signUpFormWrapper} >
                    <View style={styles.formContainer}>
                        <KeyboardAvoidingView style={styles.formInnerLayer} behaviour="position">
                            <ResetForm navigation={this.props.navigation}/>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </View>
        );
    }
}

export default ResetScreen;