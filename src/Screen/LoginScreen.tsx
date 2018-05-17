import React from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';

import styles from './../Style/Auth';
import LoginForm from './../Components/LoginForm';
import AuthenticationHeader from './../Components/AuthenticationHeader';

interface IProps {
    navigation: any;
}

interface IState {

}

class LoginScreen extends React.Component<IProps, IState> {
    render() {
        return (
            <View style={styles.container}>
                <AuthenticationHeader />
                <View style = {styles.wrapper} >
                    <Text style = { styles.signUpText }>
                        LOGIN
                    </Text>
                    <KeyboardAvoidingView behavior='position'>
                        <LoginForm navigation={this.props.navigation}/>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}

export default LoginScreen;
