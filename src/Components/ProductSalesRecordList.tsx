import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Thumbnail, Left, Body } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  pic: string
  productName: string
  customerName: string
}

const ProductSalesRecordList = (props: IProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <Left style={styles.left}>
        <Thumbnail source={{ uri: props.pic }} style={styles.image} />
      </Left>
      <Body style={styles.body}>
        <View>
          <Text>{props.pic}</Text>
        </View>
      </Body>
    </TouchableOpacity>
  )
}

export default ProductSalesRecordList

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: color.listBorderColor,
    height: 75
  },
  image: {
    height: 55,
    width: 55,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 55 / 2,
    margin: 8,
    paddingLeft: 8
  },
  left: {
    height: 55,
    marginLeft: 0
  },
  body: {
    flex: 2
  }
})
