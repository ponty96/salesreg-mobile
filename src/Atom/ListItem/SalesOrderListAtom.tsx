import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { color } from '../../Style/Color'
import { Left, Right, Thumbnail } from 'native-base'

export interface DataProps {
  firstTopText: string
  bottomLeftFirstText?: string
  bottomLeftSecondText?: string
  topRightText: string
  bottomRightText?: string
  avatar?: string
}
interface IProps extends DataProps {
  onPress?: () => void
  style?: object
  rightTopTextStyle?: object
  leftStyle?: object
  rightStyle?: object
}

const renderStatusIndicator = (bottomRightText: string): any => {
  let borderStyle: any = {
    borderRightWidth: 3
  }
  switch (bottomRightText) {
    case 'pending':
    case 'delivered':
    case 'delivering':
    case 'recalled':
    case 'processed':
      borderStyle = {
        ...borderStyle,
        borderRightColor: color[`${bottomRightText}BorderIndicator`]
      }
      break
    default:
      borderStyle = {}
      break
  }
  return borderStyle
}

export default class SalesOrderListAtom extends React.PureComponent<IProps> {
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.wrapper,
          this.props.style,
          renderStatusIndicator(this.props.bottomRightText)
        ]}
        onPress={this.props.onPress}
        key="SalesOrderListAtom-2"
      >
        {this.props.avatar && (
          <Thumbnail
            source={{ uri: this.props.avatar }}
            style={styles.avatar}
          />
        )}
        {this.renderLeftComponent()}
        {this.renderRightComponent()}
      </TouchableOpacity>
    )
  }
  renderLeftComponent = (): any => {
    if (
      this.props.firstTopText ||
      this.props.bottomLeftFirstText ||
      this.props.bottomLeftSecondText
    ) {
      return (
        <Left style={[styles.leftWrapper, this.props.leftStyle]}>
          <Text style={[styles.serialNumber, styles.top]}>
            {this.props.firstTopText}
          </Text>
          <View style={styles.wrapperForTopLeft}>
            <Text style={[styles.text, styles.bottom]}>
              {this.props.bottomLeftFirstText}
            </Text>
            <Text style={[styles.time, styles.bottom]}>
              {this.props.bottomLeftSecondText}
            </Text>
          </View>
        </Left>
      )
    }
  }
  renderRightComponent = (): any => {
    if (this.props.topRightText || this.props.bottomRightText) {
      return (
        <Right style={[styles.rightWrapper, this.props.rightStyle]}>
          <Text style={[styles.text, styles.top, styles.price]}>
            {this.props.topRightText}
          </Text>
          <Text style={[styles.status, styles.bottom]}>
            {this.props.bottomRightText}
          </Text>
        </Right>
      )
    }
  }
}

const styles = StyleSheet.create({
  avatar: {
    height: 55,
    width: 55,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 55 / 2,
    margin: 0,
    padding: 0
  },
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor,
    flexDirection: 'row',
    marginHorizontal: 8,
    backgroundColor: color.secondary,
    marginVertical: 8,
    justifyContent: 'space-between'
  },
  serialNumber: {
    fontFamily: 'AvenirNext-DemiBold',
    color: color.principal,
    fontSize: 16
  },
  wrapperForTopLeft: {
    flexDirection: 'row'
  },
  time: {
    marginLeft: 16,
    color: color.principal,
    fontFamily: 'AvenirNext-Regular',
    fontSize: 14
  },
  text: {
    fontFamily: 'AvenirNext-Regular',
    color: color.principal,
    fontSize: 14
  },
  bottom: {
    marginTop: 8,
    marginBottom: 8
  },
  top: {
    marginTop: 8
  },
  status: {
    // color: color.selling,
    fontFamily: 'AvenirNext-Regular'
  },
  rightWrapper: {
    marginRight: 16
  },
  leftWrapper: {
    marginLeft: 16
  },
  statusIndicator: {
    width: 5
  },
  price: {
    color: color.selling
  }
})
