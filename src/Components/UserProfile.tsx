import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import ProfileListAtom from '../Atom/ProfileListAtom'
import NameDisplayAtom from '../Atom/NameDisplayAtom'

interface IProps {
  list: any
  businessName?: string
  name?: string
}

class UserProfile extends PureComponent<IProps> {
  displayList = () => {
    console.log('keys', Object.keys(this.props.list))
    return Object.keys(this.props.list).map((key: any, index: any) => {
      return (
        <ProfileListAtom
          section={key}
          value={this.props.list[key]}
          key={index}
        />
      )
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
