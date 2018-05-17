import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

import styles from './../Style/Screen';

interface IProps {

}

interface IState {

}

class DebtDetailsScreen extends Component<IProps, IState> {

    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Debt Details',
            headerLeft: <Icon
                name={'md-arrow-back'}
                style={styles.headerIcon}
                onPress={() => {
                    navigation.goBack();
                }}
            />
        };
    }

    render() {
        // do change the list to the appropriate molecule
        return (
            <View style={ styles.centerContainer }>
                <Text>Debt details Screen</Text>
            </View>
        );
    }
}

export default DebtDetailsScreen;