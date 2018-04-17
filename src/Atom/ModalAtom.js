import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Modal } from 'react-native';

class ModalAtom extends Component {
    state = {
        visibility: this.props.visible
    }

    static defaultProps = {
        visible: false
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.visibility}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}
            >
                <View>
                    {this.props.header}
                    {this.props.body}
                    {this.props.footer}
                </View>
            </Modal>
        );
    }
}

ModalAtom.propTypes = {
    visible: PropTypes.boolean,
    footer: PropTypes.element,
    header: PropTypes.element,
    body: PropTypes.element
}

export default ModalAtom;