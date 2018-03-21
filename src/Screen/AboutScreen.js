import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './../Style/Screen';

class AboutScreen extends Component {
    render() {
        return (
            <View style={ styles.centerContainer }>
                <Text>{'AboutScreen'}</Text>
            </View>
        );
    }
}

export default AboutScreen;