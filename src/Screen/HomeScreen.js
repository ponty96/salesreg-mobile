import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from './../Style/Screen'

class HomeScreen extends Component {
    render() {
        return (
            <View style={ styles.centerContainer }>
                <Text>{'HomeScreen'}</Text>
            </View>
        )
    }
}

export default HomeScreen