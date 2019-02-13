import React from 'react'
import { Text, Modal, StyleSheet, Alert } from 'react-native'
import { color } from '../Style/Color'
import Rave from 'react-native-rave'
import { Container } from 'native-base'
import FormHeader from '../Components/Header/FormHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Config from 'react-native-config'
import { UserContext } from '../context/UserContext'

interface IProps {
  amount: number | string
  email: string
  firstname: string
  lastname: string
  saleId: string
  onSuccess: (res) => void
  onError: (e) => void
  visible: boolean
  onClose: () => void
  user: any
  charge?: string
}

class CardPaymentAtom extends React.PureComponent<IProps> {
  handleBackPress = () => {
    Alert.alert(
      '',
      'Are you sure you want to cancel payments?',
      [
        {
          text: 'No',
          onPress: () => null
        },
        {
          text: 'Yes',
          onPress: this.props.onClose
        }
      ],
      { cancelable: false }
    )
  }

  handleTickPress = () => {
    Alert.alert(
      'Skip Payments!!!',
      'Do you want to skip payments and make them later through your invoice?',
      [
        {
          text: 'No',
          onPress: () => null
        },
        {
          text: 'Yes',
          onPress: () => this.props.onSuccess(null)
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    let _charge = this.props.charge || this.props.user.company.saleCharge,
      _amount =
        Number(this.props.amount) + Number(_charge) * Number(this.props.amount)

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this.handleTickPress}
      >
        <Container style={{ flex: 1 }}>
          <FormHeader
            onPressBackIcon={this.handleTickPress}
            currentStep={1}
            totalSteps={1}
            showTickIcon
            onPressTickIcon={this.handleTickPress}
            showBottomBorder={false}
          />

          <KeyboardAwareScrollView
            scrollEventThrottle={400}
            contentContainerStyle={styles.container}
          >
            <Text style={styles.headerText}>
              Let's sort out the payment for this order
            </Text>
            <Text style={styles.stepHint}>
              Note: {this.props.firstname || 'You'} will be charged{' '}
              {Number(_charge) * 100}
              {'% '}
              for this transaction
            </Text>
            <Rave
              amount={`${_amount}`}
              country="NG"
              currency="NGN"
              email={this.props.email}
              txref={`${this.props.saleId}_${Date.now()}`}
              firstname={this.props.firstname}
              lastname={this.props.lastname}
              secretkey={Config.FLUTTERWAVE_SECRET_KEY}
              publickey={Config.FLUTTERWAVE_PUBLIC_KEY}
              primarycolor={color.button}
              subaccounts={[
                {
                  id: this.props.user.company.bank.subaccountId
                }
              ]}
              paymenttype="both"
              page="card"
              meta={[{ metaname: 'saleId', metavalue: this.props.saleId }]}
              production={false}
              onSuccess={this.props.onSuccess}
              onFailure={this.props.onError}
            />
          </KeyboardAwareScrollView>
        </Container>
      </Modal>
    )
  }
}

const _CardPaymentAtom = props => (
  <UserContext.Consumer>
    {({ user }) => <CardPaymentAtom {...props} user={user} />}
  </UserContext.Consumer>
)
export default _CardPaymentAtom

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingBottom: 30
  },
  headerText: {
    alignSelf: 'flex-start',
    fontSize: 22,
    color: '#000',
    fontFamily: 'AvenirNext-DemiBold',
    marginBottom: 0,
    marginTop: 16
  },
  stepHint: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 16,
    color: color.textColor,
    marginTop: 8,
    marginBottom: 16
  }
})
