import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Icon} from 'native-base';

import ModalAtom from './../Atom/ModalAtom';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from './../Style/Screen';
import { marginlessInput, modalButton } from './../Style/exportStyles';

class DebtLimitModal extends Component {
    state = {
        amount: undefined
    }

    static defaultProps = {
        visibility: false
    }

    getAmount= (amount) => {
        this.setState({amount});
    }

    set = () => {
        if (this.props.getValue) {
            this.props.getValue(this.state.amount);
        }
        this.props.closeModal();
    }

    renderHeader = () => {
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

    renderBody = () => {
        let amount = parseInt(this.state.amount);
        return (
            <View
                style={styles.modalBody}
            >
                <Form>
                    <InputAtom
                        floatingLabel={false}
                        keyboardType={'numeric'}
                        getValue={this.getAmount}
                        contStyle={marginlessInput}
                        placeholder={this.props.placeholder}
                    />

                    {(amount > 0)
                        && <View
                            style={[styles.debtLimitWarning, styles.creditLimit]}
                        >
                            <Icon
                                name={'info'}
                                style={styles.modalInfoIcon}
                                type={'Entypo'}
                            />
                            <Text
                                style={
                                    [
                                        styles.modalHeaderText,
                                        styles.debtLimitWarningText,
                                        styles.menuColor
                                    ]
                                }
                            >
                                Your total debt box turns &nbsp;
                                <Text
                                    style={styles.redText}
                                >
                                    RED
                                </Text>
                                &nbsp;when your total debt reaches the above amount
                            </Text>
                        </View>
                    }

                    <ButtonAtom
                        btnText="OK"
                        onPress={this.set}
                        btnStyle={modalButton}
                    />
                </Form>
            </View>
        )
    }

    render() {
        return (
            <ModalAtom
                visible={this.props.visibility}
                body={this.renderBody()}
                header={this.renderHeader()}
            />
        );
    }
}

DebtLimitModal.propTypes = {
    visibility: PropTypes.bool,
    headerText: PropTypes.string.isRequired,
    getValue: PropTypes.func,
    closeModal: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}

export default DebtLimitModal;