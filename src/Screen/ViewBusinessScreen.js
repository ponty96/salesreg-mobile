import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'

class ViewBusinessScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
          title: params.name,
          headerRight: <Icon
                    name={'ios-search'}
                    style={styles.headerIcon}
                />,
        };
    };

    render() {
        return (
            <View style={ styles.centerContainer }>
                <Text>{'ViewBusinessScreen'}</Text>
            </View>
        )
    }
}

export default ViewBusinessScreen