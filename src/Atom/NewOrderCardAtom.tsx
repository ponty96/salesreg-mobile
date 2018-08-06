import * as React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Header, Icon, Right } from 'native-base'
import InputAtom from './InputAtom'

interface IProps {
  onPress: () => void
}

export default class NewOrderCardAtom extends React.Component<IProps, any> {
  state = {
    product: '',
    price: '',
    quantity: ''
  }

  getProduct = (product: string) => {
    this.setState({ product })
  }
  getPrice = (price: number) => {
    this.setState({ price })
  }
  getQuantity = (quantity: number) => {
    this.setState({ quantity })
  }

  render() {
    return (
      <View style={styles.newOrderContainer}>
        <Header style={styles.newOrderHeader}>
          <Right>
            <TouchableOpacity
              style={styles.newOrderClose}
              onPress={this.props.onPress}
            >
              <Icon style={styles.newOrderIcon} name="md-close" />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.newOrderInnerContainer}>
          <View style={styles.newOrderFirstInput}>
            <InputAtom
              label="Product Name"
              getValue={this.getProduct}
              contStyle={styles.marginfulInput}
            />
          </View>
          <View style={styles.newOrderSecondInput}>
            <View style={styles.newOrderHalf}>
              <InputAtom
                label="Quantity"
                getValue={this.getQuantity}
                keyboardType="numeric"
                contStyle={styles.marginfulInput}
              />
            </View>
            <View style={styles.newOrderHalf}>
              <InputAtom
                label="Price"
                getValue={this.getPrice}
                keyboardType="numeric"
                contStyle={styles.marginfulInput}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  newOrderContainer: {
    backgroundColor: '#FFF',
    width: '98%',
    alignSelf: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginVertical: 16
  },

  newOrderHeader: {
    backgroundColor: '#FFF',
    height: 40,
    marginBottom: 3
  },

  newOrderIcon: {
    fontSize: 30,
    textAlign: 'right'
  },

  newOrderInnerContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '98%'
  },

  newOrderFirstInput: {
    width: '96%',
    marginBottom: 3
  },

  newOrderSecondInput: {
    flexDirection: 'row',
    flex: 0,
    marginBottom: 16
  },

  newOrderHalf: {
    width: '48%'
  },

  newOrderClose: {
    width: 60
  },
  marginfulInput: {
    marginLeft: 4
  }
})
