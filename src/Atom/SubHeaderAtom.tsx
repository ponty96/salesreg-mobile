import * as React from 'react'
import { Header, Left, Right, Icon, Text } from 'native-base'
import PickerAtom from './PickerAtom'
import { StyleSheet } from 'react-native'

interface IProps {
  total?: any
  list?: any[]
}

class SubHeaderAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    total: '0'
  }

  render() {
    return (
      <Header style={styles.subHeaderHeader}>
        <Left style={styles.subHeaderRow}>
          <Icon style={styles.subHeaderIconColor} name="md-briefcase" />
          <Text style={styles.subHeaderPad}>{this.props.total}</Text>
        </Left>
        <Right style={styles.subHeaderRow}>
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
    minHeight: 50,
    backgroundColor: '#fff'
  },
  subHeaderRow: {
    flexDirection: 'row',
    width: '40%'
  },
  subHeaderPad: {
    paddingLeft: 10,
    paddingTop: 5
  },
  subHeaderFont: {
    fontSize: 13,
    paddingBottom: 9
  },
  subHeaderIconColor: {
    color: '#F0F0F0'
  },
  pickerStyle: {
    width: '50%',
    height: 35
  }
})
