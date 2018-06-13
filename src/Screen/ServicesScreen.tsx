import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Icon, List } from 'native-base'

import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import { color } from '../Style/Color'

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
      <List style={styles.container}>
        <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} func={this.editItem} />
        <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} func={this.editItem} />
        <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} func={this.editItem} />
        <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} func={this.editItem} />
        <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} func={this.editItem} />
      </List>
    );
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
    flex: 1,
    marginHorizontal: 16
  }
})
