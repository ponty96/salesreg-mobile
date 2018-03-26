import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'

class NewBusinessScreen extends Component {    
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
          title: 'Ayo',
        };
    };
    
    render() {
        return (
            <View style={ styles.centerContainer }>
                <Text>{'NewBusinessScreen'}</Text>
            </View>
        )
    }
}

export default NewBusinessScreen