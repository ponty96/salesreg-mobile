import * as React from 'react';
import { View, Text } from 'react-native';
import ImageAtom from './ImageAtom';
import InputAtom from './InputAtom';
import styles from '../Style/Form';
import styles1 from '../Style/exportStyles';
import { ScrollView } from 'react-native-gesture-handler';
import PickerAtom from './PickerAtom';

interface ICustomerFormProps {
    navigation: any
}

export default class CustomerFormAtom extends React.Component<ICustomerFormProps, any> {
  state = {
    product: '',
    image: '',
    quantity: 0,
    pquantity: 0,
    costPP: 0,
    birth: '',
    marriage: '',
    debt: 0
  };

  create = () => {
    this.props.navigation.goBack();
  }

  getProduct = (product: string) => {
    this.setState({ product });
  }

  getImage = (pic: any) => {
    this.setState({ image: pic });
  }
  getSQuantity = (quantity: number) => {
    this.setState({ quantity });
  }
  getPQuantity = (pquantity: number) => {
    this.setState({ pquantity });
  }
  getCostPP = (costPP: number) => {
    this.setState({ costPP });
  }
  getBirth = (birth: string) => {
    this.setState({ birth });
  }
  getMarry = (marriage: string) => {
    this.setState({ marriage });
  }
  getDebt = (debt: number) => {
    this.setState({ debt });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <ImageAtom
            getValue={this.getImage}
            source={this.state.image}
            placeholder=''
            imgStyle={styles.imgContainer}
          />
          <View>
            <InputAtom
              label='  Name'
              getValue={this.getProduct}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerStart}>
              <InputAtom
                label='  Phone number'
                keyboardType='numeric'
                getValue={this.getSQuantity}
                contStyle={styles1.marginlessInput}
              />
            </View>
            <View style={styles.innerEnd}>
              <PickerAtom list={['Gender', 'Male', 'Female']} />
            </View>
          </View>
          <View>
            <InputAtom
              label='  Home address'
              keyboardType='numeric'
              getValue={this.getPQuantity}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label='  Email'
              keyboardType='numeric'
              getValue={this.getCostPP}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerStart}>
              <InputAtom
                label='  Debt limit'
                keyboardType='numeric'
                getValue={this.getDebt}
                contStyle={styles1.marginlessInput}
              />
            </View>
            <View style={styles.innerEnd}>
              <InputAtom
                label='  Birthday'
                keyboardType='numeric'
                getValue={this.getBirth}
                contStyle={styles1.marginfulInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerFirstPicker}>
              <PickerAtom list={['Marital Status', 'Married', 'Single']} />
            </View>
            <View style={styles.innerEnd}>
              <InputAtom
                label='  Marriage Anniversary'
                keyboardType='numeric'
                getValue={this.getMarry}
                contStyle={styles1.marginlessInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
