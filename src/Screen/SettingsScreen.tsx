import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import screenStyles from './../Style/Screen';
import styles from './../Style/Layout';
import ListItemAtom from './../Atom/ListItemAtom';

interface IProps {
    navigation: any;
}

interface IState {

}

class SettingsScreen extends PureComponent<IProps, IState> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Settings',
            headerLeft: <Icon
                        name={'md-arrow-back'}
                        style={screenStyles.headerIcon}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
        };
    }

    render() {
        return (
            <View
                style={[styles.defaultPadding, styles.formViewContainer]}
            >
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Debt')}
                    activeOpacity={1}
                >
                    <ListItemAtom
                        item={
                            {
                                name: 'Debt'
                            }
                        }
                        type={'debt'}
                        bodyfunction={() => this.props.navigation.navigate('Debt')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default SettingsScreen;