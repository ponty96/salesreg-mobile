import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import ButtonAtom from '../Atom/ButtonAtom';
import {saveCancelButton, saveCancelButtonText} from './../Style/exportStyles';
import styles from './../Style/Form';

class SaveCancelButton extends React.Component {

    navigateBack = () => {
        this.props.navigation.goBack();
    }

    create = () => {
        if (this.props.createfunc) {
            this.props.createfunc();
        }
    }

    render() {
        return (
            <View style={styles.saveCancelContainer}>
                <ButtonAtom
                    btnText="CANCEL"
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

SaveCancelButton.propTypes = {
    navigation: PropTypes.object.isRequired,
    createfunc: PropTypes.func,
    positiveButtonName: PropTypes.string.isRequired
}

export default SaveCancelButton;