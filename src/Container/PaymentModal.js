import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { Form, Icon } from "native-base";

import ModalAtom from "./../Atom/ModalAtom";
import InputAtom from "../Atom/InputAtom";
import ButtonAtom from "../Atom/ButtonAtom";
import styles from "./../Style/Screen";
import styleLayout from "./../Style/Layout";
import styles1 from "./../Style/exportStyles";

class PaymentModal extends Component {
  state = {
    amount: undefined,
    balance: undefined
  };

  static defaultProps = {
    visibility: false
  };

  getAmount = amount => {
    this.setState({ amount });
  };

  getBalance = balance => {
    this.setState({ balance });
  };

  pay = () => {
    if (this.props.getValue) {
      this.props.getValue(this.state.amount, this.state.balance);
    }
  };

  renderHeader = () => {
    return (
      <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}>{this.props.headerText}</Text>
        <TouchableOpacity oonPress={() => this.props.closeModal()}>
          <Icon name={"md-close"} style={styles.modalCloseIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  renderBody = () => {
    return (
      <View style={styles.modalBody}>
        <Form>
          <View style={styleLayout.listTouchCont}>
            <InputAtom
              label="Amount paid"
              keyboardType={"numeric"}
              getValue={this.getAmount}
              contStyle={[
                styles1.marginlessInput,
                styles1.marginRight,
                styles1.flexfull
              ]}
            />

            <InputAtom
              label="Balance"
              keyboardType={"numeric"}
              getValue={this.getBalance}
              contStyle={[styles1.marginlessInput, styles1.flexfull]}
            />
          </View>

          <View style={styleLayout.listTouchCont}>
            <View style={styleLayout.formViewContainer}>
              <InputAtom
                label="Balance due date"
                keyboardType={"numeric"}
                getValue={this.getAmount}
                contStyle={[
                  styles1.marginlessInput,
                  styles1.marginRight,
                  styles1.flexfull
                ]}
              />
              <Text> dd-mm-yyyy </Text>
            </View>

            <Text style={styleLayout.formViewContainer} />
          </View>

          <ButtonAtom
            btnText="Pay"
            onPress={this.pay}
            btnStyle={styles1.modalButton}
          />
        </Form>
      </View>
    );
  };

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

PaymentModal.propTypes = {
  visibility: PropTypes.bool,
  headerText: PropTypes.string.isRequired,
  getValue: PropTypes.func,
  closeModal: PropTypes.func.isRequired
};

export default PaymentModal;
