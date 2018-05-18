import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import styles from '../Style/Layout'
import screenStyles from '../Style/Screen'

interface IProps {
  type?: string
  item?: { image?: any; name?: any }
  imgStyle?: object
  business?: boolean
  bodyfunction?: Function
  rightIconFunc?: () => void
}

class ListItemAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    business: true,
    type: 'sidebar' || 'debt' || 'business'
  }

  renderAvatar = () => {
    return this.props.item.image ? (
      <Image
        source={{ uri: this.props.item.image }}
        style={[styles.imageIconCont, this.props.imgStyle]}
      />
    ) : (
      <View style={styles.textIconCont}>
        <Text
          style={[
            styles.innerText,
            this.props.type === 'business' && screenStyles.redText,
            this.props.type === 'business' && styles.boldText
          ]}
        >
          {this.props.item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
    )
  }

  renderIcon = () => {
    return (
      <View style={styles.debtItem}>
        <Icon
          name={'database-minus'}
          style={styles.itemIcon}
          type={'MaterialCommunityIcons'}
        />
      </View>
    )
  }

  renderRightIcon = () => {
    return (
      <TouchableOpacity
        style={styles.itemRightIcon}
        activeOpacity={1}
        onPress={this.handleRightIconPress}
      >
        <Icon
          name={this.props.type === 'debt' ? 'chevron-right' : 'do-not-disturb'}
          style={
            this.props.type === 'debt' ? styles.itemIcon : styles.deleteIcon
          }
          type={'MaterialCommunityIcons'}
        />
      </TouchableOpacity>
    )
  }

  handleBodyPress = () => {
    if (this.props.bodyfunction) {
      this.props.business
        ? this.props.bodyfunction(this.props.item)
        : this.props.bodyfunction()
    }
  }

  handleRightIconPress = () => {
    if (this.props.rightIconFunc) {
      this.props.rightIconFunc()
    }
  }

  render() {
    return (
      <View
        style={[
          styles.sidebarListCont,
          this.props.type === 'debt' && styles.debtContainer
        ]}
      >
        <TouchableOpacity
          onPress={this.handleBodyPress}
          style={styles.listTouchCont}
          activeOpacity={1}
        >
          {this.props.type === 'debt' ? this.renderIcon() : this.renderAvatar()}
          <View style={styles.listTextCont}>
            <Text style={this.props.type === 'sidebar' && styles.boldText}>
              {this.props.type === 'sidebar'
                ? this.props.item.name.toUpperCase()
                : this.props.item.name}
            </Text>
            {this.props.type === 'sidebar' && (
              <Text style={styles.itemIcon}>
                {this.props.business
                  ? 'view business profile'
                  : 'view your profile'}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        {this.props.type !== 'sidebar' && this.renderRightIcon()}
      </View>
    )
  }
}

export default ListItemAtom