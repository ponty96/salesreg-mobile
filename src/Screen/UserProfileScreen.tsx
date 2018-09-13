import React, { Component } from 'react';

import UserProfile from '../Components/UserProfile';
import CustomHeader from '../Components/CustomHeader';
import Auth from '../services/auth';

interface IProps {
  navigation: any;
}

interface IState {
  list: any;
  fullName: string;
}

class UserProfileScreen extends Component<IProps, IState> {
  state = {
    list: {},
    fullName: ''
  };

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="User profile"
          onBackPress={() => navigation.goBack()}
          rightText="Edit"
          showRight
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onPressRightButton={() => navigation.navigate('EditUserProfile')}
        />
      )
    };
  };

  componentDidMount() {
    this.updateState();
  }

  updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser());
    this.setState({
      list: {
        Gender: user.gender || '',
        Phone: user.phone || '',
        Email: user.email,
        Address: user.address || ''
      },
      fullName: `${user.firstName} ${user.lastName}`
    });
  };
  render() {
    return <UserProfile list={this.state.list} name={this.state.fullName} />;
  }
}

export default UserProfileScreen;
