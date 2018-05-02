import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { Image, View, Text } from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import styles1 from './../Style/Screen';
import styles2 from './../Style/Form';

export default class UserProfileScreen extends Component {
    state = {
        image: undefined,
        name: 'Ayo Anwakang',
        gender: 'Female',
        phoneNumber: '09034567889, 08067654323'
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
                        <Icon1
                            name = "user-circle"
                            size = { 150 }
                            style = { styles2.icon }
                        />
                    }
                    </View>
                    <Text style = {[ styles2.selfAlign, styles1.detailItemWrapper ]}>
                        { this.state.name }
                    </Text>
                </View>
                <View style = { styles1.smallCompartment }>
                    <Text style = { styles1.indentLeft }>
                        Gender
                    </Text>
                    <Text style = { styles1.indentRight }>
                        { this.state.gender }
                    </Text>
                </View>
                <View style = { styles1.smallCompartment }>
                    <Icon
                        name = 'phone'
                        style = { styles1.indentLeft }
                        type={'FontAwesome'}
                    />
                    <Text style = { styles1.indentRight }>
                        { this.state.phoneNumber }
                    </Text>
                </View>
            </View>
        );
    }
}