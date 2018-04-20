import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'
import { color } from './../Style/Color'
import NewOrderForm from '../Components/NewOrderForm';

class NewOrderScreen extends Component {    
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'kay5ive Attractions',
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
            <View>
               <NewOrderForm navigation={this.props.navigation} /> 
            </View>
        )
    }
}

export default NewOrderScreen