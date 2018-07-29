import { Form, Icon } from 'native-base';
import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import ButtonAtom from '../Atom/ButtonAtom';
import InputAtom from '../Atom/InputAtom';
import ModalAtom from '../Atom/ModalAtom';
import { color } from '../Style/Color';

interface IProps {
  getValue?: (a: any, b: any) => void;
  closeModal?: () => void;
  headerText?: string;
  visibility: boolean;
  amount?: string;
}
interface IState {
  amount: any;
  balance: any;
}

class PaymentModal extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  };

  state: IState = {
    amount: '',
    balance: ''
  };

  getAmount = (amount: any) => {
    this.setState({ amount });
  };

  getBalance = (balance: any) => {
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
        <TouchableOpacity onPress={() => this.props.closeModal()}>
          <Icon name={'md-close'} style={styles.modalCloseIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  renderBody = () => {
    return (
      <View style={styles.modalBody}>
        <Form>
          <View style={styles.listTouchCont}>
            <InputAtom
              label="Amount paid"
              keyboardType={'numeric'}
              getValue={this.getAmount}
              contStyle={[
                styles.marginlessInput,
                styles.marginRight,
                styles.flexfull
              ]}
            />

            <InputAtom
              label="Balance"
              keyboardType={'numeric'}
              getValue={this.getBalance}
              contStyle={[styles.marginlessInput, styles.flexfull]}
            />
          </View>

          <View style={styles.listTouchCont}>
            <View style={styles.formViewContainer}>
              <InputAtom
                label="Balance due date"
                keyboardType={'numeric'}
                getValue={this.getAmount}
                contStyle={[
                  styles.marginlessInput,
                  styles.marginRight,
                  styles.flexfull
                ]}
              />
              <Text> dd-mm-yyyy </Text>
            </View>

            <Text style={styles.formViewContainer} />
          </View>

          <ButtonAtom
            btnText="Pay"
            onPress={this.pay}
            btnStyle={styles.modalButton}
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

export default PaymentModal;

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: color.grey
  },
  modalHeaderText: {
    fontSize: 16,
    color: color.menu,
    flex: 4
  },
  modalCloseIcon: {
    flex: 1,
    color: color.inactive,
    paddingLeft: 16
  },
  modalBody: {
    padding: 16
  },
  marginlessInput: {
    marginLeft: 0
  },
  modalButton: {
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    alignSelf: 'flex-end'
  },
  flexfull: {
    flex: 1
  },
  marginRight: {
    marginRight: 8
  },
  formViewContainer: {
    flex: 1,
    backgroundColor: color.secondary
  },
  listTouchCont: {
    flex: 1,
    flexDirection: 'row'
  }
});
