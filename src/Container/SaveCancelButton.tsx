import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import ButtonAtom from '../Atom/ButtonAtom';
import styles from './../Style/Form';
import styles1 from '../Style/exportStyles';

interface ISaveCancelProps {
    navigation?: any;
    createfunc?: () => void;
    goBack?: () => void;
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
                    btnStyle={styles1.saveCancelButton}
                    textStyle={styles1.saveCancelButtonText}
                />

                <ButtonAtom
                    btnText={this.props.positiveButtonName}
                    transparent={true}
                    onPress={this.create}
                    btnStyle={styles1.saveCancelButton}
                    textStyle={styles1.saveCancelButtonText}
                />
            </View>
        );
    }
}

export default SaveCancelButton;
