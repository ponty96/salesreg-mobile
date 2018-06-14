import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ImageAtom from './ImageAtom'
import InputAtom from './InputAtom'
import { ScrollView } from 'react-native-gesture-handler'
import PickerAtom from './PickerAtom'

interface ICustomerFormProps {
  navigation: any
}

export default class CustomerFormAtom extends React.Component<
  ICustomerFormProps,
  any
> {
  state = {
    product: '',
    image: '',
    quantity: 0,
    pquantity: 0,
    costPP: 0,
    birth: '',
    marriage: '',
    debt: 0
  }

  create = () => {
    this.props.navigation.goBack()
  }

  getProduct = (product: string) => {
    this.setState({ product })
  }

  getImage = (pic: any) => {
    this.setState({ image: pic })
  }
  getSQuantity = (quantity: number) => {
    this.setState({ quantity })
  }
  getPQuantity = (pquantity: number) => {
    this.setState({ pquantity })
  }
  getCostPP = (costPP: number) => {
    this.setState({ costPP })
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
          <View style={styles.inputView}>
            <View style={styles.innerStart}>
              <InputAtom
                label="  Phone number"
                keyboardType="numeric"
                getValue={this.getSQuantity}
                contStyle={styles.marginlessInput}
              />
            </View>
            <View style={styles.innerEnd}>
              <PickerAtom list={['Male', 'Female']} placeholder="Gender" />
            </View>
          </View>
          <View>
            <InputAtom
              label="  Home address"
              keyboardType="numeric"
              getValue={this.getPQuantity}
              contStyle={styles.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Email"
              keyboardType="numeric"
              getValue={this.getCostPP}
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
            <View style={styles.innerLastEnd}>
              <InputAtom
                label="  Marriage Anniversary"
                keyboardType="numeric"
                getValue={this.getMarry}
                contStyle={styles.marginlessInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
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
  inputView: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    flex: 1
  },
  innerStart: {
    width: '50%',
    flex: 1,
    alignSelf: 'flex-start'
  },
  innerEnd: {
    width: '50%',
    flex: 1,
    alignSelf: 'center'
  },
  underText: {
    marginRight: '50%',
    fontSize: 10
  },
  innerFirstPicker: {
    flex: 1,
    alignSelf: 'center'
  },
  innerLastEnd: {
    width: '50%',
    flex: 0,
    alignSelf: 'flex-end',
    paddingTop: 20
  },
  marginlessInput: {
    marginLeft: 0
  },
  marginfulInput: {
    marginLeft: 4
  }
})
