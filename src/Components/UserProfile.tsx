import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import ProfileListAtom from '../Atom/ProfileListAtom'
import NameDisplayAtom from '../Atom/NameDisplayAtom'

interface IProps {
  list: any
  businessName: string
}

interface IState {}

class UserProfile extends PureComponent<IProps, IState> {
  displayList = () => {
    return this.props.list.map((key: any, index: any) => {
      let section = key.section
      let value = key.value
      return <ProfileListAtom section={section} value={value} key={index} />
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <NameDisplayAtom businessName={this.props.businessName} />
        {this.displayList()}
      </View>
    )
  }
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
