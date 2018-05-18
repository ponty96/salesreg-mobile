import { Form, Icon } from 'native-base'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ButtonAtom from '../Atom/ButtonAtom'
import InputAtom from '../Atom/InputAtom'
import ModalAtom from './../Atom/ModalAtom'
import styles from './../Style/Screen'
import styles1 from '../Style/exportStyles'

interface IProps {
  getValue?: (a: string) => void
  closeModal?: () => void
  headerText?: string
  amount?: string
  placeholder?: string
  visibility: boolean
}
interface IState {
  amount: string
}
class DebtLimitModal extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  }
  state: IState = {
    amount: ''
  }
  getAmount = (amount: string) => {
    this.setState({ amount })
  }

  set = () => {
    if (this.props.getValue) {
      this.props.getValue(this.state.amount)
    }
    this.props.closeModal()
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
    // tslint:disable-next-line:radix
    const amount = parseInt(this.state.amount)
    return (
      <View style={styles.modalBody}>
        <Form>
          <InputAtom
            floatingLabel={false}
            keyboardType={'numeric'}
            getValue={this.getAmount}
            contStyle={styles1.marginlessInput}
            placeholder={this.props.placeholder}
          />

          {amount > 0 && (
            <View style={[styles.debtLimitWarning, styles.creditLimit]}>
              <Icon
                name={'info'}
                style={styles.modalInfoIcon}
                type={'Entypo'}
              />
              <Text
                style={[
                  styles.modalHeaderText,
                  styles.debtLimitWarningText,
                  styles.menuColor
                ]}
              >
                Your total debt box turns &nbsp;
                <Text style={styles.redText}>RED</Text>
                &nbsp;when your total debt reaches the above amount
              </Text>
            </View>
          )}

          <ButtonAtom
            btnText="OK"
            onPress={this.set}
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

export default DebtLimitModal
