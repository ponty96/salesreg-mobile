import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
import styles from './../Style/Layout';

interface IProps {
    icon: string
    type: any
    detailText: string
}

export default class DetailItemAtom extends Component<IProps, any> {
    render() {
        return(
            <View style = {styles.detailItemWrapper}>
                <Text>
                    <Icon
                        name = { this.props.icon }
                        type = { this.props.type }
                    />
                </Text>
                <Text style = {styles.detailText}>
                    {this.props.detailText}
                </Text>
            </View>);
    }
}
