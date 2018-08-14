import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import EmployeeList from '../Components/EmployeeList'
import FabAtom from '../Atom/FabAtom'
import { employeeList } from '../config/data'

interface IProps {
  navigation: any
}

export default class EmployeesScreen extends React.Component<IProps> {
  static navigationOptions = () => {
    return {
      title: 'Employees'
    }
  }

  onPress = () => {
    this.props.navigation.navigate('EmployeesDetails')
  }

  render() {
    const items = this.props.navigation.getParam(employeeList)
    return (
      <View style={styles.container}>
        <EmployeeList
          items={items}
          onPress={this.onPress}
          screenType="send employee invitation. Employee's name will appear here when they accept invittion and register"
        />
        <FabAtom
          routeName={'NewEmployee'}
          name={'md-mail'}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
