import React, { PureComponent } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import ListItemAtom from './../Atom/ListItemAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class SettingsScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Settings',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      )
    }
  }

  render() {
    return (
      <View style={[styles.defaultPadding, styles.formViewContainer]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Debt')}
          activeOpacity={1}
        >
          <ListItemAtom
            item={{
              name: 'Debt'
            }}
            type={'debt'}
            bodyfunction={() => this.props.navigation.navigate('Debt')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default SettingsScreen

const styles = StyleSheet.create({
  formViewContainer: {
    flex: 1,
    backgroundColor: color.secondary
  },
  defaultPadding: {
    paddingHorizontal: 16
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
