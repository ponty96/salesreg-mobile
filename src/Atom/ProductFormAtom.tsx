import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FormImageAtom from './FormImageAtom'
import InputAtom from './InputAtom'
import { color } from '../Style/Color'
import FormContainerAtom from './FormContainerAtom'

interface IProps {
  navigation: any
}

export default class ProductFormAtom extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      product: '',
      image: {
        uri:
          'https://irp-cdn.multiscreensite.com/649127fb/dms3rep/multi/mobile/ic1.png'
      },
      currentStock: '',
      minStock: '',
      costPrice: ''
    }
  }

  getImage = (pic: any) => {
    this.setState((prevState: any) => ({
      image: {
        ...prevState.image,
        uri: pic
      }
    }))
  }

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={60}
        style={styles.itemsContainer}
      >
        <ScrollView>
          <FormImageAtom
            form="product"
            getValue={this.getImage}
            getName={val => this.updateState('product', val)}
            source={this.state.image.uri}
          />
          <FormContainerAtom headerText="Quantity">
            <InputAtom
              label="Current Stock Quantity"
              getValue={val => this.updateState('currentStock', val)}
              keyboardType="numeric"
              underneathText="Quantity available in store as at now"
              underneathStyle={styles.underneathStyle}
            />
            <InputAtom
              label="Minimum Stock Quantity"
              getValue={val => this.updateState('minStock', val)}
              keyboardType="numeric"
              underneathText="Minimum quantity required for re-stock"
              underneathStyle={styles.underneathStyle}
            />
          </FormContainerAtom>
          <View style={styles.mainView}>
            <Text style={styles.headerText}>Cost/Price</Text>
            <View style={styles.inputViewForTwo}>
              <View>
                <Text style={styles.blueSideText}>
                  *Cost Price/each ({'\u20A6'})
                </Text>
              </View>
              <View style={{ width: '60%' }}>
                <InputAtom
                  label=""
                  getValue={val => this.updateState('costPrice', val)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  indentLeft: {
    marginLeft: 20
  },
  indentRight: {
    marginRight: 20
  },
  mainView: {
    backgroundColor: 'transparent',
    width: '100%'
  },
  inputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  editDetailsWrapper: {
    marginTop: 30,
    marginBottom: 10
  },
  textTitle: {
    color: color.inactive,
    fontWeight: '400',
    fontSize: 14
  },
  itemsContainer: {
    flex: 4,
    backgroundColor: '#F6F6F6'
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 14,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  },
  blueSideText: {
    fontSize: 14,
    paddingLeft: 16,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  },
  underneathStyle: {
    marginBottom: 0,
    paddingBottom: 0,
    paddingLeft: 8
  }
})
