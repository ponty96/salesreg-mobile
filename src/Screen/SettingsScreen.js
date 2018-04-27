import React, { Component } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';

import screenStyles from './../Style/Screen';
import styles from './../Style/Layout';
import ListItemAtom from './../Atom/ListItemAtom';

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
            headerLeft: <Icon
                        name={'md-arrow-back'}
                        style={screenStyles.headerIcon}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />,
        };
    };

    render() {
        return (
            <View
                style={[styles.defaultPadding, styles.formViewContainer]}
            >
                <ListItemAtom
                    item={
                        {
                            name: 'kay5',
                        }
                    }
                    type={'debt'}
                    rightIconFunc={() => this.props.navigation.navigate('Debt')}
                />
            </View>
        );
    }
}

export default SettingsScreen