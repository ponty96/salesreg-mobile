import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView
} from 'react-native';

import LoginForm from '../Components/LoginForm';
import AuthenticationHeader from '../Components/AuthenticationHeader';
import { color } from '../Style/Color';
import { Mutation } from 'react-apollo';
import { LoginUserMutationGQL } from '../graphql/mutations/authenticate';
import { AuthenticateClientGQL } from '../graphql/client-mutations/authenticate';
import Auth from '../services/auth';

interface IProps {
  navigation: any;
  screenProps: any;
  login: any;
}

interface IState {}

class LoginScreen extends React.Component<IProps, IState> {
  componentDidMount() {
    Auth.clearVault();
  }
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationHeader />
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={[styles.signUpText, { fontFamily: 'SourceSansPro' }]}>
              LOGIN
            </Text>
            <Mutation
              mutation={LoginUserMutationGQL}
              onCompleted={this.onCompleted}
            >
              {(loginUser, { loading }) => (
                <KeyboardAvoidingView behavior="position">
                  <LoginForm
                    navigation={this.props.navigation}
                    loading={loading}
                    onSubmit={params =>
                      loginUser({
                        variables: {
                          ...params
                        }
                      })
                    }
                  />
                </KeyboardAvoidingView>
              )}
            </Mutation>
          </View>
        </ScrollView>
      </View>
    );
  }
  onCompleted = async data => {
    const {
      loginUser: {
        data: { accessToken, refreshToken, user }
      }
    } = data;
    const {
      screenProps: { client }
    } = this.props;

    await Auth.clearVault();
    await Auth.setToken(accessToken);
    await Auth.setRefreshToken(refreshToken);
    await Auth.setCurrentUser(user);
    await client.resetStore();
    client.mutate({ mutation: AuthenticateClientGQL });
    this.props.navigation.navigate('Home');
  };
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  signUpText: {
    color: color.button,
    alignSelf: 'center',
    fontSize: 16
  },
  wrapper: {
    paddingHorizontal: 32,
    marginTop: 32
  }
});
