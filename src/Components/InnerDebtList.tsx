import React, { PureComponent } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'

import AboveAccordionAtom from '../Atom/AboveAccordionAtom'
import styles from '../Style/OrderList'
import AccordionAtom from '../Atom/AccordionAtom'
import GetAmountModal from '../Container/GetAmountModal'
import ButtonAtom from '../Atom/ButtonAtom'

interface IProps {}

interface IState {
  visibility: boolean
  icon: string
}

class InnerDebtList extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      visibility: false,
      icon: 'md-arrow-dropdown'
    }
  }

    openModal = () => {
        this.setState({
            visibility: true
        })
    };

    closeModal = () => {
        this.setState({
            visibility: false
        })
    };

  changeIcon = () => {
    if (this.state.icon === 'md-arrow-dropdown') {
      this.setState({ visibility: true })
    } else {
      this.setState({ visibility: false })
    }
  }

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <AboveAccordionAtom
            uri={undefined}
            name="Ayo Aregbede"
            totalAmount="10,000"
          />
          <TouchableOpacity onPress={this.changeIcon}>
            <AccordionAtom icon="md-arrow-dropdown" />
          </TouchableOpacity>
          <ButtonAtom
            onPress={this.openModal}
            btnText="Pay debt"
            btnStyle={styles.compInner}
          />
            <GetAmountModal
            headerText="Pay Debt"
            closeModal={this.closeModal}
            visibility={this.state.visibility}
          />
        </ScrollView>
      </View>
    )
  }
}

export default InnerDebtList
