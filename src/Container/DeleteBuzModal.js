import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { Form, Icon } from 'native-base'

import ModalAtom from './../Atom/ModalAtom'
import InputAtom from '../Atom/InputAtom'
import ButtonAtom from '../Atom/ButtonAtom'
import styles from './../Style/Screen'
import styles1 from '../Style/exportStyles'

class DeleteBuzModal extends Component {
  state = {
    password: undefined
  }

  static defaultProps = {
    visibility: false
  }

  getPassword = pass => {
    this.setState({
      password: pass
    })
  }

  delete = () => {
    if (this.props.getValue) {
      this.props.getValue(this.state.password)
    }
  }

  renderHeader = () => {
    return (
      <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}>{this.props.headerText}</Text>
        <TouchableOpacity onPress={() => this.props.closeModal()}>
          <Icon name={'md-close'} style={styles.modalCloseIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  renderBody = () => {
    return (
      <View style={styles.modalBody}>
        <Form>
          <InputAtom
            label="Enter Password"
            getValue={this.getPassword}
            secureTextEntry={true}
            contStyle={styles1.marginlessInput}
          />

          <ButtonAtom
            btnText="Delete"
            onPress={this.delete}
            btnStyle={styles1.modalButton}
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
    )
  }
}

DeleteBuzModal.propTypes = {
  visibility: PropTypes.bool,
  headerText: PropTypes.string.isRequired,
  getValue: PropTypes.func,
  closeModal: PropTypes.func.isRequired
}

export default DeleteBuzModal
