import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import styles from './../Style/Screen';

class OrderDetailsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Order Details',
            headerLeft: <Icon
                name={'md-arrow-back'}
                style={styles.headerIcon}
                onPress={() => {
                    navigation.goBack();
                }}
            />,
            headerRight: <TouchableOpacity
                onPress={() => {
                    navigation.navigate('NewOrderScreen', {
                        item: params.item
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
        // do change the list to the appropriate molecule
        return (
            <View style={ styles.centerContainer }>
                <Text>Order details Screen</Text>
            </View>
        )
    }
}

export default OrderDetailsScreen;