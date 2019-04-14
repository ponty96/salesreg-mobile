import React from 'react'
import { StyleSheet, View } from 'react-native'

import InputAtom from '../../Atom/Form/InputAtom'
import ButtonAtom from '../../Atom/Form/ButtonAtom'
import Header from '../../Components/Header/BaseHeader'
import { UserContext } from '../../context/UserContext'
import { color } from '../../Style/Color'
import { MediumText, BoldText } from '../../Atom/TextAtom'
import { numberWithCommas } from '../../Functions/numberWithCommas'

interface IProps {
  navigation: any
  screenProps: any
  user?: any
}

class ChargeCalculatorScreen extends React.PureComponent<IProps> {
  state = {
    profit: '0',
    paymentCharge: '1.4%',
    amountNeededToCharge: 0
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Charge Calculator"
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
          onPressRightIcon={() => navigation.navigate('Notifications')}
        />
      )
    }
  }

  calculateCharge = () => {
    let { profit } = this.state,
      _paymentOverallCharge = 0.014 * Number(profit || 0)

    if (_paymentOverallCharge < 2000) {
      this.setState({
        paymentCharge: '1.4%',
        amountNeededToCharge:
          Number(profit || 0) /
          (0.986 - Number(this.props.user.company.saleCharge))
      })
    } else {
      this.setState({
        paymentCharge: '\u20A62000',
        amountNeededToCharge:
          (Number(profit || 0) + 2000) /
          (1 - Number(this.props.user.company.saleCharge))
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <InputAtom
          label="How much do you want to sell this product?"
          defaultValue={this.state.profit}
          keyboardType="numeric"
          getValue={profit => this.setState({ profit })}
        />
        <MediumText style={styles.text}>
          Payment Charge: {this.state.paymentCharge}
        </MediumText>
        <MediumText style={styles.text}>
          Service Charge: {Number(this.props.user.company.saleCharge) * 100}%
        </MediumText>
        <MediumText style={styles.text}>
          You need to charge{' '}
          <BoldText>
            {'\u20A6'}
            {numberWithCommas(
              Number(this.state.amountNeededToCharge.toFixed(2))
            )}
          </BoldText>
        </MediumText>
        <View style={styles.buttonContainer}>
          <ButtonAtom
            textStyle={{ color: '#fff' }}
            hideIcon
            btnText="Calculate"
            onPress={this.calculateCharge}
          />
        </View>
      </View>
    )
  }
}

const _ChargeCalculatorScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <ChargeCalculatorScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_ChargeCalculatorScreen.navigationOptions =
  ChargeCalculatorScreen.navigationOptions

export default _ChargeCalculatorScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  text: {
    color: color.textColor,
    fontSize: 15,
    marginTop: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  }
})
