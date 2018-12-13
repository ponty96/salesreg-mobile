import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { CreditCardInput } from 'react-native-credit-card-input'
import { color } from '../../Style/Color'

interface IProps {
  amount: number | string
  error?: string
  handleCardSelection: (card) => void
}

interface IState {
  cardInfo: {}
}

export default class CardPaymentAtom extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    cardInfo: {}
  }

  renderErrorText = () => {
    return this.props.error ? (
      <Text style={styles.errorText}>{this.props.error}</Text>
    ) : null
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderErrorText()}
        <Text style={styles.shareText}>Share the payment link</Text>
        <Text style={styles.orText}>OR</Text>
        <CreditCardInput
          autoFocus={true}
          cardFontFamily="AvenirNext-Regular"
          labelStyle={{ fontFamily: 'AvenirNext-Regular' }}
          inputStyle={{ fontFamily: 'AvenirNext-Regular' }}
          onChange={cardInfo => this.props.handleCardSelection(cardInfo)}
          addtionalInputsProps={{
            pin: {
              default: '',
              maxLength: 4,
              keyboardType: 'numeric',
              placeholder: 'PIN'
            }
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  shareText: {
    color: color.link,
    fontSize: 16,
    marginBottom: 0,
    marginTop: 2,
    fontFamily: 'AvenirNext-Medium',
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  errorText: {
    marginLeft: 0,
    fontSize: 14,
    marginBottom: 2,
    marginTop: 0,
    fontFamily: 'AvenirNext-Regular',
    color: 'red',
    paddingVertical: 12
  },
  orText: {
    color: color.textColor,
    fontSize: 16,
    marginVertical: 15,
    fontFamily: 'AvenirNext-Bold',
    textAlign: 'center'
  }
})
