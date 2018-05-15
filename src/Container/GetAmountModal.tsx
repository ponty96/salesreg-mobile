import {Form, Icon} from 'native-base';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ButtonAtom from '../Atom/ButtonAtom';
import InputAtom from '../Atom/InputAtom';
import ModalAtom from './../Atom/ModalAtom';
import { marginlessInput, modalButton } from './../Style/exportStyles';
import styles from './../Style/Screen';

interface ILimitModalProps {
    getValue: (a: any) => void;
    closeModal: () => void;
    headerText: string;
    amount: string;
    placeholder: string;
    visibility: boolean;
}
interface ILimitModalState {
    amount: string;
}

class GetAmountModal extends Component<ILimitModalProps, ILimitModalState> {
    public static defaultProps = {
        closeModal: PropTypes.func.isRequired,
        getValue: PropTypes.func,
        headerText: PropTypes.string.isRequired,
        visibility: false
    };

    public state = {
        amount: ''
    };

    public getAmount = (amount: string) => {
        this.setState({amount});
    }

    public pay = () => {
        if (this.props.getValue) {
            this.props.getValue(this.state.amount);
        }
    }

    public renderHeader = () => {
        return (
            <View
                style={styles.modalHeader}
            >
                <Text
                    style={styles.modalHeaderText}
                >
                    {this.props.headerText}
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.closeModal()}
                >
                    <Icon
                        name={'md-close'}
                        style={styles.modalCloseIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    public renderBody = () => {
        return (
            <View
                style={styles.modalBody}
            >
                <Form>
                    <InputAtom
                        label='Enter Amount'
                        keyboardType={'numeric'}
                        getValue={this.getAmount}
                        contStyle={marginlessInput}
                    />

                    <ButtonAtom
                        btnText='Pay'
                        onPress={this.pay}
                        btnStyle={modalButton}
                    />
                </Form>
            </View>
        );
    }

    public render() {
        return (
            <ModalAtom
                visible={this.props.visibility}
                body={this.renderBody()}
                header={this.renderHeader()}
            />
        );
    }
}

export default GetAmountModal;
