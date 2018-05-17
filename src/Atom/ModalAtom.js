import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Modal } from "react-native";

import styles from "./../Style/Layout";

class ModalAtom extends Component {
  static defaultProps = {
    visible: false,
    centered: false
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalContainer}>
          <View
            style={this.props.centered ? styles.centerModal : styles.modalBody}
          >
            {this.props.header}
            {this.props.body}
            {this.props.footer}
          </View>
        </View>
      </Modal>
    );
  }
}

ModalAtom.propTypes = {
  visible: PropTypes.bool,
  footer: PropTypes.element,
  header: PropTypes.element,
  body: PropTypes.element,
  centered: PropTypes.bool
};

export default ModalAtom;
