import React, { PureComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import EVILIcon from 'react-native-vector-icons/EvilIcons'
import IONICon from 'react-native-vector-icons/Ionicons'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import MATIcon from 'react-native-vector-icons/MaterialIcons'
import SIMPLEIcon from 'react-native-vector-icons/SimpleLineIcons'
import MATCOMMIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import EntypoIcon from 'react-native-vector-icons/Entypo'

/**
 *@Component Icon renders the icon of the application
 */

interface IProps {
  type?:
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Foundation'
    | 'Ionicons'
    | 'AntDesign'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
  name?: string
  style?: any
  contentContainerStyle?: any
  onPress?: any
  color?: string
}

const styles = StyleSheet.create({
  defaultStyle: {
    color: '#fff'
  }
})
export default class Icon extends PureComponent<IProps> {
  /**
   * @return {component|null}
   * make decision to present a particular icon based on the type supplied by the user
   */
  getIconToRender = () => {
    let icon = null,
      { contentContainerStyle, onPress } = this.props,
      newStyles = [styles.defaultStyle, this.props.style]

    switch (this.props.type) {
      case 'EvilIcons':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <EVILIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'AntDesign':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <EVILIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'MaterialIcons':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <MATIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'SimpleLineIcons':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <SIMPLEIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'Ionicons':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <IONICon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'FontAwesome':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <FAIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'FontAwesome5':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <FAIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'MaterialCommunityIcons':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <MATCOMMIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'Feather':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <FeatherIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      case 'Entypo':
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <EntypoIcon style={newStyles} name={this.props.name} />
          </Text>
        )
        break
      default:
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <IONICon style={newStyles} name={this.props.name} />
          </Text>
        )
    }
    return icon
  }

  render() {
    return this.getIconToRender()
  }
}
