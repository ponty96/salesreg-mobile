import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Image, View, Text } from 'react-native';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import UserProfile from '../Components/UserProfile';

class UserProfileScreen extends Component {
    state = {
        item: this.props.navigation.state.params.data
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.name,
            headerLeft: <Icon
                name={'md-arrow-back'}
                style={styles.headerIcon}
                onPress={() => {
                    navigation.goBack();
                }}
            />,
            headerRight: <TouchableOpacity
                onPress={() => {
                    navigation.navigate('NewBusiness', {
                        data: params.data
                    });
                }}
            >
                <View style={styles.headerItem}>
                    <Icon
                        name={'pencil'}
                        style={styles.headerIconLogout}
                        type={'MaterialCommunityIcons'}
                    />
                    <Text style={styles.headerText}>Edit</Text>
                </View>
            </TouchableOpacity>
        };
    };

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

//this has been set through the state and should be removed in production
UserProfileScreen.propTypes = {
    item: PropTypes.object
}

export default UserProfileScreen;