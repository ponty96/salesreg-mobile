import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Left, Right, Title } from 'native-base'
import Icon from '../../Atom/Icon'
import { color } from '../../Style/Color'
import { SearchAtom } from '../../Atom/SearchAtom'

export interface IProps {
  title: string
  leftIconTitle?: string
  leftIconType?:
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
  rightIconTitle?: string
  rightIconType?:
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
  onPressLeftIcon?: () => void
  onPressRightIcon?: () => void
  rightIconStyle?: any
  rightText?: string
  hideRightMenu?: boolean
  showSearchBar?: boolean
}

export default class BaseHeader extends React.PureComponent<IProps> {
  static defaultProps = {
    leftIconTitle: 'md-menu',
    leftIconType: 'IonIcons',
    rightIconTitle: 'dots-three-horizontal',
    rightIconType: 'Entypo',
    hideRightMenu: false
  }

  render() {
    const props = this.props
    return (
      <View style={styles.header}>
        <View style={styles.wrapper}>
          <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name={this.props.leftIconTitle}
              onPress={this.props.onPressLeftIcon}
              style={styles.headerIcon}
              type={this.props.leftIconType}
            />
          </Left>
          <Title style={styles.title}>{props.title}</Title>
          {!this.props.hideRightMenu ? (
            <Right>
              <TouchableWithoutFeedback onPress={this.props.onPressRightIcon}>
                <View style={[styles.rightWrapper, this.props.rightIconStyle]}>
                  <Icon
                    name={this.props.rightIconTitle}
                    style={styles.searchIcon}
                    type={this.props.rightIconType}
                  />
                  {this.props.rightText && (
                    <Text style={styles.rightText}>{this.props.rightText}</Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </Right>
          ) : (
            <Right />
          )}
        </View>
        {this.props.showSearchBar && <SearchAtom />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom
  },
  wrapper: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  headerIcon: {
    fontSize: 26,
    color: '#000'
  },
  title: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 18,
    color: '#000'
  },
  rightText: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 17,
    marginLeft: 8
  },
  rightWrapper: {
    flexDirection: 'row',
    marginRight: 0,
    alignItems: 'center'
  },
  searchIcon: {
    color: '#000',
    width: 25,
    // left: 20,
    fontSize: 26
  }
})
