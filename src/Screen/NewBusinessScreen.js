import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'
import { color } from './../Style/Color'

class NewBusinessScreen extends Component {    
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        let right = (params && params.items && params.items.length > 0)
                    ?   <Icon
                            name={'ios-search'}
                            style={styles.headerIcon}
                        />
                    :   <View style={styles.headerItem}>
                            <Icon
                                name={'logout'}
                                style={styles.headerIconLogout}
                                type={'MaterialCommunityIcons'}
                            />
                            <Text style={styles.headerText}>Logout</Text>
                        </View>;
        let left = (params && params.items && params.items.length > 0)
                    ?   <Icon
                            name={'menu'}
                            onPress={() => navigation.navigate('DrawerToggle')}
                            style={styles.headerIcon}
                        />
                    :   null;
        return {
            title: 'Ayo',
            headerRight: right,
            headerLeft: left
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