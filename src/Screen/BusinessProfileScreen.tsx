import React, { Component } from 'react'

import UserProfile from '../Components/UserProfile'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

interface IState {
  list: any
}

class BusinessProfileScreen extends Component<IProps, IState> {
  state = {
    // item: this.props.navigation.state.params.data
    list: [
      {
        section: 'Location',
        value: '6 Salem street Morogbo, Lagos'
      },
      {
        section: 'Email',
        value: 'ayo@gmail.com'
      },
      {
        section: 'Category',
        value: 'Product, Services'
      },
      {
        section: 'Currency',
        value: 'Naira \u20A6'
      },
      {
        section: 'Description',
        value:
          // tslint:disable-next-line:max-line-length
          'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard of dummy text since the 1500s, when an unknown printer took a gallery'
      }
    ]
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Business profile"
          onBackPress={() => navigation.goBack()}
          rightText="Edit"
          right
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onPressRightButton={() => navigation.navigate('EditBusinessProfile')}
        />
      )
    }
  }

  render() {
    return (
      <UserProfile list={this.state.list} businessName="Kay5ive Attractions" />
    )
  }
}

export default BusinessProfileScreen
