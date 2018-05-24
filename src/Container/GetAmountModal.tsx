import { Form, Icon } from 'native-base'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ButtonAtom from '../Atom/ButtonAtom'
import InputAtom from '../Atom/InputAtom'
import ModalAtom from './../Atom/ModalAtom'
import styles from './../Style/Screen'
import styles1 from '../Style/exportStyles'

interface IProps {
  getValue?: (a: any) => void
  closeModal?: () => void
  headerText?: string
  amount?: string
  placeholder?: string
  visibility: boolean
}
interface IState {
  amount: string
}

class GetAmountModal extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  }

  state: IState = {
    amount: ''
  }

  getAmount = (amount: string) => {
    this.setState({ amount })
  }

  pay = () => {
    if (this.props.getValue) {
      this.props.getValue(this.state.amount)
    }
    this.props.closeModal();
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
            label="Enter Amount"
            keyboardType={'numeric'}
            getValue={this.getAmount}
            contStyle={styles1.marginlessInput}
          />

          <ButtonAtom
            btnText="Pay"
            onPress={this.pay}
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

export default GetAmountModal
