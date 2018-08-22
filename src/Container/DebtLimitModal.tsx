import { Form, Icon } from 'native-base'
import * as React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import ButtonAtom from '../Atom/ButtonAtom'
import InputAtom from '../Atom/InputAtom'
import ModalAtom from '../Atom/ModalAtom'
import { color } from '../Style/Color'

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
            contStyle={styles.marginlessInput}
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
            btnStyle={styles.modalButton}
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
  debtLimitWarning: {
    flexDirection: 'row'
  },
  creditLimit: {
    paddingTop: 15
  },
  modalInfoIcon: {
    paddingHorizontal: 8,
    color: color.inactive
  },
  debtLimitWarningText: {
    textAlign: 'justify'
  },
  menuColor: {
    color: color.menu
  },
  redText: {
    color: color.primary
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
})
