import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ImageAtom from '../Atom/ImageAtom';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from '../Style/Screen';

export default class EditUserProfileScreen extends Component {
        render() {
            return (
                    <View style = { styles.container }>
                        <ImageAtom />
                    </View>
            )
        }
}