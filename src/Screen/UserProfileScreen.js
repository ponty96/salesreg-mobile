import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles1 from './../Style/Screen';
import styles2 from './../Style/Form';

export default class UserProfileScreen extends Component {
    state = {
        image: undefined,
        name: 'Ayo Anwakang'
    }

    render() {
        return (
            <View style = { styles1.container }>
                <View style = { [styles1.secondCompartment, styles1.bottomPadding] }>
                    <View style = { styles2.selfAlign }>
                    {
                        this.state.image
                        ?
                        <Image
                            source = {{ uri: this.state.image }}
                            style = { styles2.imgContainer }
                        />
                        :
                        <Icon
                            name = "user-circle"
                            size = { 150 }
                            style = { styles2.icon }
                        />
                    }
                    </View>
                    <Text style = {styles2.selfAlign}>
                            { this.state.name }
                    </Text>
                </View>
            </View>
        );
    }
}