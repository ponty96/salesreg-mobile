import { Form, Icon } from 'native-base'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import ButtonAtom from '../Atom/ButtonAtom'
import ModalAtom from './../Atom/ModalAtom'
import styles from './../Style/Screen'
import styles1 from './../Style/exportStyles'

interface IProps {
  getValue?: (a: string) => void
  closeModal?: () => void
  headerText?: string
  limit?: any
  name?: string
  type?: 'customer' | 'business'
  visibility: boolean
}
interface IState {
  visibility: boolean
}

class DebtLimit extends React.PureComponent<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  }
  state: IState = {
    visibility: this.props.visibility
  }

  grant = () => {
    // console.log("grant is pressed");
  }

  stop = () => {
    // console.log("stop is pressed");
  }

  renderHeader = () => {
    return (
      <View style={styles.modalHeader}>
        <Icon name={'md-warning'} style={styles.modalWarningIcon} />
        <Text style={styles.modalHeaderText}>
          {this.props.type === 'customer' && 'Customer debt limit warning'}
          {this.props.type === 'business' && 'Total debt limit warning'}
        </Text>
        <TouchableOpacity
          onPress={() => this.setState({ visibility: !this.state.visibility })}
        >
          <Icon name={'md-close'} style={styles.modalCloseIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  renderBody = () => {
    return (
      <View style={styles.modalWarningBody}>
        <View style={{ paddingHorizontal: 16 }}>
          {this.props.type === 'customer' && (
            <Text>
              {this.props.name} has reached her debt limit of N
              <Text style={styles.redText}>{this.props.limit}</Text>. Do you
              want to continue granting debt to her?
            </Text>
          )}
          {this.props.type === 'business' && (
            <Text>
              {this.props.name} has reached a credit limit of N
              <Text style={styles.redText}>{this.props.limit}</Text>. Do you
              want to continue granting debt to customers?
            </Text>
          )}
        </View>
        <Form style={styles.modalButtonContainer}>
          <ButtonAtom
            btnText="Grant debt"
            transparent={true}
            btnStyle={styles1.modalWarningButton}
            onPress={this.grant}
          />

          <ButtonAtom
            btnText="Stop debt"
            onPress={this.stop}
            btnStyle={styles1.modalWarningButton}
          />
        </Form>
      </View>
    )
  }

  public renderFooter = () => {
    return (
      <View style={styles.modalHeader}>
        {this.props.type === 'customer' && (
          <Icon name={'info'} style={styles.modalCloseIcon} type={'Entypo'} />
        )}
        <Text
          style={[
            styles.modalHeaderText,
            this.props.type === 'business' && styles.modalBusinessFooter
          ]}
        >
          {this.props.type === 'customer' && (
            <Text>
              {this.props.name}'s debt will appear in&nbsp;
              <Text style={styles.redText}>red</Text>
              &nbsp;until her debt falls below&nbsp;
              <Text style={styles.redText}>N{this.props.limit}.</Text>
            </Text>
          )}
          {this.props.type === 'business' && (
            <Text>
              Total debt will appear in&nbsp;
              <Text style={styles.redText}>red</Text>
              &nbsp;until the debt falls below &nbsp;
              <Text style={styles.redText}>N{this.props.limit}.</Text>
            </Text>
          )}
        </Text>
      </View>
    )
  }

  public render() {
    return (
      <ModalAtom
        visible={this.state.visibility}
        body={this.renderBody()}
        header={this.renderHeader()}
        footer={this.renderFooter()}
      />
    )
  }
}

export default DebtLimit
