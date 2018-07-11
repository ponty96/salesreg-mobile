import * as React from 'react'
import { Header, Left, Right, Text } from 'native-base'
import PickerAtom from './PickerAtom'
import { StyleSheet, View, Image } from 'react-native'
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
          <Image
            source={require('../../assets/Icons/subheader-icons/product-blue.png')}
            style={styles.productIcon}
          />
          <Text style={styles.subHeaderPad}>{this.props.total}</Text>
        </Left>
        <Right style={styles.subHeaderRightRow}>
          <Text style={styles.subHeaderFont}>Sort by</Text>
          <View style={styles.pickerWrapper}>
            <PickerAtom
              list={this.props.list}
              style={styles.pickerStyle}
              placeholder="Make a selection"
            />
          </View>
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
    width: '40%',
    marginLeft: 16
  },
  subHeaderRightRow: {
    flexDirection: 'row',
    width: '60%'
  },
  subHeaderPad: {
    paddingLeft: 8,
    fontFamily: 'SourceSansPro',
    fontSize: 15,
    color: color.principal,
    marginTop: 2
  },
  subHeaderFont: {
    fontSize: 15,
    fontFamily: 'SourceSansPro',
    alignSelf: 'center',
    marginBottom: 2,
    color: color.principal
  },
  subHeaderIconColor: {
    color: color.check,
    marginLeft: 10
  },
  pickerStyle: {
    width: '100%',
    height: 35,
    paddingRight: 10,
    alignSelf: 'flex-start'
  },
  pickerWrapper: {
    borderWidth: 1,
    width: 160,
    borderColor: color.dropdown,
    alignItems: 'flex-end',
    marginLeft: 16
  },
  productIcon: {
    height: 20,
    width: 20
  }
})
