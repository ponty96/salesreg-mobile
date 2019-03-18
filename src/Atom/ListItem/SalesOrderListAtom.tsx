import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { color } from '../../Style/Color'
import { Left, Right, Icon } from 'native-base'
import CachedImageAtom from '../CachedImageAtom'

export interface DataProps {
  firstTopText: string
  bottomLeftFirstText?: string
  bottomLeftSecondText?: string
  topRightText?: string
  bottomRightText?: string
  avatar?: string
  icon?: JSX.Element
  coloredBorder?: boolean
  borderRightColor?: string
  topLeftTextStyle?: any
}
interface IProps extends DataProps {
  onPress?: () => void
  style?: object
  containerStyle?: object
  rightTopTextStyle?: object
  leftStyle?: object
  rightTextStyle?: object
  bottomRightTextStyle?: object
  showTrash?: boolean
  onPressTrash?: () => void
}

const renderColoredRightBorder = (
  borderRightColor: string,
  coloredBorder: boolean
): any => {
  let borderStyle: any = {
    borderRightWidth: 3
  }

  if (coloredBorder) {
    borderStyle = {
      ...borderStyle,
      borderRightColor
    }
  } else {
    borderStyle = {}
  }

  return borderStyle
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
      <View style={[styles.listItem, this.props.containerStyle]}>
        {this.props.avatar && (
          <CachedImageAtom uri={this.props.avatar} style={styles.avatar} />
        )}

        {this.props.icon}
        <TouchableOpacity
          style={[
            styles.wrapper,
            this.props.style,
            this.props.showTrash && { alignItems: 'center', paddingRight: 0 },
            renderStatusIndicator(this.props.bottomRightText),
            renderColoredRightBorder(
              this.props.borderRightColor,
              this.props.coloredBorder
            )
          ]}
          onPress={this.props.onPress}
        >
          {this.renderLeftComponent()}
          {this.props.showTrash ? (
            <View style={{ marginRight: -8 }}>
              <Icon
                type="EvilIcons"
                name="trash"
                style={{
                  color: color.trashIcon,
                  fontSize: 40,
                  alignSelf: 'center'
                }}
                onPress={this.props.onPressTrash}
              />
            </View>
          ) : (
            this.renderRightComponent()
          )}
        </TouchableOpacity>
      </View>
    )
  }

  renderLeftComponent = (): any => {
    const {
      firstTopText,
      bottomLeftFirstText,
      bottomLeftSecondText
    } = this.props
    if (firstTopText || bottomLeftFirstText || bottomLeftSecondText) {
      return (
        <Left style={[styles.leftWrapper, this.props.leftStyle]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.serialNumber,
              styles.top,
              this.props.topLeftTextStyle
            ]}
          >
            {firstTopText}
          </Text>
          {this.renderBottomTexts(bottomLeftFirstText, bottomLeftSecondText)}
        </Left>
      )
    }
  }
  renderBottomTexts = (bottomLeftFirstText, bottomLeftSecondText): any => {
    if (bottomLeftFirstText || bottomLeftSecondText) {
      return (
        <View style={styles.wrapperForTopLeft}>
          <Text style={[styles.text, styles.bottom]}>
            {bottomLeftFirstText}
          </Text>
          <Text style={[styles.time, styles.bottom]}>
            {bottomLeftSecondText}
          </Text>
        </View>
      )
    }
  }
  renderRightComponent = (): any => {
    const { topRightText, bottomRightText } = this.props
    if (topRightText || bottomRightText) {
      return (
        <Right style={styles.rightWrapper}>
          {this.renderRightAlignedText(topRightText, [
            styles.text,
            styles.top,
            styles.price,
            this.props.rightTextStyle
          ])}
          {this.renderRightAlignedText(bottomRightText, [
            styles.status,
            styles.bottom,
            this.props.bottomRightTextStyle
          ])}
        </Right>
      )
    }
  }
  renderRightAlignedText = (text, styles): any => {
    if (text) {
      return <Text style={styles}>{text}</Text>
    }
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center'
  },
  avatar: {
    height: 50,
    width: 50,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 25,
    margin: 0,
    padding: 0,
    marginRight: 8
  },
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor,
    flexDirection: 'row',
    backgroundColor: color.secondary,
    marginVertical: 8,
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: 8,
    minHeight: 55
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
    // marginTop: 8
  },
  status: {
    // color: color.selling,
    fontFamily: 'AvenirNext-Regular'
  },
  rightWrapper: {
    // marginRight: 16
  },
  leftWrapper: {
    // marginLeft: 8
  },
  statusIndicator: {
    width: 5
  },
  price: {
    color: color.selling
  },
  closeIcon: {
    fontSize: 30,
    color: color.red
  }
})
