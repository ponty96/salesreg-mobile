import { Form, Icon, Radio, StyleProvider } from 'native-base'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ButtonAtom from '../Atom/ButtonAtom'
import InputAtom from '../Atom/InputAtom'
import styleLayout from '../Style/Layout'
import ModalAtom from './../Atom/ModalAtom'
import getTheme from './../native-base-theme/components'
import material from './../native-base-theme/variables/material'
import styles from './../Style/Screen'
import styles1 from '../Style/exportStyles'

interface IProps {
  getValue?: (a: any, b: any) => void
  closeModal?: () => void
  headerText?: string
  amount?: string
  placeholder?: string
  visibility: boolean
}
interface IState {
  packs: boolean
  units: boolean
  cost: any
  quantity: any
}

class RestockModal extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  }
  state: IState = {
    cost: 0,
    packs: false,
    quantity: 0,
    units: true
  }

  getQuantity = (quantity: number) => {
    this.setState({ quantity })
  }

  getCost = (cost: number) => {
    this.setState({ cost })
  }

  save = () => {
    if (this.props.getValue) {
      this.props.getValue(this.state.quantity, this.state.cost)
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

  handleSelection = (value: string) => {
    if (value === 'units') {
      this.setState({ units: true, packs: false })
    }

    if (value === 'packs') {
      this.setState({ packs: true, units: false })
    }
  }

  renderBody = () => {
    return (
      <StyleProvider style={getTheme(material)}>
        <View style={styles.modalBody}>
          <Form>
            <View style={styleLayout.rowD}>
              <Text>Enter quantity</Text>
              <View style={styleLayout.rowD}>
                <Radio
                  selected={this.state.units}
                  onPress={() => this.handleSelection('units')}
                  activeOpacity={1}
                  style={styleLayout.radioMarginRight}
                />
                <Text>In units</Text>
              </View>
              <View style={styleLayout.rowD}>
                <Radio
                  selected={this.state.packs}
                  onPress={() => this.handleSelection('packs')}
                  style={styleLayout.radioMarginRight}
                  activeOpacity={1}
                />
                <Text>In packs</Text>
              </View>
            </View>
            <InputAtom
              label="Quantity"
              keyboardType={'numeric'}
              getValue={this.getQuantity}
              contStyle={styles1.marginlessInput}
            />

            <InputAtom
              label="Cost price per pack"
              keyboardType={'numeric'}
              getValue={this.getCost}
              contStyle={styles1.marginlessInput}
            />

            <ButtonAtom
              btnText="Save"
              onPress={this.save}
              btnStyle={styles1.modalButton}
            />
          </Form>
        </View>
      </StyleProvider>
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

export default RestockModal
