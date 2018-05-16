import {Form, Icon} from 'native-base';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import ButtonAtom from '../Atom/ButtonAtom';
import InputAtom from '../Atom/InputAtom';
import ModalAtom from './../Atom/ModalAtom';
import { flexfull, marginlessInput, marginRight, modalButton } from './../Style/exportStyles';
import styleLayout from './../Style/Layout';
import styles from './../Style/Screen';

interface IPayModalProps {
    getValue: (a: any, b: any) => void;
    closeModal: () => void;
    headerText: string;
    visibility: boolean;
    amount: string;
}
interface IPayModalState {
    amount: any;
    balance: any;
}

class PaymentModal extends Component<IPayModalProps, IPayModalState> {
    public static defaultProps = {
        closeModal: PropTypes.func.isRequired,
        getValue: PropTypes.func,
        headerText: PropTypes.string.isRequired,
        visibility: false
    };

    public state = {
        amount: '',
        balance: ''
    };

    public getAmount = (amount: any) => {
        this.setState({amount});
    }

    public getBalance = (balance: any) => {
        this.setState({balance});
    }

    public pay = () => {
        if (this.props.getValue) {
            this.props.getValue(this.state.amount, this.state.balance);
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
                    <View
                        style={styleLayout.listTouchCont}
                    >
                        <InputAtom
                            label='Amount paid'
                            keyboardType={'numeric'}
                            getValue={this.getAmount}
                            contStyle={[marginlessInput, marginRight, flexfull]}
                        />

                        <InputAtom
                            label='Balance'
                            keyboardType={'numeric'}
                            getValue={this.getBalance}
                            contStyle={[marginlessInput, flexfull]}
                        />
                    </View>

                    <View
                        style={styleLayout.listTouchCont}
                    >
                        <View
                            style={styleLayout.formViewContainer}
                        >
                            <InputAtom
                                label='Balance due date'
                                keyboardType={'numeric'}
                                getValue={this.getAmount}
                                contStyle={[marginlessInput, marginRight, flexfull]}
                            />
                            <Text> dd-mm-yyyy </Text>
                        </View>

                        <Text
                            style={styleLayout.formViewContainer}
                        />
                    </View>

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

export default PaymentModal;
