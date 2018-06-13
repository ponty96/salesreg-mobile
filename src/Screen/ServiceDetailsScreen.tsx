import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {}

class ServiceDetailsScreen extends PureComponent<IProps, IState> {
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
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewCustomer')
          }}
        >
          <View style={styles.headerItem}>
            <Icon
              name={'pencil'}
              style={styles.headerIconLogout}
              type={'MaterialCommunityIcons'}
            />
            <Text style={styles.headerText}>Edit</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  editItem = (name: string, amount: string) => {
    console.log(name, amount)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameHolder}>
          <Text>1 million braids</Text>
        </View>
        <ServiceListItemAtom name={'Selling Price'} amount={'N 2,100.00'} contStyle={styles.marginSpace}/>
        <ServiceListItemAtom name={'Amount Sold'} amount={'100'} textStyle={styles.textStyle} contStyle={styles.marginSpace}/>
      </View>
    );
  }
}

export default ServiceDetailsScreen;

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  headerIconLogout: {
    color: color.secondary,
    padding: 8,
    fontSize: 28
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerText: {
    color: color.secondary,
    fontWeight: 'bold',
    paddingRight: 16,
    fontSize: 18
  },
  container: {
    flex: 1
  },
  nameHolder: {
    borderBottomWidth: 1,
    paddingVertical: 32,
    paddingHorizontal: 24
  },
  textStyle: {
    color: '#000'
  },
  marginSpace: {
    paddingHorizontal: 16
  }
})
