import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  item?: { number?: string; name?: string; child?: string }
  rightIcon?: boolean
}

class SettingsAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    rightIcon: false
  }

  renderNumber = () => {
    return <Text style={styles.redText}>{this.props.item.number}</Text>
  }

  renderRightIcon = () => {
    return (
      <View style={styles.itemRightIcon}>
        <Icon
          name={'chevron-right'}
          style={styles.itemIcon}
          type={'MaterialCommunityIcons'}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.sidebarListCont, styles.minimalPadding]}>
        <View style={styles.listTextCont}>
          <Text style={[styles.boldText, styles.firstBox]}>
            {this.props.item.name}
          </Text>
          <Text style={styles.settingsChildText}>{this.props.item.child}</Text>
        </View>
        {this.props.rightIcon ? this.renderRightIcon() : this.renderNumber()}
      </View>
    )
  }
}

export default SettingsAtom

const styles = StyleSheet.create({
  itemRightIcon: {
    alignSelf: 'center'
  },
  settingsChildText: {
    color: color.settingsChildText
  },
  boldText: {
    fontWeight: 'bold'
  },
  listTextCont: {
    flex: 1,
    justifyContent: 'center'
  },
  minimalPadding: {
    paddingHorizontal: 8,
    paddingVertical: 16
  },
  sidebarListCont: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: color.textBorderBottom
  },
  itemIcon: {
    color: color.menu
  },
  redText: { color: color.primary },
  firstBox: {
    marginBottom: 6
  }
})
