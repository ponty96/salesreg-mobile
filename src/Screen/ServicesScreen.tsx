import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, List } from 'native-base'

import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import SubHeaderAtom from './../Atom/SubHeaderAtom'
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
      <View style={styles.container}>
        <SubHeaderAtom
          list={[
            'Fasting selling',
            'Slowest selling',
            'Highest profit',
            'Lowest profit'
          ]}
        />
        <View style={styles.listContainer}>
          <List>
            <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} bodyfunction={this.editItem} />
            <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} bodyfunction={this.editItem} />
            <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} bodyfunction={this.editItem} />
            <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} bodyfunction={this.editItem} />
            <ServiceListItemAtom name={'Re-Touching'} amount={'N 90000'} bodyfunction={this.editItem} />
          </List>
        </View>
      </View>
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
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: color.secondary
  },
  container: {
    flex: 1
  }
})
