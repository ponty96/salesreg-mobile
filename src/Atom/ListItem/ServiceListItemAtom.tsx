import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { color } from '../../Style/Color'

interface IProps {
  name: string
  amount: string
  textStyle?: any
  contStyle?: any
  bodyfunction?: (name: string, amount: string) => void
  onPress: any
}

class ServicesListItemAtom extends React.Component<IProps, {}> {
  /*handleBodyPress = () => {
    if (this.props.bodyfunction) {
      this.props.bodyfunction(this.props.name, this.props.amount)
    }
  }*/

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.listContainer, this.props.contStyle]}
      >
        <View style={styles.listTextCont}>
          <Text style={[styles.nameText, { fontFamily: 'Source Sans Pro' }]}>
            {this.props.name}
          </Text>
          <Text
            style={[
              { fontFamily: 'Source Sans Pro' },
              styles.amountText,
              this.props.textStyle
            ]}
          >
            {'\u20A6 '} {this.props.amount}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default ServicesListItemAtom

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.dropdown,
    marginHorizontal: 16
  },
  listTextCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  nameText: {
    color: color.principal,
    fontSize: 14,
    marginVertical: 4
  },
  amountText: {
    color: color.selling,
    fontSize: 16
  }
})
