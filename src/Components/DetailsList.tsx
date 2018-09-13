import React, { PureComponent } from 'react'
import { ScrollView } from 'react-native'
import ProfileListAtom from '../Atom/ProfileListAtom'

interface IProps {
  list: any
}

interface IState {}

class DetailsList extends PureComponent<IProps, IState> {
  displayList = () => {
    return this.props.list.map((key: any, index: any) => {
      let section = key.section
      let value = key.value
      return <ProfileListAtom section={section} value={value} key={index} />
    })
  }
  render() {
    return <ScrollView>{this.displayList()}</ScrollView>
  }
}

export default DetailsList
