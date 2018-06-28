import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, List } from 'native-base'

import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import { color } from '../Style/Color'
import SubHeaderAtom from '../Atom/SubHeaderAtom'

interface IProps {
  navigation: any
}

interface IState {}

class ServicesScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Services',
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

  editItem = (name: string, amount: string) => {
    console.log(name, amount)
  }

  render() {
    return (
      <View style={styles.container}>
        <SubHeaderAtom list={['Lorem ipsum']} />
      </View>
    )
  }
}

export default ServicesScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  container: {
    flex: 1
  }
})
