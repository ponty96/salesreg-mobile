import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
            headerLeft: <Icon
                        name={'md-arrow-back'}
                        style={styles.headerIcon}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />,
        };
    };

    render() {
        return (
            <View style={ styles.centerContainer }>
                <Text>{'SettingsScreen'}</Text>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Debt');
                    }}
                    title={'debt'}
                />
            </View>
        );
    }
}

export default SettingsScreen