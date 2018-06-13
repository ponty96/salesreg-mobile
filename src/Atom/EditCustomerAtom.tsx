import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ImageAtom from './ImageAtom'
import InputAtom from './InputAtom'
import PickerAtom from './PickerAtom'
import GoldRatingsAtom from './GoldRatingsAtom'
import { ScrollView } from 'react-native-gesture-handler'

interface IProps {
  navigation: any
  customerName: string
}

export default class EditCustomerAtom extends React.Component<IProps, any> {
  state = {
    product: '',
    image: '',
    phone: '',
    email: '',
    marriage: '',
    debt: 0,
    address: '',
    ucost: 0,
    birth: ''
  }

  create = () => {
    this.props.navigation.goBack()
  }

  getProduct = (product: string) => {
    this.setState({ product })
  }

  getImage = (pic: string) => {
    this.setState({
      image: pic
    })
  }
  getPhone = (phone: number) => {
    this.setState({ phone })
  }
  getAddress = (address: string) => {
    this.setState({ address })
  }
  getUCost = (ucost: number) => {
    this.setState({ ucost })
  }
  getBirth = (birth: string) => {
    this.setState({ birth })
  }
  getMarry = (marriage: string) => {
    this.setState({ marriage })
  }
  getDebt = (debt: number) => {
    this.setState({ debt })
  }
  getEmail = (email: string) => {
    this.setState({ email })
  }

  render() {
    return (
      <ScrollView>
        <View>
          <ImageAtom
            getValue={this.getImage}
            source={this.state.image}
            placeholder=""
            imgStyle={styles.imgContainer}
          />
          <View>
            <InputAtom
              label="  Name"
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Phone number(separate numbers with commas):"
              keyboardType="numeric"
              getValue={this.getPhone}
              contStyle={styles.marginlessInput}
            />
          </View>
          <View style={styles.innerFirstPicker}>
            <PickerAtom list={['Male', 'Female']} placeholder="Gender" />
          </View>
          <View>
            <InputAtom
              label="  Address"
              keyboardType="numeric"
              getValue={this.getAddress}
              contStyle={styles.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Type Email Address"
              keyboardType="email-address"
              getValue={this.getEmail}
              contStyle={styles.marginlessInput}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerStart}>
              <InputAtom
                label="  Debt limit"
                keyboardType="numeric"
                getValue={this.getDebt}
                contStyle={styles.marginlessInput}
              />
            </View>
            <View style={styles.innerEnd}>
              <InputAtom
                label="  Birthday"
                keyboardType="numeric"
                getValue={this.getBirth}
                contStyle={styles.marginfulInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerFirstPicker}>
              <PickerAtom
                list={['Married', 'Single']}
                placeholder="Marital status"
              />
            </View>
            <View style={styles.innerEnd}>
              <InputAtom
                label="  Marriage Anniversary"
                keyboardType="numeric"
                getValue={this.getMarry}
                contStyle={styles.marginlessInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
            </View>
          </View>
          <View style={styles.secondCompartment}>
            <View style={styles.compartmentItemWrapper}>
              <Text style={styles.compartmentItem}>
                Rating {this.props.customerName}
              </Text>
              <GoldRatingsAtom />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    marginVertical: 16
  },
  innerFirstPicker: {
    flex: 1,
    alignSelf: 'center'
  },
  inputView: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    flex: 1
  },
  innerEnd: {
    width: '50%',
    flex: 1,
    alignSelf: 'center'
  },
  innerStart: {
    width: '50%',
    flex: 1,
    alignSelf: 'flex-start'
  },
  underText: {
    marginRight: '50%',
    fontSize: 10
  },
  secondCompartment: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingBottom: 10
  },
  compartmentItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: 25
  },
  compartmentItem: {
    marginLeft: 35,
    color: 'grey'
  },
  marginlessInput: {
    marginLeft: 0
  },
  marginfulInput: {
    marginLeft: 4
  }
})
