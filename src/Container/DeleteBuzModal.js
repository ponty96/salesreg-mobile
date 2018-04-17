import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity} from 'react-native';
import {Form} from 'native-base';

import ModalAtom from './../Atom/ModalAtom';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from './../Style/Screen';

class DeleteBuzModal extends Component {
    state = {
        password: undefined
    }

    static defaultProps = {
        visibility: true
    }

    getPassword = (pass) => {
        this.setState(
            {
                password: pass
            }
        );
    }

    delete = () => {
        console.log('Delete if password is correct with entered password: ' + this.state.password);
    }

    renderHeader = () => {
        return (
            <View
            >
                <Text
                    style={styles.headerText}
                >
                    {this.props.headerText}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({visibility: !this.state.visibility});
                    }}
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
            <Form>
                <InputAtom
                    label="Enter Password"
                    getValue={this.getPassword}
                    secureTextEntry={true}
                />

                <ButtonAtom
                    btnText="Delete"
                    onPress={this.delete}
                />
            </Form>
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

DeleteBuzModal.propTypes = {
    visibility: PropTypes.boolean
}

export default DeleteBuzModal;