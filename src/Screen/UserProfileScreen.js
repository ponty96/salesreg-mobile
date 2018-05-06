import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import styles1 from './../Style/Screen';
import styles2 from './../Style/Form';
import styles from "../Style/Screen";

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
            <View style = { styles1.container }>
                <View style = { [styles1.secondCompartment, styles1.bottomPadding] }>
                    <View style = { styles2.selfAlign }>
                    {
                        this.state.item.image
                        ?
                        <Image
                            source = {{ uri: this.state.item.image }}
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
                    <Text style = {[ styles2.selfAlign, styles1.detailItemWrapper ]}>
                        { this.state.item.name }
                    </Text>
                </View>
                <View style = { styles1.smallCompartment }>
                    <Text style = { styles1.indentLeft }>
                        Gender
                    </Text>
                    <Text style = { styles1.indentRight }>
                        { this.state.item.gender }
                    </Text>
                </View>
                <View style = { styles1.smallCompartment }>
                    <Icon
                        name = 'phone'
                        style = { styles1.indentLeft }
                        type={'FontAwesome'}
                    />
                    <Text style = { styles1.indentRight }>
                        { this.state.item.phoneNumber }
                    </Text>
                </View>
            </View>
        );
    }
}

//this has been set through the state and should be removed in production
UserProfileScreen.propTypes = {
    item: PropTypes.object
}

export default UserProfileScreen;