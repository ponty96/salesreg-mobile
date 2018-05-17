import React, { PureComponent } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';

import styles from './../Style/Auth';
import SignupForm from './../Components/SignupForm';
import AuthenticationHeader from './../Components/AuthenticationHeader';

interface IProps {
    navigation: any;
}

interface IState {

}

class SignupScreen extends PureComponent<IProps, IState> {
    render() {
        return (
            <View style = { styles.container }>
                <AuthenticationHeader />
                <ScrollView>
                    <View style = {styles.wrapper} >
                        <Text style = { styles.signUpText }>
                            SIGN UP
                        </Text>
                        <KeyboardAvoidingView  behavior={'position'}>
                            <SignupForm  navigation = {this.props.navigation}/>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default SignupScreen;
