import React from 'react';
import { View } from 'react-native';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from './../Style/Form';
import styles1 from '../Style/exportStyles';

interface IProps {
    navigation?: any;
    createfunc?: () => void;
    positiveButtonName: string;
}

class SaveCancelButton extends React.Component<IProps, any> {

    create = () => {
        if (this.props.createfunc) {
            this.props.createfunc();
        }
    }

    render() {
        return (
            <View style={styles.saveCancelContainer}>
                <ButtonAtom
                    btnText='CANCEL'
                    transparent={true}
                    onPress={() => this.props.navigation.goBack()}
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
