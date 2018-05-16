import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import ButtonAtom from '../Atom/ButtonAtom';
import {saveCancelButton, saveCancelButtonText} from './../Style/exportStyles';
import styles from './../Style/Form';

interface ISaveCancelProps {
    navigation: any;
    createfunc: () => void;
    goBack: () => void;
    positiveButtonName: string;
}

class SaveCancelButton extends React.Component<ISaveCancelProps, any> {
    public static defaultProps = {
        createfunc: PropTypes.func,
        navigation: PropTypes.object.isRequired,
        positiveButtonName: PropTypes.string.isRequired
    };

    public navigateBack = () => {
        this.props.navigation.goBack();
    }

    public create = () => {
        if (this.props.createfunc) {
            this.props.createfunc();
        }
    }

    public render() {
        return (
            <View style={styles.saveCancelContainer}>
                <ButtonAtom
                    btnText='CANCEL'
                    transparent={true}
                    onPress={this.navigateBack}
                    btnStyle={saveCancelButton}
                    textStyle={saveCancelButtonText}
                />

                <ButtonAtom
                    btnText={this.props.positiveButtonName}
                    transparent={true}
                    onPress={this.create}
                    btnStyle={saveCancelButton}
                    textStyle={saveCancelButtonText}
                />
            </View>
        );
    }
}

export default SaveCancelButton;
