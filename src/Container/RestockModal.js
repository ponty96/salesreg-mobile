import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Icon} from 'native-base';

import ModalAtom from './../Atom/ModalAtom';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from './../Style/Screen';
import { marginlessInput, modalButton } from './../Style/exportStyles';

class RestockModal extends Component {
    state = {
        quantity: undefined,
        cost: undefined
    }

    static defaultProps = {
        visibility: false
    }

    getQuantity= (quantity) => {
        this.setState({quantity});
    }

    getCost= (cost) => {
        this.setState({cost});
    }

    save = () => {
        if (this.props.getValue) {
            this.props.getValue(this.state.quantity, this.state.cost);
        }
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
                    oonPress={() => this.props.closeModal()}
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
        return (
            <View
                style={styles.modalBody}
            >
                <Form>
                    <InputAtom
                        label="Quantity"
                        keyboardType={'numeric'}
                        getValue={this.getQuantity}
                        contStyle={marginlessInput}
                    />

                    <InputAtom
                        label="Cost price per pack"
                        keyboardType={'numeric'}
                        getValue={this.getCost}
                        contStyle={marginlessInput}
                    />

                    <ButtonAtom
                        btnText="Save"
                        onPress={this.save}
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

RestockModal.propTypes = {
    visibility: PropTypes.bool,
    headerText: PropTypes.string.isRequired,
    getValue: PropTypes.func,
    closeModal: PropTypes.func.isRequired
}

export default RestockModal;