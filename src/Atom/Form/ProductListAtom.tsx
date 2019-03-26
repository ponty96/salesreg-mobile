import React from 'react'
import { StyleSheet } from 'react-native'

import { RegularText } from '../TextAtom'
import SalesOrderListAtom from '../ListItem/SalesOrderListAtom'
import { color } from '../../Style/Color'

interface IListItem {
  avatar: string
  name: string
  quantity: string
}

interface IProps {
  list: IListItem[]
}

export default class ProductListAtom extends React.PureComponent<IProps> {
  render() {
    return (
      <React.Fragment>
        <RegularText style={styles.titleText}>
          Click back arrow to edit, or just click done to finish.
        </RegularText>
        {this.props.list.map((listItem, i) => {
          return (
            <SalesOrderListAtom
              key={i}
              avatar={listItem.avatar}
              firstTopText={listItem.name}
              topRightText={listItem.quantity}
            />
          )
        })}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    marginVertical: 15,
    fontSize: 16,
    color: color.black
  }
})
