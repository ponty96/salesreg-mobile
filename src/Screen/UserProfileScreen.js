import React, { Component } from 'react';

import UserProfile from '../Components/UserProfile';

export default class UserProfileScreen extends Component {
    state = {
        image: undefined,
        name: 'Ayo Anwakang',
        gender: 'Female',
        phoneNumber: '09034567889, 08067654323'
    }

    render() {
        return (
            <UserProfile
                image = { this.state.image }
                name = { this.state.name }
                gender = { this.state.gender }
                phoneNumber = { this.state.phoneNumber }
            />
        );
    }
}