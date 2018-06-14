import { Form, Icon } from 'native-base';
import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import ButtonAtom from '../Atom/ButtonAtom';
import InputAtom from '../Atom/InputAtom';
import ModalAtom from './../Atom/ModalAtom';
import { color } from './../Style/Color';

interface IProps {
  getValue?: (a: any) => void;
  closeModal?: () => void;
  headerText?: string;
  amount?: string;
  placeholder?: string;
  visibility: boolean;
}
interface IState {
  password: any;
}

class DeleteBuzModal extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  };

  state: IState = {
    password: ''
  };

  getPassword = (pass: any) => {
    this.setState({
      password: pass
    });
  };

  delete = () => {
    if (this.props.getValue) {
      this.props.getValue(this.state.password);
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
          <InputAtom
            label="Enter Password"
            getValue={this.getPassword}
            secureTextEntry={true}
            contStyle={styles.marginlessInput}
          />

          <ButtonAtom
            btnText="Delete"
            onPress={this.delete}
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

export default DeleteBuzModal;

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
  }
});
