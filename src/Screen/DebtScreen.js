import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'

class DebtScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Debt',
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
                <Text>{'DebtScreen'}</Text>
            </View>
        )
    }
}

export default DebtScreen