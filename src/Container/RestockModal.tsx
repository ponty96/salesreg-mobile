import { Form, Icon, Radio, StyleProvider } from 'native-base';
import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import ButtonAtom from '../Atom/ButtonAtom';
import InputAtom from '../Atom/InputAtom';
import ModalAtom from './../Atom/ModalAtom';
import getTheme from './../native-base-theme/components';
import material from './../native-base-theme/variables/material';
import { color } from './../Style/Color';

interface IProps {
  getValue?: (a: any, b: any) => void;
  closeModal?: () => void;
  headerText?: string;
  amount?: string;
  placeholder?: string;
  visibility: boolean;
}
interface IState {
  packs: boolean;
  units: boolean;
  cost: any;
  quantity: any;
}

class RestockModal extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  };
  state: IState = {
    cost: 0,
    packs: false,
    quantity: 0,
    units: true
  };

  getQuantity = (quantity: number) => {
    this.setState({ quantity });
  };

  getCost = (cost: number) => {
    this.setState({ cost });
  };

  save = () => {
    if (this.props.getValue) {
      this.props.getValue(this.state.quantity, this.state.cost);
    }
    this.props.closeModal();
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

  handleSelection = (value: string) => {
    if (value === 'units') {
      this.setState({ units: true, packs: false });
    }

    if (value === 'packs') {
      this.setState({ packs: true, units: false });
    }
  };

  renderBody = () => {
    return (
      <StyleProvider style={getTheme(material)}>
        <View style={styles.modalBody}>
          <Form>
            <View style={styles.rowD}>
              <Text>Enter quantity</Text>
              <View style={styles.rowD}>
                <Radio
                  selected={this.state.units}
                  onPress={() => this.handleSelection('units')}
                  activeOpacity={1}
                  style={styles.radioMarginRight}
                />
                <Text>In units</Text>
              </View>
              <View style={styles.rowD}>
                <Radio
                  selected={this.state.packs}
                  onPress={() => this.handleSelection('packs')}
                  style={styles.radioMarginRight}
                  activeOpacity={1}
                />
                <Text>In packs</Text>
              </View>
            </View>
            <InputAtom
              label="Quantity"
              keyboardType={'numeric'}
              getValue={this.getQuantity}
              contStyle={styles.marginlessInput}
            />

            <InputAtom
              label="Cost price per pack"
              keyboardType={'numeric'}
              getValue={this.getCost}
              contStyle={styles.marginlessInput}
            />

            <ButtonAtom
              btnText="Save"
              onPress={this.save}
              btnStyle={styles.modalButton}
            />
          </Form>
        </View>
      </StyleProvider>
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

export default RestockModal;

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
  rowD: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  radioMarginRight: {
    marginRight: 4,
    borderColor: color.primary
  }
});
