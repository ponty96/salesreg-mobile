import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { CreditCardInput } from 'react-native-credit-card-input'
import { color } from '../../Style/Color'

interface IProps {
  amount: number | string
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.shareText}>Share the payment link</Text>
        <Text style={styles.orText}>OR</Text>
        <CreditCardInput
          autoFocus={true}
          cardFontFamily="AvenirNext-Regular"
          labelStyle={{ fontFamily: 'AvenirNext-Regular' }}
          inputStyle={{ fontFamily: 'AvenirNext-Regular' }}
          onChange={cardInfo => this.setState({ cardInfo })}
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
  orText: {
    color: color.textColor,
    fontSize: 16,
    marginVertical: 15,
    fontFamily: 'AvenirNext-Bold',
    textAlign: 'center'
  }
})
