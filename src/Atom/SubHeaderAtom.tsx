import * as React from 'react'
import { Header, Left, Right, Icon, Text } from 'native-base'
import PickerAtom from './PickerAtom'
import { StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  total?: any
  list?: any[]
}

class SubHeaderAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    total: '80'
  }

  render() {
    return (
      <Header style={styles.subHeaderHeader}>
        <Left style={styles.subHeaderLeftRow}>
          <Icon style={styles.subHeaderIconColor} name="md-briefcase" />
          <Text style={styles.subHeaderPad}>{this.props.total}</Text>
        </Left>
        <Right style={styles.subHeaderRightRow}>
          <Text style={styles.subHeaderFont}>Sort By:</Text>
          <PickerAtom
            list={this.props.list}
            style={styles.pickerStyle}
            placeholder="Make a selection"
          />
        </Right>
      </Header>
    )
  }
}

export default SubHeaderAtom

const styles = StyleSheet.create({
  subHeaderHeader: {
    height: 45,
    backgroundColor: '#fff'
  },
  subHeaderLeftRow: {
    flexDirection: 'row',
    width: '40%'
  },
  subHeaderRightRow: {
    flexDirection: 'row',
    width: '60%'
  },
  subHeaderPad: {
    paddingLeft: 10,
    paddingTop: 8,
    fontFamily: 'SourceSansPro',
    fontSize: 15
  },
  subHeaderFont: {
    fontSize: 15,
    fontFamily: 'SourceSansPro',
    paddingBottom: 4
  },
  subHeaderIconColor: {
    color: color.check,
    marginLeft: 10
  },
  pickerStyle: {
    width: '60%',
    height: 25,
    borderColor: '#F0F0F0',
    borderWidth: 0.5
  }
})
