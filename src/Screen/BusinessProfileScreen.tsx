import React, { Component } from 'react';

import UserProfile from '../Components/UserProfile';
import CustomHeader from '../Components/CustomHeader';
import Auth from '../services/auth';
import humps from 'humps';

interface IProps {
  navigation: any;
}

interface IState {
  list: any;
  businessName: string;
}

class BusinessProfileScreen extends Component<IProps, IState> {
  state = {
    list: {},
    businessName: ''
  };

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Business profile"
          onBackPress={() => navigation.goBack()}
          rightText="Edit"
          showRight
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onPressRightButton={() => navigation.navigate('EditBusinessProfile')}
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
        Email: user.company.contactEmail || '',
        Category: user.company.category
          ? humps.pascalize(user.company.category)
          : '',
        Currency: user.company.currency || '',
        Location: this.parseLocation(user.company),
        Description: user.company.about || ''
      },
      businessName: user.company.title
    });
  };

  parseLocation = ({ branches }) => {
    const {
      location: { city, state, street1, country }
    } = branches.find(branch => branch.type == 'head_office');
    return `${street1} ${city} ${state} ${country}`;
  };

  render() {
    return (
      <UserProfile
        list={this.state.list}
        businessName={this.state.businessName}
      />
    );
  }
}

export default BusinessProfileScreen;
