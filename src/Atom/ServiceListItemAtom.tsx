import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  name: string
  amount: string,
  textStyle?: any,
  contStyle?: any,
  bodyfunction?: (name: string, amount: string) => void
}

class ServicesListItemAtom extends React.Component<IProps, {}> {

  handleBodyPress = () => {
    if (this.props.bodyfunction) {
      this.props.bodyfunction(this.props.name, this.props.amount);
    }
  }

  render() {
    return (
      <View
        style={[styles.listContainer, this.props.contStyle]}
      >
        <TouchableOpacity
          onPress={this.handleBodyPress}
          activeOpacity={1}
        >
          <View style={styles.listTextCont}>
            <Text style={styles.nameText}>
              {this.props.name}
            </Text>
            <Text style={[styles.amountText, this.props.textStyle]}>
                {this.props.amount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ServicesListItemAtom

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.subHeader
  },
  listTextCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  nameText: {
    flex: 1
  },
  amountText: {
    color: color.selling
  }
})
