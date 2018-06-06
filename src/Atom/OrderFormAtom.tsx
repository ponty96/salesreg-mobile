import * as React from 'react'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Header, Text, Left, Right, Icon } from 'native-base'
import InputAtom from './InputAtom'
import NewOrderCardAtom from './NewOrderCardAtom'
import ButtonAtom from './ButtonAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}
interface IState {
  customer: string
  textInput: any
}

class OrderFormAtom extends React.Component<IProps, IState> {
  state: IState = {
    customer: '',
    textInput: []
  }

  getCustomer = (customer: string) => {
    this.setState({ customer })
  }
  makePayment = () => {
    console.log()
  }
  removeTextInput = () => {
    this.state.textInput.pop()
    let textInput = this.state.textInput
    this.setState({
      textInput
    })
  }
  addTextInput = (key: any) => {
    let textInput = this.state.textInput
    textInput.push(
      <NewOrderCardAtom key={key} onPress={this.removeTextInput} />
    )
    this.setState({ textInput })
  }
  navigate = (location: string) => {
    this.props.navigation.navigate(location)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.itemsContainer1}>
        <Header style={styles.headerOrder}>
          <Left style={styles.leftOrder}>
            <Icon style={styles.iconOrder} name="md-cart" />
            <Text>0</Text>
          </Left>
          <Right>
            <Text>
              Total: <Text style={styles.redColorText}>#0.00</Text>
            </Text>
          </Right>
        </Header>
        <ScrollView>
          <View style={styles.innerItemContainer}>
            <View style={styles.cusName}>
              <InputAtom
                label="Customer"
                getValue={this.getCustomer}
                contStyle={styles.marginfulInput}
              />
            </View>
            <NewOrderCardAtom onPress={this.makePayment} />
            {this.state.textInput.map((value: any) => {
              return value
            })}
            <ButtonAtom
              onPress={() => this.addTextInput(this.state.textInput.length)}
              btnText="+ Add Product"
              transparent={true}
              btnStyle={styles.btn1}
              textStyle={styles.txt1}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomSide}>
          <View style={styles.innerBottom}>
            <Text style={styles.bottomGrey}>Amount paid</Text>
            <Text style={styles.bottomRed}>#0.00</Text>
          </View>
          <ButtonAtom
            onPress={this.makePayment}
            btnText="Make Payment"
            btnStyle={styles.btn2}
            textStyle={styles.txt2}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default OrderFormAtom

const styles = StyleSheet.create({
  itemsContainer1: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    paddingBottom: 50
  },
  redColorText: {
    color: color.primary
  },
  btn1: {
    alignSelf: 'flex-start'
  },
  txt2: {
    fontWeight: 'bold',
    color: '#fff'
  },
  innerItemContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '98%'
  },
  btn2: {
    alignSelf: 'flex-end',
    marginBottom: 15
  },
  txt1: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left'
  },
  bottomSide: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1
  },
  cusName: {
    width: '98%',
    height: 70,
    marginBottom: 3,
    borderRadius: 2,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginVertical: 16
  },
  innerBottom: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    width: '55%',
    marginTop: 20
  },
  bottomGrey: {
    color: '#c0c0c0',
    paddingLeft: 16
  },
  bottomRed: {
    color: 'red',
    paddingLeft: 16
  },
  headerOrder: {
    backgroundColor: '#FFF'
  },
  leftOrder: {
    flex: 1,
    width: '40%',
    flexDirection: 'row'
  },
  iconOrder: {
    fontSize: 20,
    color: '#c0c0c0',
    paddingRight: 5
  },
  marginfulInput: {
    marginLeft: 4
  }
})
