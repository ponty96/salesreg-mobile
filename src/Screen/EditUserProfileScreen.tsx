import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Mutation } from "react-apollo";
import CustomHeader from '../Components/CustomHeader';
import EditUserProfileForm from '../Components/EditUserProfileForm';
import SaveCancelButton from '../Container/SaveCancelButton';
import { EditUserProfileMutationGQL } from "../graphql/mutations/authenticate"
import { color } from '../Style/Color';

interface IProps {
  navigation: any;
}

// interface IState {}

class EditUserProfileScreen extends Component<IProps, any> {
  public state = {};

  // tslint:disable-next-line:member-ordering
  public static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Edit Profile"
          // tslint:disable-next-line:jsx-no-lambda
          onBackPress={() => navigation.goBack()}
        />
      )
    };
  };

  public render() {
    return (
      <View style={styles.formViewContainer}>
          <Mutation
            mutation={EditUserProfileMutationGQL}
            onCompleted={this.onCompleted}
          >
        {editUserProfile =>  
        (
        <EditUserProfileForm phoneNumber="" editUser={editUserProfile} />
        <SaveCancelButton
          positiveButtonName="SAVE"
          navigation={this.props.navigation}
        />
        )}
        </Mutation>
      </View>
    );
  }
  public onCompleted = async data => {
    const { registerCompany } = data
    if (registerCompany.success) {
      Alert.alert(
        'Registration Success',
        'Verify your account via the link sent to your email',
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate('Login') }
        ],
        { cancelable: false }
      )
    }
  }
}

export default EditUserProfileScreen;

const styles = StyleSheet.create({
  formViewContainer: {
    flex: 1,
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
});
