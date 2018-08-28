import * as React from 'react'
import { Header, Left, Right, Text, Icon } from 'native-base'
import PickerAtom from './PickerAtom'
import { StyleSheet, View, Image } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  total?: any
  list?: any[]
  image?: any
  rightLabel?: string
  screen?: string
  onPressArrow?: () => void
  children?: JSX.Element
}

class SubHeaderAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    total: '80'
  }

  renderRightComponent = (screen: string) => {
    screen = this.props.screen
    if (screen === 'products and services')
      return (
        <View>
          <Text style={styles.subHeaderFont}>{this.props.rightLabel}</Text>
          <View style={styles.pickerWrapper}>
            <PickerAtom
              list={this.props.list}
              style={styles.pickerStyle}
              placeholder="Make a selection"
            />
          </View>
        </View>
      )
    else return undefined
  }

  render() {
    return (
      <Header style={styles.subHeaderHeader}>
        <Left style={styles.subHeaderLeftRow}>
          <Image source={this.props.image} style={styles.productIcon} />
          <Text style={styles.subHeaderPad}>{this.props.total}</Text>
        </Left>

        <Right style={styles.subHeaderRightRow}>
          <Text style={styles.subHeaderFont}>{this.props.rightLabel}</Text>
          {this.props.screen !== 'sales order' ? (
            <View style={styles.pickerWrapper}>
              <PickerAtom
                list={this.props.list}
                style={styles.pickerStyle}
                placeholder="Make a selection"
              />
            </View>
          ) : (
            this.props.children || (
              <Icon
                name="chevron-small-right"
                type="Entypo"
                style={styles.rightIconLabel}
                onPress={this.props.onPressArrow}
              />
            )
          )}
        </Right>
      </Header>
    )
  }
}

export default SubHeaderAtom

const styles = StyleSheet.create({
  subHeaderHeader: {
    height: 45,
    backgroundColor: '#fff'
  },
  subHeaderLeftRow: {
    flexDirection: 'row',
    width: '40%',
    marginLeft: 16
  },
  subHeaderRightRow: {
    flexDirection: 'row',
    width: '60%'
  },
  subHeaderPad: {
    paddingLeft: 8,
    fontFamily: 'Source Sans Pro',
    fontSize: 15,
    color: color.principal,
    marginTop: 2
  },
  subHeaderFont: {
    fontSize: 15,
    fontFamily: 'Source Sans Pro',
    alignSelf: 'center',
    marginBottom: 2,
    color: color.principal
  },
  subHeaderIconColor: {
    color: color.check,
    marginLeft: 10
  },
  pickerStyle: {
    width: '100%',
    height: 35,
    paddingRight: 10,
    alignSelf: 'flex-start'
  },
  pickerWrapper: {
    borderWidth: 1,
    width: 160,
    borderColor: color.dropdown,
    alignItems: 'flex-end',
    marginLeft: 16
  },
  productIcon: {
    height: 20,
    width: 20
  },
  salesOrderSubHeaderRightText: {
    fontFamily: 'Source Sans Pro'
  },
  rightIconLabel: {
    color: color.button
  }
})
