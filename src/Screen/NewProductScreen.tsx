import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'

interface IProps {
  navigation: any
}

interface IState {}

class NewProductScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'kay5ive Attractions',
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
      <View style={styles.centerContainer}>
        <Text>{'NewProductScreen'}</Text>
      </View>
    )
  }
}

export default NewProductScreen
