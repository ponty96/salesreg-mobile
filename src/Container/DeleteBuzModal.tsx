import {Form, Icon} from 'native-base';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ButtonAtom from '../Atom/ButtonAtom';
import InputAtom from '../Atom/InputAtom';
import ModalAtom from './../Atom/ModalAtom';
import { marginlessInput, modalButton } from './../Style/exportStyles';
import styles from './../Style/Screen';

interface IDeleteBuzProps {
    getValue: (a: any) => void;
    closeModal: () => void;
    headerText: string;
    amount: string;
    placeholder: string;
    visibility: boolean;
}
interface IDeleteBuzState {
    password: any;
}

class DeleteBuzModal extends Component<IDeleteBuzProps, IDeleteBuzState> {
    public static defaultProps = {
        closeModal: PropTypes.func.isRequired,
        getValue: PropTypes.func,
        headerText: PropTypes.string.isRequired,
        visibility: false
    };

    public state = {
        password: ''
    };

    public getPassword = (pass: any) => {
        this.setState(
            {
                password: pass
            }
        );
    }

    public delete = () => {
        if (this.props.getValue) {
            this.props.getValue(this.state.password);
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
                        label='Enter Password'
                        getValue={this.getPassword}
                        secureTextEntry={true}
                        contStyle={marginlessInput}
                    />

                    <ButtonAtom
                        btnText='Delete'
                        transparent={false}
                        disabled={false}
                        funcValue=''
                        textStyle={false}
                        onPress={this.delete}
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

export default DeleteBuzModal;
