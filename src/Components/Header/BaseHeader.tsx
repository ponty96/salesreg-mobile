import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Left, Right, Title, Item, Input } from 'native-base'
import Icon from '../../Atom/Icon'
import { color } from '../../Style/Color'

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
              <View style={[styles.rightWrapper, this.props.rightIconStyle]}>
                <Icon
                  name={this.props.rightIconTitle}
                  onPress={this.props.onPressRightIcon}
                  style={styles.searchIcon}
                  type={this.props.rightIconType}
                />
              </View>
            </Right>
          ) : (
            <Right />
          )}
        </View>
        {this.props.showSearchBar && (
          <Item style={styles.searchItem}>
            <Icon
              name="ios-search"
              style={{ color: '#000', fontSize: 24, padding: 0, marginTop: 0 }}
            />
            <Input placeholder="" />
          </Item>
        )}
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
  rightWrapper: {
    flexDirection: 'row',
    marginRight: 0
  },
  searchIcon: {
    color: '#000',
    width: 25,
    // left: 20,
    fontSize: 26
  },
  searchItem: {
    backgroundColor: color.textBorderBottom,
    borderWidth: 1,
    borderColor: color.textBorderBottom,
    borderRadius: 8,
    paddingLeft: 12,
    marginTop: 0,
    top: 0,
    height: 36,
    justifyContent: 'center',
    marginBottom: 8
  }
})
