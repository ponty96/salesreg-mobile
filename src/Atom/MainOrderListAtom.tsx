import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Left, Right, Text } from 'native-base'
import PopoverAtom from './PopoverAtom'

interface IProps {
  items?: {
    orderId: number
    time: string
    customerName: string
    amount: number
    position?: 'bottom' | 'left' | 'right' | 'top' | 'auto'
    check: boolean
    tag: any
  }
  onPress: () => void
}

class MainOrderListAtom extends React.Component<IProps, any> {
  render() {
    return (
      <ListItem style={styles.mainList} onPress={this.props.onPress}>
        <Left style={styles.mainLeft}>
          <View style={styles.viewMargin}>
            <Text style={styles.leftText1}>
              {this.props.items.orderId}
              <Text style={styles.wrapText}> {this.props.items.time}</Text>
            </Text>
          </View>
          <View style={styles.viewMargin}>
            <Text style={styles.leftText2}>
              {this.props.items.customerName}
            </Text>
          </View>
        </Left>
        <Right style={styles.mainRight}>
          <Text style={styles.rightText}>{this.props.items.amount}</Text>
          <PopoverAtom
            position={this.props.items.position}
            tag={this.props.items.tag}
            check={this.props.items.check}
          />
        </Right>
      </ListItem>
    )
  }
}

export default MainOrderListAtom

const styles = StyleSheet.create({
  mainList: {
    flex: 1,
    height: 75,
    width: '100%',
    alignSelf: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
    paddingVertical: 8
  },
  mainLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 0,
    paddingLeft: 0
  },
  viewMargin: {
    marginLeft: 16
  },
  leftText1: {
    textAlign: 'left',
    fontFamily: 'Roboto_medium',
    paddingBottom: 10,
    paddingLeft: 5,
    marginLeft: 0,
    fontWeight: '400'
  },
  wrapText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400'
  },
  leftText2: {
    textAlign: 'left',
    fontFamily: 'Roboto_medium',
    paddingTop: 10,
    paddingLeft: 5,
    marginLeft: 0,
    fontSize: 13,
    color: '#c0c0c0'
  },
  mainRight: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 16
  },
  rightText: {
    fontWeight: '500',
    fontSize: 13,
    paddingTop: 5
  }
})
